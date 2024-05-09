let basket = document.querySelector(".basket");
let objects = document.querySelector(".objects");
let scoreDiv = document.querySelector(".score");
let score = 0;
let objectInterval;

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    moveBasket(e.key);
  }
});

function moveBasket(direction) {
  let basketLeft = basket.offsetLeft;
  if (direction === "ArrowLeft" && basketLeft > 0) {
    basket.style.left = `${basketLeft - 10}px`;
  } else if (direction === "ArrowRight" && basketLeft < 350) {
    basket.style.left = `${basketLeft + 10}px`;
  }
}

function createObject() {
  let object = document.createElement("div");
  object.className = "object";
  object.style.top = "0px";
  object.style.left = `${Math.floor(Math.random() * 380)}px`;
  objects.appendChild(object);
  animateObject(object);
}

function animateObject(object) {
  let top = 0;
  let interval = setInterval(() => {
    top += 5;
    object.style.top = `${top}px`;
    if (top > 600) {
      clearInterval(interval);
      objects.removeChild(object);
      if (!didCatch(object)) {
        gameOver();
      }
    }
  }, 16);
}

function didCatch(object) {
  let basketLeft = basket.offsetLeft;
  let objectLeft = object.offsetLeft;
  if (objectLeft >= basketLeft && objectLeft <= basketLeft + 50) {
    score++;
    scoreDiv.textContent = `Score: ${score}`;
    return true;
  }
  return false;
}

function gameOver() {
  alert(`Game Over! Your score is ${score}`);
  location.reload();
}

objectInterval = setInterval(createObject, 1000);
