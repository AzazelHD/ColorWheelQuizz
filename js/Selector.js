export class Selector {
  constructor(a, b, speed = 0.05) {
    this.x = 0;
    this.y = 0;
    this.a = a;
    this.b = b;
    this.angle = 0;
    this.speed = speed;
  }

  update(x, y) {
    this.x = x;
    this.y = y;
    this.angle += this.speed % TWO_PI;
  }

  display() {
    push();
    noFill();
    stroke(255);
    strokeWeight(2);
    translate(this.x, this.y);
    rotate(this.angle);
    ellipse(0, 0, this.a, this.b);
    pop();
  }
}
