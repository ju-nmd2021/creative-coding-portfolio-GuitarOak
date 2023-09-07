function setup(){
    createCanvas(400,400);
}

function draw(){
    background(255);
    stripedBG();
    chaos();
    randomColorGrid();
    push();
    fill(0);
    textSize(12);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text('Click to generate again!',325, 385);
    pop();
}

function randomColorGrid(){
    push();
    translate(width/2);
    strokeWeight(0);
    for (let i = 0; i < 5; i++) {
        for (let p = 0; p < 5; p++) {
            //Shadow
            fill(0,0,0,90);
            ellipse(55+i*75,43+p*75,50,50);
            //Main Circles
            fill(floor(random(0,255)), floor(random(0,255)), floor(random(0,255)));
            ellipse(50+i*75,40+p*75,50,50);
        }
    }
    pop();
    noLoop();
}

function chaos(){
    push();
    rotate(radians(45));
    stroke(0,0,0,25);
    strokeWeight(3);
    for (let i = 0; i < 8; i++) {
        for (let p = 0; p < 8; p++) {
            fill(0,0,0,0);
            ellipse(50+i*75,-225+p*75,50,50);
        }
    }
    pop();
    noLoop();
}

function stripedBG(){
    noStroke();
    push();
    rotate(radians(45));
    for(let i=0; i<12;i++){
        fill(floor(random(1,255)),floor(random(1,255)),floor(random(1,255)), 60);
        rect(0,-300+i*50,width*1.25,50);
    }
    pop(); 
    push();
    rotate(radians(-45));
    for(let i=0; i<12;i++){
        fill(floor(random(1,255)),floor(random(1,255)),floor(random(1,255)), floor(random(20,155)));
        rect(-600+i*50,0+i*50,width*1.25,50);
    }
    pop();
    noLoop();
}


function mousePressed(){
    loop();
}