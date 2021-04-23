function setup() {
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    objectdetector=ml5.objectDetector("cocossd", modelLoaded);
  document.getElementById("status").innerHTML="Detecting Objects....";
}
status="";
objects=[];
function modelLoaded() {
  console.log("cocossd has loaded!😊🌈");
  status=true;
}

function gotResult(error,results) {
  if (error) {
    console.error(error);
  }
  else {
    console.log(results);
    objects=results;
  }
}

function draw() {
  image(video,0,0,380,380);
  if(status !="") {
    r=random(255);
    g=random(255);
    b=random(255);
    objectdetector.detect(video,gotResult);
    for (i=0;i<objects.length;i++){
      document.getElementById("status").innerHTML="Objects Detected!😊🌈"
      document.getElementById("number").innerHTML=objects.length;
  fill(r,g,b);
  percentage=floor(objects[i].confidence*100);
  text(objects[i].label+" "+percentage+"%",objects[i].x,objects[i].y);

  noFill()
  stroke(r,g,b);
  rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    }
  } 
}



