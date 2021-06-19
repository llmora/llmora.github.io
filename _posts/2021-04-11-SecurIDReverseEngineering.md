---
layout: post
title: "RSA SecurID hardware token reverse engineering"
categories: [security, making]
image: securid.png
---

*TBC: Intro*

# Hardware tokens vs Software tokens

At work we regularly have the discussion on whether we should introduce the convenient two-factor authentication software tokens to replace the physical RSA SecurID hardware tokens that we all carry around. The outcome of the review is nearly always  that software tokens are good and convenient, but they are not as tamper proof / tamper evident as hardware tokens: it does not take much to steal the seed from a general purpose CPU and OS, it can be done without leaving any trace that the seed has been compromised, you do not need physical access to the device - effectively cloning the software token without the user knowledge and completely removing one of the factors.

[ ![]({{ site.baseurl }}/images/securid-softtoken.png "RSA SecurID Software token")]({{ site.baseurl }}/images/securid-softtoken.png)

To be fair it is relatively easy to reverse engineer the soft tokens and [point out their flaws](http://securology.blogspot.com/2007/11/soft-tokens-arent-tokens-at-all.html), while on the other side we just take RSA's word at face value when they say that [the hardware tokens are tamper resistant](https://www.rsa.com/content/dam/en/data-sheet/rsa-securid-hardware-tokens.pdf).

So, is it really that difficult to steal the seed from a SecurID hardware token or are we just relying on security through obscurity? Let's find out...

# Hardware token theory of operation

Without going too much into detail on how SecurID works, suffice to say that the token and the authentication server are time synchronised and share a secret (the seed). Using the current time and the seed, they use a hashing algorithm (older versions used an [RSA proprietary algorithm](https://seclists.org/bugtraq/2000/Dec/459) but recent versions have moved to AES) to compute a 6-digit number. This number changes every minute and is not predictable, so it is used by a client to prove to the server that they are in physical posession of the token (the "something you have" factor).

Based on how the SecurID system operates let's try to make a first guess on how the various components are implemented. For our analysis we are using the SecurID SID700 token, easily the most widely deployed RSA token.

## Power

RSA tokens are purchased with a certain pre-programmed lifespan of 2 to 5 years: the longer the lifespan the more the token costs.  When you receive a new token after purchase it is already showing token codes every minute, as a matter of fact the token does not have an "off" switch or a "show me my token code" button, it is simple and easy to use: the user just looks at the token and types the number they see.

The tokens are self-contained and are non-rechargeable, the battery that powers the whole system needs to last up to 5 years of continuous operation so this means that the implementation will focus on ultra-low current consumption.

## Time synchronisation

While it is easy to keep synchronisation on the server-side, the tokens are totally self-contained so they must include a really accurate oscillator that does not drift substantially over the 3-5 years of token lifetime. The token will be imprinted with the timestamp when it is initialised and will keep track of the number of oscillations since then. The server will need to know, for each token, the time when it was initialised so it can work in sync.

## Seed management

When you buy a batch of tokens, you also receive a "seed file" which needs to be loaded into the authentication server. There is nothing for you do to to the tokens, e.g. they come preloaded with the seeds and already showing valid numbers, the only thing you need to do is to assign a token to a user, and they are ready to go.

This means that, at some point in time, a random seed was generated and programmed into the token, the "imprint time" recorded and incorporated into a database at RSA which includes:

  * Token serial
  * Activation timestamp
  * Seed

When somebody purchases a batch, the tokens are shipped from a warehouse and the corresponding database entries are sent to the customer as part of the "seed file". At this point of time there is no need for RSA to keep a copy of the seeds, however it seems that they actually _do_ keep the seeds after that as highlighted in the [2011 compromise of the RSA SecurID seed database](https://arstechnica.com/information-technology/2011/06/rsa-finally-comes-clean-securid-is-compromised/). A good example on how retaining information beyond the point it ceases to be useful is a bad practice and just increases your exposure to attacks.

What would be your guess if you had to venture a reason why they kept a copy of the token seeds?

## Token manufacture

Because the token arrives with the seed preloaded it needs to be programmed before it gets to us.

The serial number and expiration date of the token are printed on a piece of rubber on the back of the token that is easily removed to expose 7 circuit pads, an expensive arrangement if these pads are used just for testing as part of the manufacturer quality assurance process. Instead we believe that these pads are used to program the token with the seed.

[ ![]({{ site.baseurl }}/images/securid-pads.jpg "RSA SecurID back pads")]({{ site.baseurl }}/images/securid-pads.jpg)

This makes sense as the act of programming the seed into the token requires access to the secrets database to retrieve the serial and seed that the token needs to use, and to record the activation timestamp. It is likely that RSA would want to separate token manufacture from token "imprinting" given the very different security requirements for both processes.

With this in mind we believe that the manufacturing process would be split in two steps:

  1. **Assembly**: Assemble the circuit and the physical token, likely in a standard fab facility. This step will include manufacturing the PCB, assembling the components, installing the battery and sealing the token. At this stage the token will be running without a seed.

  2. **Imprinting**: Ship the tokens to a secure RSA facility where the token seeds are programmed using the 7 circuit pads and the serial number plus expiration dates are printed on the rubber cover and the imprinting time recorded in the central SecurID database.

The only sensitive component that would be exposed in step #1 would be the algorithm that would run inside the token, the microcontroller will probably have protections against extractions of the code - and in any event the algorithm is implemented in the soft tokens nowadays, so hardly a secret.

The cost of maintaining security in these separate scenarios would come at the expense of manufacturing efficiency, adding queueing between both facilities which probably explains the world-wide shortage of RSA tokens during COVID-19 due to the increased demand. You can easily ramp up assembly by using additional fabs, but the bottleneck would be the imprinting process as we assume there is a limited number of "imprinting" facilities.

# Attacking the token

## Hypothesis #1: Dump seed from EEPROM

Because the seed needs to be programmed at the time of imprinting, it needs to be stored somewhere where the microcontroller can access it, likely to be an EEPROM, maybe external to the microcontroller. It is possible that the data is somehow encrypted, but it will be great if we can extract it from the memory using something like [`eepeep`](/eepeep/). This is probably a naive assumption as the strength of the device depends on the security of the seed, but then again if we do not test the hypothesis we will never know.

To find out the location of the memory used to store the seed we need to disassemble the token and identify the components that make up the circuit - I used an expired token from my online banking (if you do not have one laying around you can get a batch of expired tokens off eBay).

The external case of the token comes out quite easily, we just apply some force in the hole that the keyring holder is attached to and extract the circuit that is sandwiched between the top and bottom covers:

[ ![]({{ site.baseurl }}/images/securid-disassemble-mechanical.png "RSA SecurID back pads")]({{ site.baseurl }}/images/securid-disassemble-mechanical.png)

We can see that it uses a CR2032 3V battery to power the whole circuit, and the only visible areas are the 7 programming pads on one side (along with a few test pins and vias) and the LCD display on the other. The whole circuit is enclosed in semi-rigid transparent resin potting to waterproof the token. The removal of this resin is a matter of patience and exacto-knife and tweezers work, slowly cut into the resin and make sure you do not damage any of the components, then pull away chunks of resin using the tweezers.

You will soon run out of resin and be left with the LCD display that hides the actual circuit so you can try to de-solder it or to pry it away with a screwdriver and a bit more of patience. With the LCD display removed we can see a few components, continue removing the resin (really carefully) until you get as much a clean as PCB as you can, something like this:

[ ![]({{ site.baseurl }}/images/securid-scrapped.png "RSA SecurID scrapped")]({{ site.baseurl }}/images/securid-scrapped.png)

There are a couple of interesting markings on the PCB:

  * **P/N 430P000012 REV A4**, the part number and revision of this token design

  * **E187451**, a [UL certificate](https://iq.ul.com/pwb/Trade.aspx) for [LEAD JUMP PCB (ZHUHAI) LTD](http://www.leadjump.com/), likely the fab used for the assembly of the token during the manufacturing process. The logo on the PCB also matches that of Lead Jump.

But that is about it, apart from a bunch of capacitors and resistors there appears to be only two active components:

  * **An SMD oscillator**: likely a 32.768KHz clock as used in real-time clock applications. I scratched the markings when removing the resin, so I was unable to find the datasheet, markings seem to be CBxx6. If you have an idea of the actual markings drop me a line please.

  * **An epoxy blob** which seems to cover the MCU that drives the token.

[ ![]({{ site.baseurl }}/images/securid-pcb-markings.png "PCB components")]({{ site.baseurl }}/images/securid-pcb-markings.png)

No external EEPROM or any kind of memory, so the storage must be embedded as part of the MCU - no way to dump it using traditional methods, so let's think of something else.

## Hypothesis #2: Access memory using MCU pin functionality

For this attack attempt we need to understand the MCU architecture underneath the blob. Considering that RSA has manufactured close to 100 million of these devices and that the security of the device depends on the protection of the seed I expect this will be a custom die.

I do not have the lab equipment to remove the epoxy, x-ray the blob or de-layer the MCU so I looked for previous work undertaken in this area. I found the work by [Travis Goodspeed](https://www.flickr.com/photos/travisgoodspeed/5596181674/) who had exposed the MCU and done an initial analysis of the chip, however the resolution of the die images was too low so I could not look at the detail. Thanks to the contribution of [Eduardo Cruz](http://arcadehacker.blogspot.com/) he located [high-resolution images of the MCU](https://siliconpr0n.org/map/rsa/securid-1c573718a-1p95/) put together by [John McMaster](https://twitter.com/johndmcmaster).

Looking through the images I found work already done on reverse engineering the MCU in the [siliconpr0n archives](https://siliconpr0n.org/archive/doku.php?id=rsa:securid:start) a few years ago. Going through the material I saw that they had identified a marking in the die "1C573718A" and that led them to the [Sanyo LC573718A MCU](/assets/files/securid-LC573718A.pdf), a general-purpose 4-bit MCU with some very familiar specs:

* Built-in LCD drivers to drive up to 120 segments (the SID700 SecurID token has a total of 49 LCD segments)
* Operates at 2.4V-3.6V
* Very low power consumption
* ROM: 8192 x 8 bits
* RAM: 512 x 4 bits
* Chronograph function with 100ms resolution
* Requires an external 32.768KHz oscillator and a bunch of capacitors

Funnily enough this MCU was originally created to run LCD games (it has a built-in buzzer port for instance). I could not find any references, but it will not be surprising if you found one powering a few [game watches](http://www.liquidcrystal.co.nz/watches/sanyo-v-space-wars/).

[ ![]({{ site.baseurl }}/images/securid-gamewatch.png "SecurID gamewatches :-)")]({{ site.baseurl }}/images/securid-gamewatch.png)

At this stage it is impossible to know if Sanyo customised the MCU for RSA, however the pinout matches 100% that of the chip images (left image from Sanyo datasheet, right image SecurID die from siliconpr0n [[credits]](https://siliconpr0n.org/archive/doku.php?id=rsa:securid:1c)):

[ ![]({{ site.baseurl }}/images/securid-mcu-pinout.png "MCU pinout")]({{ site.baseurl }}/images/securid-mcu-pinout.png)

The datasheet is not very extensive, but it covers the pinout, which can be summarised as follows:

* `SEG1-SEG32 + COM1-COM4`: LCD segment connections
* `VDD1, VDD2, VDD3, VDDX, VSS, VSSX`: Power connections
* `XT1, XT2`: Oscillator input
* `CUP1-CUP2`: Capacitor pins for step-up, step-down (whatever this may be)
* `P00, P01, P02, P03`: 4-bit I/O port
* `P10, P11`: 2-bit I/O port
* `M1, M2`: 2-bit input port
* `S1, S2, S3, S4`: 4-bit input port
* `ALM`: Buzzer output (it would be nice to have a bleeping fob)
* `RES`: Reset
* `T3, TST, HZ32`: Test pins

As we can see there are no references to pins to read/write from memory (or for in-system programming), so either the MCU does not have that capability to access and program memory or it is not documented on the datasheet.

A closer look at the MCU specs shows why there is no functionality to write into the MCU memory: **the ROM is actually masked ROM which is written during the die manufacturing process by Sanyo, following RSA specs, and that cannot be modified at run-time**. This means that all the tokens share the same ROM contents: static data and program code for the MCU but not the seed - as by the time the imprinting process happens the ROM can no longer be modified.

The only location where the seed can be stored is the MCU SRAM (!), a location that is wiped whenever the MCU loses power. But because the token is designed to constantly run on battery power the RAM is never wiped and the MCU holds the values stored there. If at any point the MCU loses power, the token loses the seed and it goes back to a pre-imprinting state (where the fob flashes with the "888888" message):

{% include youtube-player.html id='zA2qRyIm9O8' %}

(While I was trying to free the old battery I managed to break the LCD, so only the unbroken segments flash - but you get the idea)

Because the SRAM is only accessible internally by the MCU there are no pins that expose its contents, so this attack cannot be progressed any more and the hypothesis needs to be abandoned.

## Hypothesis #3: Extract the key from SRAM using die analysis

If the seed is stored in SRAM, can we not extract it directly from the die? Data stored in a SRAM is not optically visible, as each SRAM bit looks the same - to write and modify the bit a voltage is applied and a flip-flop is activated to hold the zero or the 1. Potentially and if you could remove the epoxy and chip cover without disconnecting the power supply you could [use a SEM to measure voltage contrasts](http://lamp.tu-graz.ac.at/~hadley/sem/vc/voltagecontrast.php) and systematically dump the contents of the SRAM.

While this sounds plausible this is well beyond my knowledge of electronics, so it is not a hypothesis that I could personally progress. Any comments, views or experiences on this welcome.

## Hypothesis #4: Reverse engineer the imprinting process and use it to extract the seed instead of storing it

We have seen that the Sanyo MCU does not have any specific pins to access the SRAM, however this is not totally accurate for the RSA fobs: during the imprinting process the seed must be written to the SRAM using the 7 pads on the back of the token, so _there are memory access capabilities through these external pads_.

Let's see if we can understand what each of the pads do and how they fit together to write the seed to the token - and then find out if the process can be used to read the seed back.

Quite a few hours of tracing with a multimeter show the following connections for the seven pad connectors (labelled from left to right):

* `P1`: Ground?
* `P2`: Power?
* `P3`: Unknown?
* `P4-P7`: These four pins are connected through a 2.2k resistor network to the MCU. Because the connections go under the blob it is not possible to trace them easily, but judging from the pin positions and some of the [MCU image pin usage](https://siliconpr0n.org/map/rsa/securid-1c573718a-1p95/mz_ns50xu/) these are likely to be connected to the M1, M2 (input only), P10 and P11 (input and output) ports.

These are GPIO pins whose functionality needs to be implemented in the ROM firmware by the developer of the particular application, in this case RSA. This means that the imprinting process does not use MCU native ports, but that the imprinting functionality is implemented in the firmware, so in order to understand what the pins do (and how the imprinting protocol works) we need to reverse engineer the firmware first.

### Extracting the ROM using image processing

We go back to the previous work done by siliconpr0n who have really close-up images of the SecurID MCU.

ROM structure
-------------

ROM is 8192 bytes

  2 memory banks, each bank has 128 rows. Each row is 16 columns with 16 bits in each column.
  2 x 128 x 16 x 16 = 65536 bits = 8 KBytes

According to LC65E1104_SanyoSemiconDevice_EEPROM.pdf, the mask options are :

  The SU60K.EXE program is used for option specification. The option code for the option specification area
  (addresses 1000 to 100A (hexadecimal)) is created by assembling the output of the SU60K.EXE program using the
  Sanyo M60K.EXE macro assembler and then linking the macro assembler output with the Sanyo L60K.EXE linker.

It seems that from 0x1004 to 0x1010 in that LC is used.

In the LC5862H datasheet, the option data is written to the end of the EPROM at 0x4000 to 0x40FF in blocks of 8 bits.

### Making head of tails of the extracted dump

### Disassembling

* Document how the imprinting process works
* Identify the SRAM addresses where the seed is written to
* Search for loopholes in the imprinting process to read back data from SRAM

https://siliconpr0n.org/map/rsa/securid-2c/rom_mit100x/

*TBC: Traces and schematics*

### T / T3 input as way to dump the ROM?

# Conclusion

