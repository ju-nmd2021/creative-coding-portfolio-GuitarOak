function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(random(0,100),random(0,100),random(0,100));
  randomColorGrid();
  push();
  fill(255);
  textSize(12);
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
      rotate((p*PI/5)%9);
      fill(floor(random(0, 255)), floor(random(0, 255)), floor(random(0, 255)), random(50,150));
      beginShape();
      vertex(130, 150);
      vertex(394, 400);
      vertex(random(30 * p, 400), random(45 * p, 30 * p));
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
