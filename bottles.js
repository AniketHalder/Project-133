img = "";
status = "";
objects = "";

function preload()
{
    bottle_img= loadImage('bottle.jpg');
}

function setup()
{
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded()
{
    console.log('modelLoaded');
    status = true;
    objectDetector.detect(bottle_img, gotResults);
}

function draw()
{
    image(bottle_img, 0, 0, 640, 420);
    
    if(status != "")
    {
        for(i=0; i < objects.length; i++ )
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";

            fill("#7D0055");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label+""+ percent+"%", objects[i].x -550 , objects[i].y - 370);
            noFill();
            stroke("#FFFFFF");
            rect(objects[i].x -575 , objects[i].y -395 , objects[i].width, objects[i].height);
        }
    }
}

function gotResults(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}