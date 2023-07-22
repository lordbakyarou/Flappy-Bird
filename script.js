let block = document.getElementById("block");
let block2 = document.getElementById("block2");

let bird = document.getElementById("bird");
let jumping = 0;
let counter = 0;

block.addEventListener("animationiteration", () => {
  let minHeight = 20;
  let maxHeight = 70;
  let randomHeight1 = randomHeight(minHeight, maxHeight);

  // Calculate the maximum possible height for block2 to maintain the 30% difference
  let maxHeightBlock2 = 100 - randomHeight1 - 30;
  let randomHeight2 = randomHeight(50, maxHeightBlock2); // Generate random height for block2 between 50% and maxHeightBlock2

  block.style.height = randomHeight1 + "%";
  block2.style.height = randomHeight2 + "%";
  counter++;
});

function randomHeight(min, max) {
  return Math.random() * (max - min) + min;
}

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

  let block1Left = parseInt(
    window.getComputedStyle(block).getPropertyValue("left")
  );
  let block2Left = parseInt(
    window.getComputedStyle(block2).getPropertyValue("left")
  );

  let block1Top = parseInt(
    window.getComputedStyle(block).getPropertyValue("top")
  );
  let block2Top = parseInt(
    window.getComputedStyle(block2).getPropertyValue("top")
  );

  let birdBottom = birdTop + bird.offsetHeight;

  // Check collision with block1
  if (
    birdTop < block1Top + block.offsetHeight &&
    birdBottom > block1Top &&
    block1Left < bird.offsetWidth
  ) {
    gameOver();
  }

  // Check collision with block2
  if (
    birdTop < block2Top + block2.offsetHeight &&
    birdBottom > block2Top &&
    block2Left < bird.offsetWidth
  ) {
    gameOver();
  }

  if (birdTop > window.innerHeight - bird.offsetHeight) {
    gameOver();
  }
}, 10);

function gameOver() {
  alert("Game Over, Score: " + (counter - 1));
  bird.style.top = 100 + "px";
  counter = 0;
}

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
