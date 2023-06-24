img = "";
status = "";
objects1 = "";

function preload()
{
    img= loadImage('desk.jpg');
}

function setup()
{
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting objects1";
}

function modelLoaded()
{
    console.log('modelLoaded');
    status = true;
    objectDetector.detect(img, gotResults);
}

function draw()
{
    image(img, 0, 0, 640, 420);
    
    if(status != "")
    {
        for(i=0; i < objects1.length; i++ )
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";

            fill("#7D0055");
            percent = floor(objects1[i].confidence * 100);
            text(objects1[i].label+""+ percent+"%", objects1[i].x +15 , objects1[i].y+15);
            noFill();
            stroke("#7D0055");
            rect(objects1[i].x -800, objects1[i].y, objects1[i].width, objects1[i].height);
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
    objects1 = results;
}

