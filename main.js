img="";
status="";
objects=[];
audio="";

function preload()
{
    audio=loadSound("Sleep Away.mp3");
}

function setup() 
{
    canvas=createCanvas(370,370);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects";

}

function modelLoaded() 
{
    console.log("Model Loaded!");
    status=true;
}

function gotResult(error,results) 
{
    if (error) 
    {
        console.error(error);
    } 
    else 
    {
        console.log(results);
        objects=results;
    } 
}

function draw() 
{
    image(video, 0, 0, 370, 370);
    if(status != "")
    {
        r=random(255);
        g=random(255);
        b=random(255);

        objectDetector.detect(video,gotResult);
        for (i = 0; i < objects.length; i++) 
        {
            document.getElementById("status").innerHTML="Status : Object Detected";
            document.getElementById("found_status").innerHTML="Baby Found";
            audio.stop();

            fill(r,g,b);
            percent=floor(objects[i].confidence* 100);
            text(objects[i].label+" "+percent+"%", objects[i].x, objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
    else
    {
      document.getElementById("found_status").innerHTML="Baby not Found";  
      audio.play();
    }
}

function play() 
{
    audio.play();
}