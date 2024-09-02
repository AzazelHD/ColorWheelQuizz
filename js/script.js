import { ColorWheel } from "./ColorWheel.js";
import { hsv_to_rgb, rgb_to_hsv, getRandomColor } from "./utils.js";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

let timer;
let colorWheel;
let randomColor;
let selectedColor;
let comparisonResult;

let cx, cy, r, R;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight, P2D, $("#canvas"));

  timer = 10; // seconds

  cx = width / 2;
  cy = height / 2;
  r = 0.3 * height;
  R = 0.4 * height;

  colorWheel = new ColorWheel(cx, cy, r, R);

  randomColor = getRandomColor();

  selectedColor = null;
  comparisonResult = null;
}

function draw() {
  background(50);
  colorWheel.display();

  const hoveredColor = colorWheel.getColor(mouseX, mouseY);
  if (hoveredColor) {
    // displayColorInfo(hoveredColor, 10, 10);

    // Display hovered color
    fill(hoveredColor.rgb);
    circle(width / 2, height / 2, R);
  }

  if (selectedColor) {
    // displayColorInfo(selectedColor, 10, 150);
  }

  if (comparisonResult !== null) {
    // displayComparisonResult();
  }

  // Display random color
  fill(randomColor.rgb);
  circle(width / 2, height / 2, r);
}

function mousePressed() {
  selectedColor = colorWheel.getColor(mouseX, mouseY);
  if (selectedColor) {
    comparisonResult = compareColors(randomColor.hsv, selectedColor.hsv);
  }
}

function displayColorInfo(color, x, y) {
  fill(255);
  textAlign(LEFT, TOP);
  textSize(32);
  text(`RGB: ${color.rgb.join(", ")}`, x, y);
  text(`HSV: ${color.hsv.map(Math.round).join(", ")}`, x, y + 50);
}

function compareColors(color1, color2) {
  const hueDiff = Math.abs(color1[0] - color2[0]);
  const satDiff = Math.abs(color1[1] - color2[1]);
  const valDiff = Math.abs(color1[2] - color2[2]);

  const hueScore = 100 - (hueDiff > 180 ? 360 - hueDiff : hueDiff) / 1.8;
  const satScore = 100 - satDiff;
  const valScore = 100 - valDiff;

  const totalScore = (hueScore + satScore + valScore) / 3;

  return {
    hueScore: Math.round(hueScore),
    satScore: Math.round(satScore),
    valScore: Math.round(valScore),
    totalScore: Math.round(totalScore),
  };
}

function displayComparisonResult() {
  fill(255);
  textAlign(LEFT, TOP);
  textSize(16);
  text("Comparison Result:", 10, 300);
  text(`Hue Similarity: ${comparisonResult.hueScore}%`, 10, 320);
  text(`Saturation Similarity: ${comparisonResult.satScore}%`, 10, 340);
  text(`Value Similarity: ${comparisonResult.valScore}%`, 10, 360);
  text(`Overall Similarity: ${comparisonResult.totalScore}%`, 10, 380);
}

window.setup = setup;
window.draw = draw;
window.mousePressed = mousePressed;
