

var chart = new Highcharts.Chart({
	chart: {
		renderTo: 'weatherchart',
		type: 'spline',
		style: {
			fontFamily: 'Work Sans',
			fontWeight: '400',
		},
		backgroundColor: 'rgba(255,255,255,0.002)',
		width: 920,
		height: 300,
		spacing: [0, 0, 0, 0],
	},
	credits: {
		enabled: false,
	},
	exporting: {
		enabled: false,
	},
	title: {
		text: ''
	},
	subtitle: {
		enabled: false,
	},
	legend: {
		enabled: false,
	},
	xAxis: {
		categories: ['Now','12pm','8pm','12am','2am','4am','Butts','12pm','8pm','12am','2am','4am'],
		gridLineWidth: 0,
		lineWidth: 0,
		minPadding: 0,
		minorTickLength: 0,
	tickLength: 0,
	offset: 20,
	labels: {
		style: {
			fontSize: 24,
			color: '#adadad',
		}
	}
	},
	yAxis: {
		startOnTick: false,
		endOnTick: false,
		gridLineWidth: 0,
		title: {
			enabled: false,
		},
		labels: {
			enabled: false,
		},
		minPadding: 0.15
	},
	tooltip: {
		enabled: false,
	},
	plotOptions: {
		spline: {
			lineWidth: 3,
			animation: true,
			marker: {
				radius: 5,
				lineColor: '#ffffff',
				lineWidth: 4
			},
			dataLabels: {
				enabled: true,
				useHTML: true,
				y: -10,
				x: 1,
				verticalAlign: 'bottom',
				style: {
					fontSize: '26px',
				}
			},
		}
	},
	series: [{
		color: '#dfdfdf',
		name: '',
		marker: {
			symbol: 'circle'
		},
		data: [{ y: 69, marker: { symbol: 'url(http://garage.briiiiian.com/images/cloudandsun.png)', width: 40, height: 40, }, dataLabels: { color: '#ffc600'} },
				{ y: 69, marker: { symbol: 'url(http://garage.briiiiian.com/images/cloudandsun.png)', width: 40, height: 40, } },
				{ y: 69, marker: { symbol: 'url(http://garage.briiiiian.com/images/cloudandsun.png)', width: 40, height: 40, } },
				{ y: 69, marker: { symbol: 'url(http://garage.briiiiian.com/images/cloudandsun.png)', width: 40, height: 40, } },
				{ y: 69, marker: { symbol: 'url(http://garage.briiiiian.com/images/cloudandsun.png)', width: 40, height: 40, } },
				{ y: 69, marker: { symbol: 'url(http://garage.briiiiian.com/images/cloudandsun.png)', width: 40, height: 40, } },
				{ y: 69, marker: { symbol: 'url(http://garage.briiiiian.com/images/cloudandsun.png)', width: 40, height: 40, }, dataLabels: { color: '#ffc600'} },
				{ y: 69, marker: { symbol: 'url(http://garage.briiiiian.com/images/cloudandsun.png)', width: 40, height: 40, } },
				{ y: 69, marker: { symbol: 'url(http://garage.briiiiian.com/images/cloudandsun.png)', width: 40, height: 40, } },
				{ y: 69, marker: { symbol: 'url(http://garage.briiiiian.com/images/cloudandsun.png)', width: 40, height: 40, } },
				{ y: 69, marker: { symbol: 'url(http://garage.briiiiian.com/images/cloudandsun.png)', width: 40, height: 40, } },
				{ y: 69, marker: { symbol: 'url(http://garage.briiiiian.com/images/cloudandsun.png)', width: 40, height: 40, } },]

	}]
});

function errorAlert(theerror, time) {
		$( "#erroralert" ).html(theerror);
			$( "#erroralert" ).animate({bottom: "0"}, 200).delay(time).animate({bottom: "-137px"}, 200);
}

function toggleLights() {
	return $.ajax({
		url: "http://10.0.1.120/outlet/all/toggle",
		type: "GET",
		dataType: "json"
	});
}

