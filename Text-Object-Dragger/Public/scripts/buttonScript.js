//@input Component.Text textDayName
//@input Component.Text textStreak
//@input Component.Text textCity
//@input Component.Text textDate
//@input Component.Text textTime
//@input Component.Text textTemperature
//@input int count
script.count+=1;
if(script.count>5){
    script.count=1;
}
if(script.count==1){
    script.textTime.enabled = false;
    script.textTemperature.enabled = false;
    script.textDate.enabled = true;
}
if(script.count==2){
    script.textDate.enabled = false;
    script.textTime.enabled = false;
    script.textTemperature.enabled = true;
}
if(script.count==3){
    script.textDayName.enabled=false;
    script.textDate.enabled = false;
    script.textTemperature.enabled = false;
    script.textStreak.enabled = true;
    script.textTime.enabled = true;
}
if(script.count==4){
    script.textDayName.enabled=false;
    script.textStreak.enabled = false;
    script.textCity.enabled= true;
    script.textDate.enabled = false;
    script.textTime.enabled = true;
    script.textTemperature.enabled = false;
    global.userContextSystem.requestCity(function(city) {
        script.textCity.text = city;
    });
}
if(script.count==5){
    script.textDayName.enabled=true;
    script.textCity.enabled = false;
    script.textStreak.enabled = false;
    script.textDate.enabled = false;
    script.textTemperature.enabled = false;
    script.textDayName.enabled = true;
    script.textTime.enabled = true;
}