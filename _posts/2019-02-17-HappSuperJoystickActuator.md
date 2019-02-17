---
layout: post
title: "Happ Super joystick tighter 8-way actuator"
categories: [arcade, making]
image: happ.jpg
---

We have had a 1980s Faultless generic arcade cabinet for the best part of a year without many hassles, the usual fine-tuning when changing JAMMA boards (that I have recently solved with a Pi2Jamma) but not much more to complain about: plain good old fun with friends and family.

I personally play a lot of vertical scroller shot'em ups ([Slap Fight](http://www.markalldridge.co.uk/slap-fight.html) being my all-time favourite game) and one thing I noticed when testing a newly built [PiArcade]({% post_url 2019-02-16-PiArcade %}) was that the joystick motion flow was a lot better with the Sanwa knockoffs I had installed on the PiArcade than the ones on my arcade cabinet: hitting a diagonal with the Sanwa was really easy, but nearly impossible with the arcade cabinet joysticks.

{% include youtube-player.html id='r2GNuxrjh7U' %}

After testing with different JAMMA boards to ensure that it was a hardware problem I read a bit on arcade joysticks. Some key learnings from the past two weeks:

* Different vendors and joysticks are known for their handling: Seimitsu is good for shot-em'ups, Sanwa for fighting games and Industrias Lorenzo for tighter movements.

* Some joystics can be configured for 2-way, 4-way or 8-way, either through a restrictor plate (e.g. something that physically limits the movement of the joystick shaft) or through specific actuators.

After some image searching in Google I determined that the joysticks that are built into my cabinet are the Happ Super joysticks, which have a couple of interesting features:

* The microswitches have a metal 'leg' which the joystick actuator hits, as opposed to the actuator directly hitting the microswitches plastic contacts.

[ ![]({{ site.baseurl }}/images/happ_overall.jpg "A Happ Super joystick from the back")]({{ site.baseurl }}/images/happ_overall.jpg)

* The joystick can be configured in 4-way or 8-way mode by flipping the actuator, which is wider on one side (8-way) than the other (4-way)

[ ![]({{ site.baseurl }}/images/happ_actuator.png "A Happ Super joystick flippable actuator")]({{ site.baseurl }}/images/happ_actuator.png)

My Happ Super joystick was configured to use the 8-way mode which should make it easy to hit the diagonals, but the switches that were installed had a really long travel before they triggered (e.g. I had to move the joystick a good 3mm before they 'clicked'). When looking at picture of other Happ Super on the net it looked as if the switches on my arcade cabinet had been replaced (mine are ['SAIA Switzerland'](https://www.saia-pcd.com) instead of e-Switch or Cherry) and the angle and flexibility of the metal legs was off, probably due to age more than anything else, as can be seen in the following video:

  {% include youtube-player.html id='iYvBRnnVEc0' %}

I pondered ordering new Cherry microswitches, but given the price (6EUR per joystick) I ended up ordering a pair of new Industrias Lorenzo Eurojoystick 2 (18EUR a piece) which should solve the problem and provide a good playing experience for a wide number of games. Having said that I was not just going to sit around while waiting for the IL joysticks to arrive so I started reading up on how to adjust the Happ Super for a better experience.

The generally accepted opinion to make tighter joysticks was to 'bend' the microswitch legs so that they will contact the joystick actuator sooner, hence resulting in a tighter joystick that will easily hit the diagonals, however I felt that any more mistreatment of these nearly-40 year old switches will probably break them, so I discarded this option.

The next thing I tried was to 'flip' the actuator (remove the piece holding the actuator in place with needle-node pliers), and see if the 4-way side was better, but as expected it just made things worse as it increased the travel time of the joysticks and made hitting the diagonals impossible (delivering on its 4-way promise).

While looking at the actuator it seemed that the problem could be solved if the actuator was just a bit wider, so that the travel time to the switches would be reduced. One popular option seems to be to use duct-tape to increase the actuator diameter, however as the actuator was really an easy-to-replicate piece of solid nylon I created a 3D printable actuator with 2mm added to its diameter and printed a copy using PLA and 100% in-fill (the piece has a bit of an overhang but does not require supports to print):

[ ![]({{ site.baseurl }}/images/happ_3dpiece.png "3D printable actuator")]({{ site.baseurl }}/images/happ_3dpiece.png)

[ ![]({{ site.baseurl }}/images/happ_new_actuator.jpg "Side by side old and new actuator")]({{ site.baseurl }}/images/happ_new_actuator.jpg)

After installing the newly printed actuator, it is easy to feel the improvements: much tighter movements, shorted travel to hit the microswitch and easy to hit diagonals:

[ ![]({{ site.baseurl }}/images/happ_installed_actuator.jpg "New actuator installed")]({{ site.baseurl }}/images/happ_installed_actuator.jpg)

{% include youtube-player.html id='JIZzyaVgqcs' %}

The new bigger actuators result in a much better experience: the games are much more responsive and you can avoid the bad guys shots faster and in more directions:

{% include youtube-player.html id='7H6i9DpWluQ' %}

These new actuators work for me because of the state of my microswitches, so it is unlikely the printed piece will work for anyone else 'out of the box', feel free to [download the 3D printable part from Thingiverse](https://www.thingiverse.com/thing:3434854) and if you need to customise it you can always [download and tweak the OpenSCAD file](https://github.com/llmora/electronics/tree/master/happ_superjoystick_actuator).
