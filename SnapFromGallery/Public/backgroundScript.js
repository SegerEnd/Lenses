//@input Component.Image imageblur
//@input Component.Image imageblack
//@input Component.Image imagewhite
//@input Asset.Texture textureone
//@input Asset.Texture texturetwo
//@input int count
print("tap")
script.count+=1;
if(script.count>3){
    script.count = 1;
}
if(script.count==1){
    script.imageblur.enabled = false
    script.imageblack.enabled = true
    script.imagewhite.enabled = false
    print("1")
}
if(script.count==2){
    script.imageblur.enabled = false
    script.imageblack.enabled = false
    script.imagewhite.enabled = true
    print("2")
}
if(script.count==3){
    script.imageblur.enabled = true
    script.imageblack.enabled = false
    script.imagewhite.enabled = false
    print("3")
}