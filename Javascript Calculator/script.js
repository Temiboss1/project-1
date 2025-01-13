const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let currentInput = "";

const updateDisplay = (value) => {
  display.textContent = value || "0"; 
};

const clearCalculator = () => {
  currentInput = "";
  updateDisplay("0");
};

const evaluateExpression = () => {
  try {
   
    const result = eval(currentInput.replace(/--/g, "+")); 
    currentInput = parseFloat(result.toFixed(4)).toString();
    updateDisplay(currentInput);
  } catch {
   
    currentInput = "";
    updateDisplay("Error");
  }
};

const handleButtonClick = (e) => {
  const value = e.target.textContent;

  if (value === "C") {
    clearCalculator();
    return;
  }

  if (value === "=") {
    evaluateExpression();
    return;
  }

  if (["+", "-", "*", "/"].includes(value)) {
    if (value === "-") {
     
      const lastTwo = currentInput.slice(-2);
      if (lastTwo === "--") return; 
      currentInput += value;
    } else {
      currentInput = currentInput.replace(/[\+\*\/\-]+$/, "") + value;
    }
    updateDisplay(currentInput || "0");
    return;
  }

  if (!isNaN(value)) {
    
    const parts = currentInput.split(/[\+\-\*\/]/);
    const lastPart = parts[parts.length - 1];
    if (lastPart === "0" && value === "0") return; 
    if (lastPart === "0" && value !== "0") {
      currentInput = currentInput.slice(0, -1) + value; 
    } else {
      currentInput += value;
    }
    updateDisplay(currentInput);
    return;
  }

  if (value === ".") {
    const parts = currentInput.split(/[\+\-\*\/]/);
    if (!parts[parts.length - 1].includes(".")) {
      currentInput += value;
    }
    updateDisplay(currentInput || "0");
    return;
  }
};

buttons.forEach((button) => button.addEventListener("click", handleButtonClick));

clearCalculator();
