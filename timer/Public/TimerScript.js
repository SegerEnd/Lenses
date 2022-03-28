// @input Component.Text textMillisecond
// @input Component.Text textSecond
// @input Component.Text textMinute
// @input Component.Text textHour
var hour = 0
var minute = 0;
var sec = 0;
var mili = 0
var stopTimer = true;
var secDebounce = false

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
        script.textMillisecond.text = "0" + mili.toString();
    }
    else {
        script.textMillisecond.text = mili.toString();
    }
    
    delayedEventMili.reset(0.01);
});

// Start with a 2 second delay
delayedEventMili.reset(1);



// Seconds
var delayedEventSecond = script.createEvent("DelayedCallbackEvent");

delayedEventSecond.bind(function(eventData)
{   
    if (sec == 1 && secDebounce == false) {
        secDebounce = true;
        sec = 1;
        script.textSecond.text = "0" + sec.toString();
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
        hour += 1;
    }
    if (hour > 24) {
        mili = 0;
        sec = 0;
        minute = 0;
        hour = 0;
    }
    
    if (sec < 10) {
        script.textSecond.text = "0" + sec.toString();
    }
    else {
        script.textSecond.text = sec.toString();
    }
    
    if (minute < 10) {
        script.textMinute.text = "0" + minute.toString();
    }
    else {
        script.textMinute.text = minute.toString();
    }
    
    if (hour < 10) {
        script.textHour.text = "0" + hour.toString();
    }
    else {
        script.textHour.text = hour.toString();
    }
    
    
    delayedEventSecond.reset(0.8);
});

// Start with a 2 second delay
delayedEventSecond.reset(1);