lines = false;
dots = false;
dots2 = false;
rings = false;

function setup() {
  width = window.innerWidth;
  height = window.innerHeight;
  createCanvas(width, height);
  background(0);
  colorMode(HSB, 360, 100, 100, 100);
  frameRate(30);

  trailStrength = 4;

  colorOne = color(1, 25, 90);
  colorTwo = color(359, 75, 90); //colour for interpolation
  xoff = 0;
  yoff = 100;
  xinc = 0.0001
  yinc = 0.003
  noise = openSimplexNoise(xoff);
}

function draw() {
  background(0, 100, 0, trailStrength);
  noiseDetail(24);

  let n = noise.noise2D(0, xoff);
  let n2 = noise.noise2D(0, yoff);

  let numOfSegments = (map(n, -1, 1, 2, 40));

  //let numOfSegments = abs(map(mouseX, 0, 500, -20, 20));
  let stepAngle = TWO_PI / numOfSegments;

  //let length = map(mouseX, 0, 500, -200, 200)%200; //snaps at midpoint

  //let length = abs(map(mouseX, 0, 500, -200, 200));
  //let weight = abs(map(mouseY, 0, 500, -50, 50));

  let length = (map(n2, -1, 1, -20, 270));

  let weight = (map(n, -1, 1, 0, 50));
  let mainColour = lerpColor(colorOne, colorTwo, (map(n2, -1, 1, -.1, 1.1)));
  let invColour = lerpColor(colorTwo, colorOne, (map(n2, -1, 1, -.1, 1.1)));
  strokeWeight(weight);

  for (let i = 0; i <= TWO_PI; i += stepAngle) {
    push();
    translate(width / 2, height / 2);
    rotate(2 * i);
    //stroke(lerpColor(colorOne, colorTwo, abs(map(n, -1, 1, -1, 1))));
    stroke(mainColour);
    push();
    //  translate(width / 2, height / 2);
    rotate(i);

    if (lines) {
      line(weight / 2, weight / 2, length, length);
    }

    if (rings) {
      fill(0, 0, 0, 0, 0)
      stroke(invColour)
      ellipse(0, 0, window.innerHeight + (length / 2), window.innerHeight + (length / 2))
      stroke(mainColour)
      ellipse(0, 0, window.innerHeight + (length / 2) + 300, window.innerHeight + (length / 2) + 300)
      stroke(invColour)
      ellipse(0, 0, window.innerHeight + (length / 2) + 600, window.innerHeight + (length / 2) + 600)
      stroke(mainColour)
      ellipse(0, 0, window.innerHeight + (length / 2) + 900, window.innerHeight + (length / 2) + 900)
    }

    if (dots2) {
      fill(mainColour)
      for (let x = 0; x <= TWO_PI; x += TWO_PI / 3) {
        push();
        translate(length + weight + 10, length + weight + 10);
        rotate(x);
        noStroke()
        ellipse(length, length, weight, weight);
        pop();
      }
    }
    if (dots) {

      stroke(mainColour);
      ellipse(length + weight + 10, length + weight + 10, weight, weight);

    }

    fill(0, 0, 0, 0, 0)
    ellipse(0, 0, 10, 10);



    pop();
    pop();

    xoff += xinc;
    yoff += yinc;
  }
}
