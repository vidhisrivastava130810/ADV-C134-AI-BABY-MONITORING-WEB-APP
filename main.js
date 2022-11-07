sound = "";

function preload(){
    sound = loadSound("alarm.mp3")
}


function setup()
    {
       canvas = createCanvas(380,380);
       canvas.center();
       video = createCapture(VIDEO);
       video.size(380 , 380);
       video.hide();

    }
    function start(){
        objectDetector = ml5.objectDetector('cocossd',modelLoaded);
        document.getElementById("status").innerHTML = "Status : Detecting Objects";
    }

    function modelLoaded(){
        console.log("Model Loaded!");
        status= true;
        objectDetector.detect(video, gotResult);
    }

    img="";
    status = "";
    objects = [];

    function gotResult(error,results){
        if(error){
            console.log(error);
        }
        console.log(results);
        objects = results;
    }

   

    function draw()
    {
        image(video, 0, 0, 380, 380);
        if(status != "")
        {
            
            for(i=0 ;i < objects.length;i++){
                objectDetector.detect(video , gotResult);
                if(objects[i].label == "person"){
                    document.getElementById("status").innerHTML = "Status : Baby Detected";
                   
                 document.getElementById("number_of_objects").innerHTML = "Number of object detected are :"+objects.length;
                 fill(255,0,0);
                 percent  = floor(objects[i].confidence * 100);
                text(objects[i].label + " " + percent + "%" , objects[i].x + 15 , objects[i].y + 15);
                noFill();
                stroke(255,0,0);
                rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
                }
                else{
                    sound.play();
                    document.getElementById("status").innerHTML = "Status : Baby Not Detected";
                }
            }
            
        } 
                
                
                
            
    }
