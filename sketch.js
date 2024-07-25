var soundFile = [
  "assets/applause1.m4a",
  "assets/applause2.mp3",
  "assets/applause3.mp3",
  "assets/applause4.m4a",
  "assets/applause5.m4a",

  "assets/01.m4a",
  "assets/02.m4a",
  "assets/03.m4a",
  "assets/04.m4a",
  "assets/05.m4a",
  "assets/06.m4a",
  "assets/07.m4a",
  "assets/08.m4a",
  "assets/09.m4a",
  "assets/10.m4a",
  "assets/11.m4a",
  "assets/12.m4a",
  "assets/13.m4a",
  "assets/14.m4a",
  "assets/15.m4a",
  "assets/16.m4a",
  "assets/17.m4a",
  "assets/18.m4a",
  "assets/19.m4a",
  "assets/20.m4a",
  "assets/21.m4a",
  "assets/22.m4a",
  "assets/23.m4a",
  "assets/24.m4a",
  "assets/25.m4a",
  "assets/26.m4a",
  "assets/27.m4a",
  "assets/28.m4a",
  "assets/29.m4a",
  "assets/30.m4a"

];

let num =35;
var claps = [];
let onArr = [];

class Clap {
  constructor(x, y, soundFile, num) {
    this.x = x;
    this.y = y;
    this.sound = loadSound(soundFile);
    this.amp = new p5.Amplitude();
    this.num = num;
  }

  display() {
      if (this.sound.isPlaying()){
        fill(this.num*10-10, 70, 100);
        push();
        translate(this.x, this.y);
        rotate(TWO_PI/this.amp.getLevel()*100);
        ellipse(0, 0, 100-this.amp.getLevel()*1000, 100);
        pop();
      } else {
        fill(255);
        ellipse(this.x, this.y, 100);
      } 
  }

  mousePressed() {
    this.sound.setVolume(1.5);
    if (dist(mouseX, mouseY, this.x, this.y) <= 50) {
       
      if (this.sound.isPlaying() ){
        this.sound.pause();
        onArr.pop(this)
        console.log(onArr)
      } else {
        if (onArr.length>3) {       
          claps[claps.indexOf(onArr[0])].sound.pause();
          onArr.shift();
          console.log(claps[claps.indexOf(onArr[0])])
          console.log(onArr)
        } 
        this.sound.loop();
        this.amp.setInput(this.sound);
        onArr.push(this)
        console.log(onArr)
      }
      
    } 
  }


}

function setup() {
  createCanvas(windowWidth, windowHeight);

  
  colorMode(HSB, 360, 100, 100);

  strokeWeight(1);

  let row = floor(windowWidth/100);
  let row_empty = windowWidth-100*row
  let col = floor(windowHeight/100);
  let col_empty = windowHeight-100*col
  for (let i = row_empty/2+50; i < width; i+=100) {
    for (let j = col_empty/2+50; j < height; j+=100) {
      let randomNum = int(random(num));
      claps.push(new Clap(i, j, soundFile[randomNum], randomNum));  
  
    }
  }
  
  console.log(onArr.length)
}

function draw() {
  background(50, 100, 100);
  stroke(50, 100, 100);
  
  for(let i = 0; i < claps.length; i++) {
    claps[i].display();
  }

}

function mousePressed() {

  for(let i = 0; i < claps.length; i++) {
    claps[i].mousePressed();
  }
  
}

// when you hit the spacebar, what's currently on the canvas will be saved (as a
// "thumbnail.png" file) to your downloads folder
function keyTyped() {
  if (key === " ") {
    saveCanvas("thumbnail.png");
  }
}
