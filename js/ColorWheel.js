import { Selector } from "./Selector.js";
import { hsv_to_rgb, rgb_to_hsv, getRandomColor } from "./utils.js";

export class ColorWheel {
  constructor(x, y, r, R) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.R = R;
    this.res = 0.5;
    this.points = this.generate();
    const wt = this.R - this.r;
    this.selectors = [new Selector(1 * wt, 0.85 * wt), new Selector(0.75 * wt, 0.95 * wt, -0.02)];
  }

  display() {
    noStroke();
    for (let v of this.points) {
      fill(v.color);
      beginShape();
      vertex(v.x1, v.y1);
      vertex(v.x3, v.y3);
      vertex(v.x4, v.y4);
      vertex(v.x2, v.y2);
      endShape(CLOSE);
    }
  }

  generate() {
    let points = [];
    for (let angle = 0; angle < 360; angle += this.res) {
      let radian = radians(angle);
      let nextRadian = radians(angle + 2 * this.res);
      let x1 = this.x + cos(radian) * this.R;
      let y1 = this.y + sin(radian) * this.R;
      let x2 = this.x + cos(radian) * this.r;
      let y2 = this.y + sin(radian) * this.r;
      let x3 = this.x + cos(nextRadian) * this.R;
      let y3 = this.y + sin(nextRadian) * this.R;
      let x4 = this.x + cos(nextRadian) * this.r;
      let y4 = this.y + sin(nextRadian) * this.r;
      points.push({
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        x3: x3,
        y3: y3,
        x4: x4,
        y4: y4,
        color: hsv_to_rgb(angle, 100, 100),
        hsv: [angle, 100, 100],
      });
    }
    return points;
  }

  getColor(mouseX, mouseY) {
    let dx = mouseX - this.x;
    let dy = mouseY - this.y;
    let r_angle = Math.atan2(dy, dx); // Angle in radians
    let d_angle = degrees(r_angle); // Convert to degrees
    if (d_angle < 0) d_angle += 360;

    // Update selector position based on mouse position
    let radius = (this.R + this.r) / 2;
    let pointerX = this.x + radius * cos(r_angle);
    let pointerY = this.y + radius * sin(r_angle);

    // loop through selectors
    for (let s of this.selectors) {
      s.update(pointerX, pointerY);
      s.display();
    }

    // Return the color and the selector position
    return {
      rgb: hsv_to_rgb(d_angle, 100, 100), // RGB as a list
      hsv: [d_angle, 100, 100], // HSV as a list
    };
  }

  isPointInQuad(px, py, quad) {
    function sign(p1x, p1y, p2x, p2y, p3x, p3y) {
      return (p1x - p3x) * (p2y - p3y) - (p2x - p3x) * (p1y - p3y);
    }

    let d1 = sign(px, py, quad.x1, quad.y1, quad.x2, quad.y2);
    let d2 = sign(px, py, quad.x2, quad.y2, quad.x4, quad.y4);
    let d3 = sign(px, py, quad.x4, quad.y4, quad.x3, quad.y3);
    let d4 = sign(px, py, quad.x3, quad.y3, quad.x1, quad.y1);

    let hasNeg = d1 < 0 || d2 < 0 || d3 < 0 || d4 < 0;
    let hasPos = d1 > 0 || d2 > 0 || d3 > 0 || d4 > 0;

    return !(hasNeg && hasPos);
  }
}
