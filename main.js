var status1="";
img="";
objects=[];
function preload(){
img=loadImage('dog_cat.jpg');
}
function setup(){
canvas=createCanvas(380,380);
canvas.center();
video=createCapture(VIDEO);
video.size(380,380);
video.hide();
objectDetector=ml5.objectDetector('cocossd',modelLoaded);
document.getElementById("status").innerHTML="status:detecting object";
}
function modelLoaded(){
    console.log("modelLoaded");
status1=true;
}
function gotResult(error,results){
if(error){
    console.log(error);
}
console.log(results);
objects=results;
}
function draw(){
image(video,0,0,380,380);
if(status1!=""){
    r=ramdom(255);
    g=ramdom(255);
    b=ramdom(255);
    objectDetector.detect(video,gotResult);
    for(i=0;i<objects.length;i++){
        document.getElementById("status").innerHTML="status:objects detected";
        document.getElementById("number_objects").innerHTML="number of objects detected-"+objects.length;
        fill(r,g,b);
        percent=floor(objects[i].confidence*100);
        text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

    }
}
}