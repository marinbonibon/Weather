var note = document.querySelector('.mainDiv');
var temp = document.querySelectorAll('.temp');
var date = document.querySelectorAll('.date');
var icon = document.querySelectorAll('.icon');

function getAjaxWeather() {
	var req = new XMLHttpRequest();
	req.onload = function(){
		var res = req.response;
		for (var i = 0, tempcount = 0; i < temp.length; i++, tempcount = tempcount+8) {
			temp[i].textContent = Math.round(res.list[tempcount].main.temp - 273) + 'ºC';	
		}
		for (var i = 0, datecount = 0; i < date.length; i++, datecount = datecount+8) {
			var nextDate = new Date(res.list[datecount].dt_txt);
			var day = nextDate.getDate();
			var month = nextDate.getMonth();
			var time = nextDate.getHours();
			var nameMonth = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
			date[i].textContent = day + ' ' + nameMonth[month] + ' ' + time + ':00';
			//console.log(currentDate.toLocaleFormat(''));
		}
		for (var i = 0, iconcount = 0; i < temp.length; i++, iconcount = iconcount+8) {
			var nextIcon = res.list[iconcount].weather['0'].icon;
			var img = document.createElement('img');
			img.setAttribute('src', 'icons/' + nextIcon + '.png');
			icon[i].appendChild(img);
		}
		console.log(res.list);
	}
	var curWeather = new XMLHttpRequest();
	curWeather.onload = function(){
		var resNow = curWeather.response;
		var tempNow = document.querySelector('h1');
		var city = document.querySelector('.city');
		var iconNow = document.querySelector('.mainicon');
		var iconPng = resNow.weather['0'].icon;
		var windSpeed = resNow.wind.speed;
		var wind = document.querySelector('.speed');
		wind.textContent = ' ' + windSpeed + 'm/s';
		tempNow.textContent = Math.round(resNow.main.temp - 273) + 'ºC';
		city.textContent = resNow.name + ',' + resNow.sys.country;
		startTime();
		var date = new Date(1522265400*1000).toString();
		var img = document.createElement('img');
		img.setAttribute('src', 'icons/' + iconPng + '.png');
		img.className = 'main';
		iconNow.appendChild(img);
		console.log(date);
		console.log(resNow);
	}
	req.onerror = function(){
		console.log( req.status );
	}
	req.open("GET", "http://api.openweathermap.org/data/2.5/forecast?q=Minsk,by&APPID=0834d2c13fa4193cab803f29af0d683f", true);
	req.responseType = "json";
	req.send();
	curWeather.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=Minsk,by&APPID=0834d2c13fa4193cab803f29af0d683f", true);
	curWeather.responseType = "json";
	curWeather.send();
}
function checkTime(i) {
	if (i < 10) {
		i = "0" + i;
	}
	return i;
}

function startTime() {
	var today = new Date();
	var h = today.getHours();
	var m = today.getMinutes();
	m = checkTime(m);
	document.getElementById('time').textContent = " " + h + ":" + m;
}

getAjaxWeather();