var latty;
var longy;
var riz = "";
var weekString = ['Sun ', 'Mon ', 'Tue ', 'Wed ', 'Thu ', 'Fri ', 'Sat '];
var unitTemp = "?units=si&callback=?";

//FUNCTION TO CONVERT UNIX TIMESTAMP TO DATE
function unixConvert(unixTime) {
    var date = new Date(unixTime * 1000);
    return weekString[date.getDay()] + " " + date.getDate();
}

//HTML5 GEOLOCATION FUNCTION TO OBTAIN USER LOCATION
function getPos() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(usePos);
    } else {
        console.log("Geolocation is not supported");
    }
}

//CALLBACK FUNCTION TO PROCESS ACQUIRED COORDINATES
function usePos(pos) {
    latty = pos.coords.latitude;
    longy = pos.coords.longitude;

    //REVERSE GEOCODE TO GET MORE LOCATION INFO
    $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latty + "," + longy + "&key=YOURAPIKEY", function(data) {
        //console.log(data.results[1].address_components[0].short_name+", "+data.results[2].address_components[0].short_name);
        riz="";
        riz += data.results[1].address_components[0].short_name + ", " + data.results[2].address_components[0].short_name;
        document.getElementById("locCity").innerHTML = riz;

    });

    console.log(latty);
    console.log(longy);
    //GET CURRENT AS WELL AS 5 DAY WEATHER DATA AND DISPLAY
    var myToggle = document.getElementById("unitToggle");
    if(myToggle.checked) { //if toggle is set to fahrenheit
      unitTemp = '?callback=?';
      console.log ("Checked");
    } else {
      console.log("Unchecked");
      unitTemp = "?units=si&callback=?";
    }

    $.getJSON("https://api.forecast.io/forecast/YOURAPIKEY/" + latty + "," + longy + unitTemp , function(data) {
        console.log(data);

        //SETTING VARIABALE TO CURRENT TEMP DATA
        var rizTemp = data.currently.temperature.toFixed(1);

        //ADDING CURRENT TEMP DETAILS TO HTML MARKUP
        document.getElementById("locTemp-number").innerHTML = rizTemp;
        document.getElementById("locTemp-desc").innerHTML = data.currently.summary;
        var mainIcon = data.currently.icon;
        var skycons = new Skycons({
            "color": "#ffffff"
        });
        skycons.set("locTemp-icon", mainIcon);
        skycons.play();

        //ADDING DAILY WEATHER DATA (ARRAY) TO VARIABALE
        var tempArr = data.daily.data;
        console.log(tempArr);

        //LOOP THROUGH THE DAILY ARRAY
        for (var i = 0; i < 5; i++) {
            console.log(tempArr[i].temperatureMax);
            var html = '<p class="tempDate"></p>' + '<p class="dailyIcon"></p>' + '<p class="dailyTempH"></p>' + '&#124;' + '<p class="dailyTempL"></p>';
            var outerHTML = document.getElementById("day" + [i]);
            outerHTML.innerHTML = html;
        }

        for (var i = 0; i < 5; i++) {
            // Variable to create selector for list item
            var whichDay = 'day' + i.toString();
            //Assign date for current item to variable
            var dayString = unixConvert(tempArr[i].time);
            //Pass modified icon value to variable
            var dayIcon = tempArr[i].icon.split('')[0].toUpperCase() + tempArr[i].icon.slice(1);

            $('#' + whichDay + ' .tempDate').append(dayString);
            $('#' + whichDay + ' .dailyIcon').append(dayIcon);
            $('#' + whichDay + ' .dailyTempH').append(tempArr[i].temperatureMax + '<span class = "degSuper">o</span>');
            $('#' + whichDay + ' .dailyTempL').append(tempArr[i].temperatureMin + '<span class = "degSuper">o</span>');
        }


        //APPEND INNER MARKUP TO PARENT DIV OR CONTAINER

        $(".forecastDays").append(outerHTML);




    });

}

//SETTING THE PROTOCOL TO HTTPS SO AS TO CATER TO getCurrentPosition deprecation
window.onload = function() {
    console.log(location.href);
    if (location.protocol !== 'https:') {
        alert("For security reasons, please add \'https://\' to the start of your codepen URL");
    } else {
        window.onload = getPos();
    }
};

$('#unitToggle').change(getPos);


//TODO: Add '?unit=si$&callback=?' to 'defUnit' and '?callback=?' to 'impUnit' variables respectively
//TODO if statement that checks whether toggle button is celsius or fahrenheit. If celsius set to default variable, else set to imp variable.
//TODO then pass this variable to the getJSON
//TODO Finally add onclick function to toggle button, to run the 'getPos' function
//"?units=si&callback=?"
