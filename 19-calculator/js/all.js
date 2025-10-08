class Calculator {
  constructor(){
    this.reset();
  }

  reset(){
    this.displayValue = '0';
    this.lastIsOperator = false;
    this.firstNum = '';
    this.lastNum = '';
    this.toggleNegative = false;
  }

  inputNumber(value){
    this.lastNum += value;
    this.displayValue = this.displayValue === '0' ? '' + this.lastNum : this.firstNum + this.lastNum;
    this.lastIsOperator = false;
  }

  inputOperators(value){
    if(this.lastIsOperator){
      return;
    }

    if(this.toggleNegative){
      this.lastNum = `(-${this.lastNum})`;
      this.toggleNegative = false;
    }
    
    if(this.displayValue === '0'){
      this.firstNum = '0' + value;
    }else{
      this.firstNum += this.lastNum + value;
    }

    this.displayValue = this.firstNum;
    this.lastNum = '';
    this.lastIsOperator = true;
  }

  performEqual(){
    if(this.displayValue === '0'){
      return;
    }
    this.displayValue = this.displayValue.replace(/x/g, '*');
    try{
      this.lastNum = Function(`"use strict"; return (${this.displayValue})`)();
      this.displayValue = this.lastNum;
      this.firstNum = '';
    }catch{
      return;
    }
  }

  toggleSign(){
    if(this.lastNum !== ''){
      if(this.toggleNegative){
        this.displayValue = `${this.firstNum}${this.lastNum}`;
        this.toggleNegative = false;
      }else{
        this.displayValue = `${this.firstNum}(-${this.lastNum})`;
        this.toggleNegative = true;
      }
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
  display.update(calculator.displayValue);
}

btnWrap.addEventListener('click', (e) => {
  const target = e.target;
  const action = target.dataset.action;
  const value = target.textContent;

  switch(action){
    case 'clear':
      calculator.reset();
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

    case 'percent':
      break;  

    case 'toggle':
      calculator.toggleSign();
      updateDisplay();
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
