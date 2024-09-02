export function rgb_to_hsv(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  let cmax = Math.max(r, g, b),
    cmin = Math.min(r, g, b);
  let delta = cmax - cmin;
  let h = 0,
    s = 0,
    v = cmax;
  if (delta !== 0) {
    s = delta / cmax;
    if (cmax === r) {
      h = ((g - b) / delta) % 6;
    } else if (cmax === g) {
      h = (b - r) / delta + 2;
    } else {
      h = (r - g) / delta + 4;
    }
    h = Math.round(h * 60);
  }
  if (h < 0) {
    h += 360;
  }
  return [h, s * 100, v * 100];
}

export function hsv_to_rgb(h, s, v) {
  s /= 100;
  v /= 100;
  let C = v * s;
  let X = C * (1 - Math.abs(((h / 60) % 2) - 1));
  let m = v - C;
  let r1, g1, b1;
  if (0 <= h && h < 60) {
    [r1, g1, b1] = [C, X, 0];
  } else if (60 <= h && h < 120) {
    [r1, g1, b1] = [X, C, 0];
  } else if (120 <= h && h < 180) {
    [r1, g1, b1] = [0, C, X];
  } else if (180 <= h && h < 240) {
    [r1, g1, b1] = [0, X, C];
  } else if (240 <= h && h < 300) {
    [r1, g1, b1] = [X, 0, C];
  } else if (300 <= h && h < 360) {
    [r1, g1, b1] = [C, 0, X];
  }
  return [Math.round((r1 + m) * 255), Math.round((g1 + m) * 255), Math.round((b1 + m) * 255)];
}

export function getRandomColor() {
  const h = random(360);
  const s = 100;
  const v = 100;
  return {
    hsv: [h, s, v],
    rgb: hsv_to_rgb(h, s, v),
  };
}
