Porter
=========

<img src="https://github.com/lanewinfield/porter/blob/master/porter.png" width="400px" />
*(See it in action [here](http://gfycat.com/LikelyForsakenIcelandgull))*

A dashboard meant for raspberry pi + touchscreen to have an at-a-glance view of data for the home.

Features
---------

* Upcoming (24 hour) weather, scrollable and inspired by the wonderful design of [Weather Line](http://weatherlineapp.com/).
* Alerts when precipitation is forecast within the hour (à la Dark Sky)
* Light control (using my own API... hope to set this up soon)
* Nearest Uber-X status
* Nearest Car2Go status with toggleable map
* NYC subway alerts
* "Should I bring my umbrella?" alert
* The current time


Prerequisites
---------

This was all built exactly to the spec of the [Official Raspberry Pi Display](https://www.raspberrypi.org/blog/the-eagerly-awaited-raspberry-pi-display/). I'm hardcoding a lot of the resolutions in here just for that, so be warned.

I run it on a RPI2.


Installation
---------

* Update and install requirements:

		sudo apt-get update
<!--meh -->
		sudo apt-get dist-upgrade
<!--meh -->
		sudo apt-get install matchbox chromium x11-xserver-utils ttf-mscorefonts-installer xwit sqlite3 libnss3

* Edit/replace config files.

	* `config.txt` goes into the bottom of `/boot/config.txt`
	* `default` goes to `/etc/apache2/sites-available/default`
	* `xinitrc` goes into `~/.xinitrc`


* Put `/screen` into home folder

* Put in all your appropriate data in `js/config.js`

* Boot 'er up!
