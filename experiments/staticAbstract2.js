function setup() {
    createCanvas(400, 400);
  }
  
  function draw() {
    background(random(0,40),random(0,40),random(0,40));
    randomColorGrid();
    push();
    fill(255);
    textSize(10);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text("Click to generate again!", 325, 385);
    pop();
  }
  
  function randomColorGrid() {
    push();
    strokeWeight(0);
    for (let i = 0; i < 30; i++) {
  
      for (let p = 0; p < 100; p++) {
        rotate((p*PI/5)%300);
        fill(floor(random(50,100)), floor(random(0, 255)), floor(random(100, 200)), random(30,255));
        beginShape();
        vertex(random(random(0,150),random(0,200)), 0);
        vertex(400, 400);
        vertex(-400, -400);
        vertex(random(30 * i, 400)%400, random(45 * p, 30 * p)%400);
        vertex(400, 400);
        endShape(CLOSE);
      }
    }
    pop();
    noLoop();
  }
  
  function mousePressed() {
    loop();
  }
  