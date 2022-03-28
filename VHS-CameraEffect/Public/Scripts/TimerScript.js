// @input Component.Text textTimer
// @input Component.Text textPhoneType
// @input Component.Text textPhoneCamType
// @input Component.Text textPhoneDate
// @input Component.Text textPlayPause
var minute = 0;
var sec = 0;
var mili = 0
var stopTimer = true;
var secDebounce = false
global.playpauseMode = false

var OperatingSystem = global.deviceInfoSystem.getOS()
if (OperatingSystem == OS.iOS) {
    script.textPhoneType.text = "SOURCE " + "IPHONE";
}
else if (OperatingSystem == OS.Android) {
    script.textPhoneType.text = "SOURCE " + "ANDROID";
}
else if (OperatingSystem == OS.Windows) {
    script.textPhoneType.text = "SOURCE " + "WINDOWS";
}
else if (OperatingSystem == OS.MacOS) {
    script.textPhoneType.text = "SOURCE " + "MACBOOK";
}

var currentDate = new Date();
if(currentDate.getDay() == 0) {
    var dayOW = "SUN";
}
else if(currentDate.getDay() == 1){
    var dayOW = "MON";
}
else if(currentDate.getDay() == 2){
    var dayOW = "TUE";
}
else if(currentDate.getDay() == 3){
    var dayOW = "WED";
}
else if(currentDate.getDay() == 4){
    var dayOW = "THU";
}
else if(currentDate.getDay() == 5){
    var dayOW = "FRI";
}
else if(currentDate.getDay() == 6){
    var dayOW = "SAT";
}

if(currentDate.getDate() < 10) {
    var dayNum = "0" + currentDate.getDate().toString();
}
else{
    var dayNum = currentDate.getDate().toString();
}
if ((currentDate.getMonth()+1) < 10){
    var monthNum = ("0" + (currentDate.getMonth()+1)).toString();
}
else{
    var monthNum = (currentDate.getMonth()+1).toString();
}

script.textPhoneDate.text = dayNum+"."+monthNum+"."+currentDate.getFullYear().toString()+" "+dayOW;

var eventFront = script.createEvent("CameraBackEvent");
eventFront.bind(function(eventData)
{
    script.textPhoneCamType.text = "CAMERA2";
});

var eventBack = script.createEvent("CameraFrontEvent");
eventBack.bind(function(eventData)
{
    script.textPhoneCamType.text = "CAMERA1";
});

var delayedEventMili = script.createEvent("DelayedCallbackEvent");
delayedEventMili.bind(function(eventData)
{
    mili += 3;
    if (mili > 60) {
        mili = 0;
        if (sec == 0) {
            var secDebounce = false
            sec = 1;
        }
    }
    if (mili < 10) {
        var miliOutput = "0" + mili.toString();
    }
    else {
        var miliOutput = mili.toString();
    }
    
    if (sec < 10) {
        var secOutput = "0" + sec.toString();
    }
    else {
        var secOutput = sec.toString();
    }
    
    if (minute < 10) {
        var minuteOutput = "0" + minute.toString();
    }
    else {
        var minuteOutput = minute.toString();
    }
    script.textTimer.text = minuteOutput.toString() + ":" + secOutput.toString() + ":" + miliOutput.toString();
    delayedEventMili.reset(0.01);
});

// Start with a delay
delayedEventMili.reset(0.1);



// Seconds
var delayedEventSecond = script.createEvent("DelayedCallbackEvent");
var onoff = true

delayedEventSecond.bind(function(eventData)
{   
    if (sec == 1 && secDebounce == false) {
        secDebounce = true;
        sec = 1;
        delayedEventSecond.reset(1);
        return;
    }
    if (sec >= 60) {
        sec = 0;
        minute += 1;
    }
    if (sec <= 60 && sec > 0) {
        sec += 1;
    }
    if (minute > 60 ) {
        mili = 0;
        sec = 0;
        minute = 0;
    }
    if (global.playpauseMode == false){
        if (onoff == true){
            script.textPlayPause.text = "PLAY";;
            onoff = false;
        }
        else if (onoff == false){
            script.textPlayPause.text = "PLAY \u{25BA}";
            onoff = true;
        }
        
    }
    else if(global.playpauseMode == true){
        if (onoff == true){
            script.textPlayPause.text = "PAUSE";;
            onoff = false;
        }
        else if (onoff == false){
            script.textPlayPause.text = "PAUSE \u{25EB}";
            onoff = true;
        }
    }
    
    
    delayedEventSecond.reset(1);
});

// Start with a 2 second delay
delayedEventSecond.reset(0.1);