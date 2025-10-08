class Calculator {
  constructor(){
    this.reset();
  }

  reset(){
    this.displayValue = '0';
    this.operator = false;
  }

  getDisplayValue(){
    return this.displayValue;
  }

  inputNumber(value){
    this.displayValue = this.displayValue === '0' ? value : this.displayValue + value;
    this.operator = false;
  }

  inputOperators(value){
    if(this.operator){
      return;
    }
    this.displayValue = this.displayValue === "0" ? "0" + value : this.displayValue + value;
    this.operator = true;
  }

  clear(){
    this.displayValue = '0';
  }

  performEqual(){
    this.displayValue = this.displayValue.replace(/x/g, '*');
    try{
      let result = Function(`"use strict"; return (${this.displayValue})`)();
      this.displayValue = result;
    }catch{
      return;
    }
  }
}

class Display{
  constructor(el){
    this.el = el;
  }

  update(value){
    this.el.innerText = value;
  }
}

class Validator{
  isValidChar(value){
    return /^[\d+\-x/.]$/.test(value);
  }
}

const calculator = new Calculator();
const display = new Display(document.querySelector('.result div'));
const btnWrap = document.querySelector('.btn_wrap');
const validator = new Validator();

function updateDisplay(){
  display.update(calculator.getDisplayValue());
}

btnWrap.addEventListener('click', (e) => {
  const target = e.target;
  const action = target.dataset.action;
  const value = target.textContent;

  switch(action){
    case 'clear':
      calculator.clear();
      updateDisplay();
      break;
    
    case 'operators':
      if(!validator.isValidChar(value)){
        break;
      }
      calculator.inputOperators(value);
      updateDisplay();
      break;

    case 'equal':
      calculator.performEqual();
      updateDisplay();
      break;

    case 'pencent':
      break;  

    case 'toggle':
      break;

    default:
      if(!validator.isValidChar(value)){
        break;
      }
      calculator.inputNumber(value);
      updateDisplay();
      break;
  }
})

updateDisplay();
