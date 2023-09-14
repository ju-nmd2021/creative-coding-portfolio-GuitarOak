function setup() {
  createCanvas(innerWidth, innerHeight);
  frameRate(4);
}

function draw() {
  background(135, 206, 235);
  push();
  translate(width / 2, height - 30);
  stroke(0,150,90); 
  strokeWeight(2);
  branch(100);
  pop();
}

let xoff = 0.008;
function branch(length) {
  line(0, 0, 0, -length);
  translate(0, -length);
  length *= 0.67;
  if (length > 2) {
    for (let i = 0; i < 2; i++) {
      let angle = noise(xoff) * PI * random(-0.7, 0.7);
      push();
      rotate(angle);
      branch(length);
      pop();
    }
  }
}
