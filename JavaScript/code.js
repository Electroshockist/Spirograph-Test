let canvas;

let ss;

let points = [];

let offset;
let canvasScale = 1;

function setup(){
    let canvasContainer = document.getElementById("canvas");
    canvas = createCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
    canvas.parent("canvas");
    
    offset = createVector(0, 0);
    
    ss = new SpinnerSystem();
    ss.addSpinner(new Spinner(200, -4, -0));
    ss.addSpinner(new Spinner(120, 6, 180));
}

function draw(){
    translate(offset.x, offset.y);
    scale(canvasScale);
    
    if(deltaTime >= timeStep){
        if(points.length > maxPoints){
            points.shift();
        }

        background(0);
        fill(255);

        ss.spin();

        //todo: add point lifetime
        points.push(ss.spinners[ss.spinners.length-1].pos);

        drawLine();    
        drawGuides();        
    }
}

function mouseDragged(){
  offset.add(createVector(mouseX-pmouseX, mouseY-pmouseY))
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouseWheel(event) {
    let scrollSpeed = event.delta/10000;
    
    print(scrollSpeed);
  
    canvasScale += scrollSpeed;
}

function drawLine(){    
    strokeWeight(3);    
    stroke(255, 0,100);
    
    for (let i = 0; i < points.length; i ++){
        if(i > 0){
            line(points[i].x, points[i].y, points[i-1].x, points[i-1].y);
        }
    }
}

function drawGuides(){
    for(let i = 0; i < ss.spinners.length; i++){
            
        const spinner = ss.spinners[i];
        
        stroke(100, 100, 100);
        fill(0,0, 0,0)
        strokeWeight(1);
        
        let spinX = Math.cos(spinner.angle) * spinner.length;
        let spinY = Math.sin(spinner.angle) * spinner.length;
        
        let posX = spinner.pos.x - spinX;
        let posY = spinner.pos.y - spinY;
        
        circle(posX, posY, spinner.length*2);
        line(spinner.pos.x, spinner.pos.y, posX, posY)
    }
}