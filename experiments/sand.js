class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.lastPosition = createVector(x, y);
    this.velocity = createVector(random(-3, 3), random(-3, 3));
    this.acceleration = createVector(0.001, 0.01);
    this.topspeed = 10;
  }
  update() {

    let mouse = createVector(mouseX, mouseY);
    let distance = this.position.dist(mouse);
    if (distance <= 30) {
      let direction = p5.Vector.add(mouse, this.position);
      direction.normalize();
      direction.mult(0.99);
      this.acceleration = direction;
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.topspeed);
      this.position.add(this.velocity);
    }


  }
  draw() {
    push();
    translate(this.position.x, this.position.y);
    noStroke();
    fill(90);
    ellipse(0, 0, 6);
    pop();
  }
  checkEdges() {
    if (this.location.x > width) {
      this.location.x = 0;
    } else if (this.location.x < 0) {
      this.location.x = width;
    }

    if (this.location.y > height) {
      this.location.y = 0;
    } else if (this.location.y < 0) {
      this.location.y = height;
    }
  }
}
function setup() {
  createCanvas(innerWidth, innerHeight);
  fill(255);
  frameRate(60);
}

let particles = [];

function draw() {
  background(255, 255, 255);
  if (particles.length <= 400) {
    generateParticles();
  }
  for (let particle of particles) {
    particle.update();
    particle.draw();
  }
}
function generateParticles() {
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      const particle = new Particle(i * 5, j * 5);
      particles.push(particle);
    }
  }
}



