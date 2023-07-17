let block = document.getElementById("block");
let hole = document.getElementById("hole");
let bird = document.getElementById("bird");
let jumping = 0;
let counter = 0;

hole.addEventListener("animationiteration", () => {
  let random = -(Math.random() * 300 + 150);
  hole.style.top = random + "px";
  counter++;
});

document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    jump();
  }
});

setInterval(function () {
  var birdTop = parseInt(window.getComputedStyle(bird).getPropertyValue("top"));
  if (jumping === 0) {
    bird.style.top = birdTop + 3 + "px";
  }

  let blockLeft = parseInt(
    window.getComputedStyle(block).getPropertyValue("left")
  );
  let holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));

  let cTop = -(window.innerHeight - birdTop);
  if (
    birdTop > window.innerHeight - bird.offsetHeight ||
    (blockLeft < bird.offsetWidth &&
      blockLeft > -block.offsetWidth &&
      (cTop < holeTop || cTop > holeTop + hole.offsetHeight))
  ) {
    alert("Game Over, Score: " + (counter - 1));
    bird.style.top = 100 + "px";
    counter = 0;
  }
}, 10);

function jump() {
  if (jumping === 0) {
    jumping = 1;
    let jumpCount = 0;
    let jumpInterval = setInterval(function () {
      var birdTop = parseInt(
        window.getComputedStyle(bird).getPropertyValue("top")
      );
      if (birdTop > 6 && jumpCount < 15) {
        bird.style.top = birdTop - 5 + "px";
      }
      if (jumpCount >= 20) {
        clearInterval(jumpInterval);
        jumping = 0;
      }
      jumpCount++;
    }, 10);
  }
}
