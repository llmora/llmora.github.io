---
layout: post
title: "Single use vapping seriously harms everyone on the planet"
categories: [gibraltar, making]
image: norecycle.jpg
---

One of my friends is into vapping and has recently switched to single-use e-cigarettes, which resemble the normal smoking experience: you can buy them over the counter or from a vending machine, it comes packaged with all the warning signs, it is self-contained (no need to charge, refill, etc.), just unwrap the package, vap and when you are done you just throw it away. In summary: convenience. I am not going to go into the health aspects of vapping, anyone is free to do what they want with their body - but instead on the impact it has on the environment and, by extension, everyone else. I guess you could summarise as "Single use vapping seriously harms everyone on the planet".

# Getting into the e-cigarette

For our analysis we have chosen one of the brands that can be easily found available on the street in Gibraltar, "Lost Mary". The device comes packaged in a cardboard box roughly the size of a cigarette pack.

[ ![]({{ site.baseurl }}/images/vap-pack.png "Single use e-cigarette pack")]({{ site.baseurl }}/images/vap-pack.png)

 With the actual e-cigarette measuring 66mm tall x 35mm wide x 16mm thick. The box claims that the e-cigarette lasts for up to 600 puffs.

[ ![]({{ site.baseurl }}/images/vap-pods.png "Single use e-cigarette")]({{ site.baseurl }}/images/vap-pods.png)

The exterior body of the e-cigarette unit (marketed as a "pod") is made up of a metallic main body and hard thermoplastic puffing at the top plus a cover at the bottom. It should be easy to disassemble by removing the plastic cover, however for our analysis we decided to open it with a grinder so that we can see the interior:

[ ![]({{ site.baseurl }}/images/vap-internals.png "Internals of the single use e-cigarette")]({{ site.baseurl }}/images/vap-internals.png)

The e-cigarette is broken down into clearly separated areas which we discuss in the following sections.

## Liquid container

The units I used for analysis had been already "smoked" so most of the liquid was gone, although when new it comes with 2ml of a chemical compound that, according to the package, is FATAL when in contact with skin, so if you are going to open one of these units please take appropriate protections.

[ ![]({{ site.baseurl }}/images/vap-danger.png "Danger notice in single use e-cigarette")]({{ site.baseurl }}/images/vap-danger.png)

The liquid is kept in the soaked sponge, which is protected by a transparent hard plastic case. This, heated up, is what goes into the lungs.

## Heating element

I was expecting a more complex mechanism, but the simplicity surprised me. The heating element is a peeled-off cable, wrapped around a cigarette filter-like material that acts as a wick for the liquid stored in the container. The wick pulls the liquid through capilarity to keep it wet, and when electricity flows through the cable / resistor / coil it heats up and creates the water vapour infused with the evaporated liquid:

[ ![]({{ site.baseurl }}/images/vap-wick.png "Wick of the single use e-cigarette")]({{ site.baseurl }}/images/vap-wick.png)

## Battery

The largest component in the e-cigarette is the battery, a 3.7v 360mAh rechargeable Lithium Ion battery.

[ ![]({{ site.baseurl }}/images/vap-battery.png "Battery of the single use e-cigarette")]({{ site.baseurl }}/images/vap-battery.png)

Although the battery is rechargeable the e-cigarette does not offer any functionality to recharge it, once the battery falls below 3.3v the chip flashes the LED 10 times, then shuts down. This is the signal to the owner to throw this pod away, and go get a new one.

The difficulty to access the battery makes it nearly-impossible to recycle, sending all its components into [landfill](https://en.wikipedia.org/wiki/Environmental_impacts_of_lithium-ion_batteries) (toxic metals such as cobalt, nickel and manganese) and increasing the change of a landfill fire due to short-circuits.

## Electronics

To control the heating mechanism the e-cigarette incorporates a small number of electronic components, all of them integrated in an [S085 ASIC](https://cmcrisensors.wordpress.com/2019/06/19/characteristics-of-electronic-smoke-pressure-sensor-controller-s085/) or similar:

* **Electret microphone**, which works as a pressure sensor to determine when the user puffs on the cigarette
* **SMD LED**, to let the user know whether it is operational or has ran out of puffs
* **SMD driver chip**, to coordinate the microphone, LED and heater
* **SMD capacitor**. to filter noise from the battery out

Whenever the user puffs on the cigarette, the air starts flowing and activates the microphone membrane at the bottom of the e-cigarette (which works as a presure sensor). The driver picks up on this and switches on the LED and sends current to the coil, which heats up the liquid and creates the vapor. When the user stops sucking on the e-cigarette, the microphone membrane stops making contact and the driver goes into low-power consumption mode waiting until the next puf.

Whenever the battery is low, the LED blinks to let the user know it is time to get a new pod.

# Recycling

It is clear that the number and type of components make this a hard to recycle device:

[ ![]({{ site.baseurl }}/images/vap-blowup.png "Components of the single use e-cigarette")]({{ site.baseurl }}/images/vap-blowup.png)

The pod itself contains plastic, metal, battery, electronics so it will go straight into landfill.

Each pod weights approximately 25 grams, broken down by the components:

  * Battery: 8g
  * Metal: 7g
  * Plastic: 10g

Looks like the only bit that can be recycled is the cardboard package that the pod comes in.

# Conclusion

Clearly disposable e-cigarettes are designed for convenience and not recyclability.

If we consider that a smoker [takes 15 puffs out of a traditional cigarette on average](https://cancercontrol.cancer.gov/sites/default/files/2020-06/m7_11.pdf) and that e-cigarette lasts for 600 puffs, it means that a smoker would smoke 2 packs of 20 cigarettes for each e-cigarette pod. The waste generated by two packs of cigarettes are two cardboard packets, the plastic wrappers and 40 filters.

Leaving aside the health implications, if you compare the traditional cigarette waste against e-cigarettes, the amount of waste that is produced after you finish smoking it is significatively worse in the electronic version. Assuming that a smoker of e-cigarette single use vaps goes through a pod every couple of days this means that over 180 of each of these will end up in landfill - 180 batteries, 180 electronics, 180 pieces of non-biodegradable plastic and metal casing.

[ ![]({{ site.baseurl }}/images/vap-scale.png "Waste weighing")]({{ site.baseurl }}/images/vap-scale.png)

That is 4.5kg of highly contaminant landfill waste each year produced by each single use e-cigarette smoker person. Please consider the implications for the environment before switching to single-use products.
