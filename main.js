objects=[];
Status="";

img = "";
function preload(){
    img = loadImage('dog_cat.jpg');

}

function setup() {
    canvas = createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    video.size(380,380);
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="status:detecting objects";
}
function draw() {
    image (video, 0, 0, 380,380);
 
    if(Status!=""){
        objectDetector.detect(video,gotresult);
        r=random(255);
        g=random(255);
        b=random(255);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="status: objects detected";
            document.getElementById("no_objectdetected").innerHTML="number of objects detected are -"+ objects.length;
            fill(r,g,b);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

        }
    }
}
function modelLoaded()
{
    console.log("modelloaded");
    Status=true;
    
}
function gotresult(error,results)
{
    if(error){console.log(error);}
    console.log(results);
    objects=results;
}