const buttonsContainer = document.querySelector(".buttonsContainer");
const numberScreen = document.querySelector(".numberScreen");
let firstNum = 0;
let secondNum = 0;
let operator = "";
const upperNumberInput = document.querySelector(".upperNumberInput");
const numberInput = document.querySelector(".numberInput");
let upperDisplayValue = [];
let displayValue = [];
let errorMessage = "Cannot Divide By Zero";

//Creating Calculator Buttons
for (let i=0;i<18;i++) {
   const calculatorButton = document.createElement("button");
   calculatorButton.classList.add("calculatorButton");

   function buttonSetup(a) {
      calculatorButton.textContent = a.toString();
      calculatorButton.addEventListener("click", () => {
         if (displayValue[0] === errorMessage) {
            displayValue = [];
         }

         if (displayValue.length === 0) {
            displayValue.push(a.toString());
         } else if (displayValue[0].toString().length < 15) {
            if (displayValue[0].indexOf("0") !== 0 || displayValue[0].includes(".")) {
               let newDisplayValue = displayValue.toString() + a.toString();
               displayValue.splice(0, 1, newDisplayValue);
            }
         }
         numberInput.textContent = displayValue.join("");
      });
   }

   function operationButtonSetup(op) {
      calculatorButton.textContent = op;
      calculatorButton.addEventListener("click", () => {
         if (displayValue[0] === errorMessage) {
            displayValue = [];
         }

         if (displayValue.length === 1 && upperDisplayValue.length === 0) {
            displayValue.push(op);
            upperDisplayValue = [...displayValue];
            displayValue = [];
            upperNumberInput.textContent = upperDisplayValue.join(" ");
            numberInput.textContent = displayValue;
         }
      });
   }

   if (i < 2) {
      calculatorButton.style.width = 140+"px";
   }

   //All Calculator Buttons
   if (i === 0) {
      calculatorButton.textContent = "C";
      calculatorButton.addEventListener("click", () => {
         displayValue = [];
         upperDisplayValue = [];
         numberInput.textContent = displayValue.join("");
         upperNumberInput.textContent = upperDisplayValue.join("");
      });
   } else if (i === 1) {
      calculatorButton.textContent = "<";
      calculatorButton.addEventListener("click", () => {
         if (displayValue[0] === errorMessage) {
            displayValue = [];
         }

         if (displayValue.length > 0) {
            let newDisplayValue = displayValue[0].toString();
            newDisplayValue = newDisplayValue.slice(0, -1);
            if (newDisplayValue != "") {
               newDisplayValue = parseInt(newDisplayValue);
               displayValue[0] = newDisplayValue;
            } else displayValue = [];
         } else if (upperDisplayValue.length > 0) {
            if (upperDisplayValue.length === 2) {
               upperDisplayValue = upperDisplayValue.slice(0, -1);
               let newDisplayValue = upperDisplayValue[0];
               upperDisplayValue = [];
               displayValue[0] = newDisplayValue;
            }
         }

         numberInput.textContent = displayValue.join("");
         upperNumberInput.textContent = upperDisplayValue.join("");
      });
   } else if (i === 2) {
      buttonSetup(7);
   } else if (i === 3) {
      buttonSetup(8);
   } else if (i === 4) {
      buttonSetup(9)
   } else if (i === 5) {
      operationButtonSetup("÷");
   } else if (i === 6) {
      buttonSetup(4);
   } else if (i === 7) {
      buttonSetup(5);
   } else if (i === 8) {
      buttonSetup(6);
   } else if (i === 9) {
      operationButtonSetup("x");
   } else if (i === 10) {
      buttonSetup(1);
   } else if (i === 11) {
      buttonSetup(2);
   } else if (i === 12) {
      buttonSetup(3);
   } else if (i === 13) {
      operationButtonSetup("-");
   } else if (i === 14) {
      calculatorButton.textContent = ".";
      calculatorButton.addEventListener("click", () => {
         if (displayValue[0] === errorMessage) {
            displayValue = [];
         }

         if (displayValue.length === 0) {
            displayValue.push("0.");
         } else if (!displayValue[0].toString().includes(".")) {
            let newDisplayValue = "" + displayValue[0] + ".";
            displayValue.splice(0, 1, newDisplayValue);
         }
         numberInput.textContent = displayValue.join("");
      });
   } else if (i === 15) {
      buttonSetup(0);
   } else if (i === 16) {
      calculatorButton.textContent = "=";
      calculatorButton.addEventListener("click", () => {
         if (displayValue[0] === errorMessage) {
            displayValue = [];
         }

         if (upperDisplayValue.length === 2 && displayValue.length === 1) {
            operationResult = operate(parseFloat(upperDisplayValue[0]), parseFloat(displayValue[0]), upperDisplayValue[1]);
            if (operationResult !== errorMessage) {
               operationResult = roundOpResult(operationResult);
            }
            displayValue = [];
            upperDisplayValue = [];
            displayValue.push(operationResult);
            numberInput.textContent = displayValue.join("");
            upperNumberInput.textContent = upperDisplayValue.join("");
         }
      })
   } else if (i === 17) {
      operationButtonSetup("+");
   }

   buttonsContainer.append(calculatorButton);   
};

function addition(a, b) {
   return a + b;
}

function subtraction(a, b) {
   return a - b;
}

function multiplication(a, b) {
   return a * b;
}

function division(a, b) {
   if (b === 0) {
      return errorMessage;
   } else return a / b;
}

function roundOpResult(num) {
   return Math.round(num * 1000) / 1000;
} 

function operate(a, b, op) {
   if (op === "+") {
      return addition(a, b);
   } else if (op === "-") {
      return subtraction(a, b);
   } else if (op === "x") {
      return multiplication(a, b);
   } else if (op === "÷") {
      return division(a, b);
   };
};