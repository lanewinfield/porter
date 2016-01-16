Porter
=========

A dashboard meant for raspberry pi + touchscreen to have an at-a-glance view of data for the home

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
