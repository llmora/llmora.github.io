---
layout: post
title: Building an all-in-one Raspberry Pi arcade controller
---

Under construction...

Introduction and goals
----------------------
TBC

Components
----------
You will need the following (or similar components):

  - Controller box
  - Joystick plus buttons
  - USB Zero Delay controller
  - Raspberry Pi 3

Controller box
--------------
The controller box I ordered is pre-drilled with the joystick and button holes, and has a nice acrylic finish.

Cabling the controller
----------------------
Before mounting the Raspberry we need to cable the controller, so that we can find out where we will have space to fit the Raspberry, depending on the controler box you have purchased this may or may not be more challenging. I suggest geting a box that is at least 5cm depth if you do not want to struggle (or want to avoid cutting GPIO pins off the Raspberry).

The USB Zero Delay controller is used to connect the joystick and buttons to the Raspberry through its USB interface:

  [annotated image of usb controller]

Each button has two pins that connect to a socket in the USB controller: the connectors that attach to each of the button pins fits both ways however there is one position where the connector is securely attached and does not disconnect:

  [image of connector attached to pins]

Once the pins are attached to the button, twist the cable before you attach the connector to the USB controller so that the cables are tidier and repeat the process for all the buttons.

The joystick connection is a bit different: it uses a 5-wire ribbon cable that fits in the dedicated space in the USB controller, while the ribbon cable connectors in the USB connector has notches that ensure it only fits one way, the joystick side of the connection fits both ways: make sure you put the cable with the white side up (if you cable this the wrong way around you will have a joystick where only the "up" action works):

  [image of the joystick connector]

Mounting the Raspberry
----------------------
The controller box is 5cm depth, so the Raspberry must be mounted in a position where it does not interfere with the button or joystick back - while being able to expose the USB, micro-USB and HDMI ports to the outside: in our case the ideal mounting position for the Raspberry is the top-right corner.

Because we want to be able to easily access the SD Card we will mount the Raspberry on top of standoffs, so that it is not just resting on the bottom of the controller box.

The Raspberry must be firmly mounted in the controller, as the exposed ports will get quite a bit of abuse - I tried using epoxy to mount it initially, however the bonding with the polypropilene of the controller box is not really that good and it did not withstand much tinkering with. In the end I ended up 3D printing standoffs and using M3x12 screws and nuts to secure them.

Before you secure the standoffs, mark the USB, HDMI and micro-USB connectors on the controller box and use a Stanely knife to cut off the relevant sections, so that the connectors fit snuggly against the holes at which point you should secure the standoffs with the screws. I used a drillbit to make through-holes for the standoffs, so it is easier to secure.

6. Final touches
7. Bonus: Multiplayer setup
8. Bonus: LEDs