$( document ).ready(function() {


	$("#container").css({transform: 'scaleY(0.95)'});
	$("#weatherchart").kinetic();

	function Subway() {
		this.subwayData = null;
	}

	Subway.prototype = {


		fetchSubwayInfo: function() {
			var self = this;
			$.ajax({
				// TODO: replace with real thing
				url: "http://web.mta.info/status/serviceStatus.txt",
				type: "get",
				dataType: "xml",
				success: function(response) {
					self.subwayData = response;
					self.updateSubwayInfo();
				},
				error: function() {
					errorAlert("Couldn't grab subway",90000);
				}
			});
		},

		updateSubwayInfo: function() {
			/* GET EM */

			var subway = this.subwayData;
			

			$("#subwayicons").empty();
			$(subway).find("subway").each(function(){
				$(this).find("line").each(function(){
					var status = $(this).find('status').text();
					if (status !== "GOOD SERVICE") {
						var thisSubway = $(this).find("name").text();
						var thisSubwayAlert = $(this).find("text").text();
						alertSubway(thisSubway, thisSubwayAlert);
					}
			   });
			});

			function alertSubway(line, alert) {
				var affectedSubways = line.split("");
				var subwayRegEx = new RegExp("["+nearbySubways+"]");
				alert = alert.substring(alert.indexOf("br") + 9);
				affectedSubways.forEach(function(entry) {
					var subwayAlertRegEx = new RegExp("\\["+entry+"\\]");
					if ( subwayRegEx.test(entry) && subwayAlertRegEx.test(alert)) {
						$("#subwayicons").append("<a href=\"#\" id=\"subway-"+entry+"\" class=\"homeicon subway\">&nbsp;</a>");
						if ($( "#subwayscreens_container#screensubway-"+entry ).length) {
							$( "#subwayscreens_container#screensubway-"+entry+".subwayscreen_content" ).replaceWith(alert);
						} else {
							$("#subwayscreens_container").append("<div id=\"screensubway-"+entry+"\" class=\"childscreen subwayscreen\"><section class=\"subwayscreen_content\">"+alert+"</section></div>");
						}
					}
				});
				
			}


		}

	}

	function Weather() {
			this.weatherData = null;
	}

	Weather.prototype = {
		
		fetchLatestWeather: function() {
		var self = this;
		
		$.ajax({
			url: "https://api.forecast.io/forecast/"+forecastAPIKey+"/"+forecastLatLong,
			type: "get",
			dataType: "jsonp",
			success: function(response) {
			self.weatherData = response;
			
			self.updateCurrentWeather();
			self.updateGreeting();
			/* self.updateupcomingWeather(); */
			},
			error: function() {
				errorAlert("Couldn't grab weather",90000);
			}
		});
			
		},
		
		updateCurrentWeather: function() {
		/* GET EM */

		var weather = this.weatherData;
		var temp = Math.round(weather.currently.temperature);
		var icon = weather.currently.icon;
		var currentprecip = weather.currently.precipIntensity;
		var nexthour = weather.minutely.summary;
		var nexthourshort = nexthour.replace("starting ","");
		var mintilrain = nexthour.replace(/[^0-9]/g,'');


		/* ARRAY PROCESSING */

		function setChart(time, data) {
			/* SET IT */
			chart.xAxis[0].setCategories(time, false);
			chart.series[0].setData(data);

			/* ADJUST FOR EXTREMES */
			extremes = chart.yAxis[0].getExtremes();
			chart.yAxis[0].setExtremes(extremes.dataMin, extremes.dataMax*1.15);
		}

		function WillItRain(weather, hoursOut, sensitivity) {
			var rainProp = 0;
			for (i = 0; i < hoursOut; i+=1) {
				rainProp += weather.hourly.data[i].precipProbability;
			}
			if (rainProp > sensitivity) {
				return true;
			} else {
				return false;
			}
			console.log("rain prop: " + rainProp)
		}

		function HourlyWeather(weather) {

			/* FOR HOURLY GRAPH */
			upcomingWeather = [];
			upcomingWeatherTimes = [];



			for (i = 0; i < 24; i+=2) {

				/* TIME */
				
				var date = new Date(weather.hourly.data[i].time*1000);
				var hour = date.getHours();
				var formattedHour;
				if (i === 0) {
					formattedHour = "Now";
				} else {
					if (hour > 12) {
							formattedHour = (hour-12)+'<span class="ampm">PM</span>';
					} else if (hour == 0) {
							formattedHour = '12<span class="ampm">AM</span>';
					} else if (hour == 12) {
							formattedHour = '12<span class="ampm">PM</span>';
					} else {
						formattedHour = hour+'<span class="ampm">AM</span>';
					}
				}

				/* TEMP */

				var hourTemp = Math.round(weather.hourly.data[i].temperature);

				/* SYMBOL */

				var hourSymbol = weather.hourly.data[i].icon;

				/* RAIN SYMBOL CHECK */
				
				if (hourSymbol == "rain") {
					var rainIntensity = weather.hourly.data[i].precipIntensity;
					// console.log(rainIntensity);
					switch (true) {
						case (rainIntensity <= 0.015): // drizzle 0.002
							hourSymbol += "-drizzle";
							break;
						case (rainIntensity > 0.015 || rainIntensity <= 0.08): // light 0.017
							hourSymbol += "-light";
							break;
						case (rainIntensity > 0.08 || rainIntensity <= 0.3): // med 0.1
							hourSymbol += "-med";
							break;
						case (rainIntensity > 0.3): // heavy 0.4
							hourSymbol += "-heavy";
							break;
					};
				}

				/* TEMP FONT COLOR SET */

				var hourFontColor;

				switch (hourSymbol) {
					case("snow"):
					case("rain-drizzle"):
					case("rain-light"):
					case("rain-med"):
					case("rain-heavy"):
						hourFontColor = "#0071ba";
						break
					case("clear-night"):
					case("cloudy"):
					case("partly-cloudy-night"):
						hourFontColor = "#808080";
						break
					case("fog"):
					case("wind"):
						hourFontColor = "#ab44f8";
						break
					case("clear-day"):
					case("partly-cloudy-day"):
						hourFontColor = "#ffc600";
						break
				}

				/* ADD 'ER IN */

				upcomingWeatherTimes.push(formattedHour);
				formattedWeather = $.parseJSON('{ "y" : '+hourTemp+', "marker": { "symbol": "url(images/icons/'+hourSymbol+'.png)", "width": 45, "height": 45 }, "dataLabels": { "color": "'+hourFontColor+'" } }');
				upcomingWeather.push(formattedWeather);
			}

			/* SEND BACK */

			// console.log(upcomingWeather);
			// console.log(upcomingWeatherTimes);

			var returnValues = [upcomingWeatherTimes,upcomingWeather];
			return returnValues;
		}


		/* CHECK AND SET WEEKLY WEATHER */

		function setWeeklyWeather(weather) {
			weekWeatherData = [];
			weekWeatherDays = [];
			var weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
			for (i = 0; i < 6; i++) {
				/* DAY NAMES */
				if(i === 0) {
					weekWeatherDays.push("Today");
				} else {
					var date = new Date(weather.daily.data[i].time*1000);
					var formattedDay = weekday[date.getDay()];
					weekWeatherDays.push(formattedDay);
				}

				/* WEATHER */
				formattedWeather = $.parseJSON('{ "y" : '+weather.daily.data[i].temperatureMax+', "marker": { "symbol": "url(images/icons/'+weather.daily.data[i].icon+'.png)", "width": 30, "height": 30 } }');
				weekWeatherData.push(formattedWeather);
			}
			setChart(weekWeatherDays,weekWeatherData);
		}


		/* SET GRAPH */
		var hourlyData = HourlyWeather(weather);
		// console.log(hourlyData);
		

		chart.xAxis[0].setCategories(hourlyData[0], false);
		chart.series[0].setData(hourlyData[1]);

		/* PROTECT YA NECK & BUILD DAT GRAPH */
		extremes = chart.yAxis[0].getExtremes();
		chart.yAxis[0].setExtremes(extremes.dataMin, extremes.dataMax*1.15);



		/* ALERT FOR PRECIP */

		$( ".nexthour" ).html(nexthour);
		if(((/\d/.test(nexthourshort)) && mintilrain < 31) || currentprecip > 0.005){
			$( "#precipalert" ).html(nexthourshort);
			$( "#precipalert" ).animate({
				bottom: "0"
			}, 200);
		} else {
			$( "#precipalert" ).animate({
				bottom: "-137px"
			}, 200);
		}

		/* UMBRELLA CHECK */

		if (WillItRain(weather, 15, 0.15)) {
			$("#umbrella").show();
		} else {
			$("#umbrella").hide();
		}




		/* CHECK LIGHTS */

		function checkLights(callback) {
			return $.ajax({
				url: "http://10.0.1.120/outlet/status/all",
				type: "GET",
				dataType: "jsonp",
				success: callback
			});
		}

		/*checkLights().done(function(result) {
			console.log(result.all);
		}); */


		/* CHECK UBER */
		checkUber();

		/* DO SOME CAR2GO SHIT */

		homePoint = {
			lat: screenLat,
			lon: screenLong
		};

		toRad = function (value) {
			return value * Math.PI / 180;
		}


		function tryCar(callback) {
			return $.ajax({
				url: "http://www.car2go.com/api/v2.1/vehicles?loc=newyorkcity&oauth_consumer_key=HomeScreen&format=json",
				type: "GET",
				dataType: "json",
				success: callback
			});
		}


		distanceCheck = function(point1, point2) {
			var R = 6371; // earth radius in km
			var x = (toRad(point2.lon)-toRad(point1.lon)) * Math.cos((toRad(point1.lat)+toRad(point2.lat))/2);
			var y = (toRad(point2.lat)-toRad(point1.lat));
			return Math.sqrt(x*x + y*y) * R;
		};


		tryCar().done(function(result) {
			distanceToHome = 99999;
			carData = result.placemarks;
			// console.log(carData);
			carPageNum = (Math.ceil(result.placemarks.length / 100)-1);
			for (var key in carData) {
				if (carData.hasOwnProperty(key)) {
					thisCarLat = carData[key].coordinates[1];
					thisCarLong = carData[key].coordinates[0];
					thisCarLoc = {
						lat: thisCarLat,
						lon: thisCarLong
					}
					thisCarDistanceToHome = distanceCheck(homePoint,thisCarLoc);
					// console.log("This car is "+thisCarDistanceToHome+" km from home.");
					if (thisCarDistanceToHome < distanceToHome) {
						distanceToHome = thisCarDistanceToHome;
						distanceToHomeMiles = thisCarDistanceToHome * 0.621371;
						// console.log("NEW RECORD! at "+carData[key].address);
						winnerCar = {
							distanceMiles: distanceToHomeMiles,
							lat: carData[key].coordinates[1],
							lon: carData[key].coordinates[0],
							vin: carData[key].vin
						}
					}
				}
			}

			/* MAKE THOSE MILES HOT */
			switch (true) {
				case (distanceToHomeMiles < 0.20): // feet time
					distanceToHomeEnglish = (Math.round((distanceToHomeMiles*5280)/100) * 100) + " ft";
					break;
				case ((distanceToHomeMiles >= 0.20) && (distanceToHomeMiles < 0.40)): // 1/4 mile
					distanceToHomeEnglish = "1/4 mi";
					break;
				case ((distanceToHomeMiles >= 0.40) && (distanceToHomeMiles < 0.65)): // 1/2 mile
					distanceToHomeEnglish = "1/2 mi";
					break;
				case ((distanceToHomeMiles >= 0.65) && (distanceToHomeMiles < 0.90)): // 3/4 mile
					distanceToHomeEnglish = "3/4 mi";
					break;
				case ((distanceToHomeMiles >= 0.90) && (distanceToHomeMiles < 1.1)): // 1 mile
					distanceToHomeEnglish = "1 mi";
					break;
				case (distanceToHomeMiles >= 1.1): // >1 mile
					distanceToHomeEnglish = "&gt;1 mi";
					break;
			}


			/* PROCESS */
			// console.log("GOT HERE!");
			// console.log("final distance is "+distanceToHomeEnglish);
			$( "#car2go" ).text(distanceToHomeEnglish);
			googleURL = "https://maps.googleapis.com/maps/api/staticmap?size=480x355&maptype=roadmap&markers=color:green%7C"+screenLat+","+screenLong+"&markers=color:red%7C"+winnerCar.lat+","+winnerCar.lon;
			$('#car2goscreen').css("background-image", "url("+googleURL+")");
			
		}).fail(function() {
			// an error occurred
		});

		},

		updateGreeting: function() {
		var d = new Date();
		var h = d.getHours();
		if(h < 12 && h > 5) {
			$( "#greeting" ).html("Good morning");
		} else if(h >= 12 && h < 17) {
			$( "#greeting" ).html("Good afternoon");
		/* } else if(h >= 17 && h < 22) {
			$( "#greeting" ).html("Good evening"); */
		} else {
			$( "#greeting" ).html("Good evening");
		}
		}
	};



	// var skycons = new Skycons(); 
	var weather = new Weather();
	weather.fetchLatestWeather();
	var subway = new Subway();
	subway.fetchSubwayInfo();
	window.setInterval(function(){ weather.fetchLatestWeather(); subway.fetchSubwayInfo();},120000);


	function startTime() {
		var today=new Date();
		var hh=today.getHours();
		var h=today.getHours();
		if(h > 12) {
			hh = h-12;
		} else if(h==0) {
			hh = 12;
		}
		var m=today.getMinutes();
		m = checkTime(m);
		$("#clock").html(hh+":"+m);
		var t = setTimeout(function(){startTime()},500);
	}

	function checkTime(i) {
		if (i<10) {i = "0" + i};  // add zero in front of numbers < 10
		return i;
	}

	startTime();





			

	/* $( "#highcharts-0" ).click(function() {
		$( "#weatherscreen" ).fadeToggle( 100 );
	}); */
	$( "#transit" ).click(function() {
		$( "#transitscreen" ).fadeToggle( 100 );
	});
	$( "#car2go" ).click(function() {
		$( "#car2goscreen" ).fadeToggle( 500 );
	});
	$( "#subwayicons").delegate('a', 'click', function() {
		console.log("Hello even.");
		var subwayTarget = "#screen"+event.target.id;
		$( subwayTarget ).fadeToggle( 500 );
		$("#subwayscreens_container").fadeIn(500);
		$(".subwayscreen_content").kinetic();
	});
	$( "#childscreen_container" ).delegate('div', 'click', function() {
		$( this ).fadeToggle( 500 );
	});
	$( ".alert" ).click(function() {
		$( this ).animate({bottom: "-137px"}, 200);
	});
	$( "#light" ).click(function() {
		toggleLights();
	});
	/* $( "#ac" ).click(function() {
		triggerWemo("wall");
	}); */



});

	function checkUber() {
		// console.log("Requesting updated time estimate...");
		$.ajax({
		url: "https://api.uber.com/v1/estimates/time",
		headers: {
			Authorization: "Token " + uberAPIKey
		},
		data: { 
			start_latitude: screenLat,
			start_longitude: screenLong,
			product_id: uberXProductID,
		},
		success: function(result) {
			// console.log(JSON.stringify(result));
			uberTime = Math.round(result.times[0].estimate/60);
			// console.log(uberTime);
			$( "#uber" ).text(uberTime + " min");
		}
		});
		/* $.ajax({
		url: "https://api.uber.com/v1/estimates/price",
		headers: {
			Authorization: "Token " + uberAPIKey
		},
		data: { 
			start_latitude: screenLat,
			start_longitude: screenLong,
			end_latitude: screenLat,
			end_longitude: screenLong,
		},
		success: function(result) {
			// console.log(JSON.stringify(result));
			result.prices.
			uberTime = Math.round(result.times[0].estimate/60);
			// console.log(uberTime);
			$( "#uber" ).text(uberTime + " min");
		}
		}); */
	}


$( window ).load(function() {
	$("#preloader img").fadeIn(1500).delay(2000).queue(function(next) {
		$( "#preloader" ).fadeOut(1500);
	});
	
});