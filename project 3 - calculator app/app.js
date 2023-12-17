// theme change

const values = ["0.1rem", "1.1rem", "2.1rem"];

const changeTheme = (number, value) => {
  document.body.className = "";
  document.body.classList.add("theme-" + number);
  document.getElementById("dot").style.left = values[value];
}

for (let i = 1; i < 4; i++) {
  document.getElementById("change-" + i).addEventListener("click", () => {
    changeTheme(i, i - 1 );
  });
}

// calculator

let displayText = String();
let display = document.getElementById("display-content");

for(i = 0; i < 10; i++) {
  let num = document.getElementById("num-" + [i])
  num.addEventListener("click", () => {
    if (displayText === "Error") {
      displayText = "";
    };
    displayText += String(num.innerHTML);
    display.innerHTML = displayText;
  });
}

const mathOperators = document.querySelectorAll(".math");

mathOperators.forEach(op => {
  op.addEventListener("click", () => {
    if (displayText === "Error") {
      displayText = "";
    };
    displayText += String(op.innerHTML);
    display.innerHTML = displayText;
  })
})

document.getElementById("del").addEventListener("click", () => {
  if (displayText === "Error") {
    displayText = "";
  } else {
    displayText = displayText.substring(0, displayText.length - 1);
  }
  display.innerHTML = displayText;
})

document.getElementById("reset").addEventListener("click", () => {
  displayText = "";
  display.innerHTML = displayText;
})

document.getElementById("equals").addEventListener("click", () => {
  displayText = displayText.replace("÷", "/").replace("×", "*").replace("−", "-");

  try {
    let result = Math.round((eval(displayText) + Number.EPSILON) * 100) / 100;
    displayText = String(result);
  }
  catch {
    displayText = "Error";
  }

  if (displayText === "Infinity" || displayText === "NaN") {
    displayText = "Error";
  }

  display.innerHTML = displayText;
});