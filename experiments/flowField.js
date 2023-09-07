let v = [];
let particles = [];
let flowField;
let scl = 100;
let cols, rows;
let inc = 0.1;
let zoff = 0;
let paused = false;
const weight = 1.5;

function setup() {
  createCanvas(500, 500);
  cols = floor(innerWidth / scl);
  rows = floor(innerHeight / scl);
  fr = createP('');

  flowField = new Array(cols * rows);

  for (var i = 0; i < 1000; i++) {
    particles[i] = new Particle();
  }

  background(201);
}

function draw() {
  let yoff = 0;

  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = (x + y * cols);
      let angle = noise(xoff, yoff, zoff) * TWO_PI;
      xoff += inc;
      let v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowField[index] = v;
    }
    yoff += inc;
    zoff += 0.0005;
  }

  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flowField);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
}

setTimeout(() => {
  noLoop();
}, 50000);

class Particle {

  constructor(_pos, _vel, _acc) {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 5;
    this.prevPos = this.pos.copy();
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  show() {
    stroke(1, 1, random(0, (frameRate() * random(1, 8)) % 255), 4);
    strokeWeight(weight);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrev();
  }

  updatePrev() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }

  edges() {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrev();
    }
  }

  follow(vectors) {
    let x = floor(this.pos.x / scl);
    let y = floor(this.pos.y / scl);
    let index = x + y * cols;
    let force = vectors[index];
    this.applyForce(force);
  }
}

function keyPressed() {
  if (keyCode === 82) {
    clear();
    background(201);
  }
  if (keyCode === 32 && paused == false) {
    noLoop();
    paused = true;
  } else {
    loop();
    paused = false;
  }
}