class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
      this.previousOperandTextElement=previousOperandTextElement
      this.currentOperandTextElement=currentOperandTextElement
      this.clear()
     }
// define all functions
clear(){
this.currentOperand= ''
this.previousOperand=''
this.operation=undefined
}
delete(){
   this.currentOperand = this.currentOperand.toString().slice(0, -1)
}

appendNumber(number){
    if(number === '.' && this.currentOperand.includes ('.'))return//only allows us to have one '.'
 this.currentOperand=this.currentOperand.toString() + number.toString ()//numbers must be converted to strings
}//adds any number to the screen when you click on the screen

chooseOperation(operation){
 if(this.currentOperand ==='')return
 if(this.previousOperand !== ''){this.compute()}
 this.operation=operation   // you should always set the function your working on.
 this.previousOperand=this.currentOperand// when you click on a new operation the previous one is lost
 this.currentOperand=''//clears the previous operator
}//what happens whem a user clicks on any operation

compute(){
 let computation 
 const prev = parseFloat(this.previousOperand)
 const current = parseFloat(this.currentOperand)
 if(isNaN(prev)|| isNaN(current)) return//NaN means 'not a number'
 switch(this.operation){
  case '+' :
    computation = prev + current
    break
    case '-' :
    computation = prev - current
    break
    case '*' :
    computation = prev * current
    break
    case '÷' :
    computation = prev / current
    break
    default://acts as an else statement
        return
 }
 this.currentOperand = computation
 this.operation = undefined
 this.previousOperand = ''

}//computes the values into a single value whoch will be displayed on the calculator

getDisplayNumber(number){
    const stringNumber = number.toString()
    const intergerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let intergerDisplay
   if(isNaN(intergerDigits)) {
    intergerDisplay = ''
   } else {
    intergerDisplay=intergerDigits.toLocaleString('en',{maximumFractionDigits: 0})
   }
   if(decimalDigits !=null){
    return `${intergerDisplay}.${decimalDigits}`
   }else{
    return intergerDisplay
   }
}
updateDisplay(){
this.currentOperandTextElement.innerText=this.getDisplayNumber
(this.currentOperand)
if (this.operation!=null){
    this.previousOperandTextElement.innerText=`${this.getDisplayNumber(this.previousOperand)} ${this.operation}`//ensures that any previous number moves to the top above the current number 
}else{
    this.previousOperandTextElement.innerText = ''
}
}//updates our display
 }


const numberButtons = document.querySelectorAll('[data-number]')// selects all numbers
const operationButtons = document.querySelectorAll('[data-operation]')// selects all operations
const equalsButtons = document.querySelector('[data-equals]')
const deleteButtons = document.querySelector('[data-delete]')
const allClearButtons = document.querySelector('[data-all-clear ]')
const previousOperandTextElement = document.querySelector('[data-previous-operand ]')
const currentOperandTextElement = document.querySelector('[data-current-operand ]')

const calculator=new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button =>{
    button.addEventListener('click',()=>{
       calculator.appendNumber (button.innerText)
  calculator.updateDisplay()     

    })

})
//how will we store information in the calculator? We will do this by creating a calculator class in the first line of code
operationButtons.forEach(button =>{
    button.addEventListener('click',()=>{
       calculator.chooseOperation (button.innerText)
  calculator.updateDisplay()     

    })

})
equalsButtons.addEventListener('click', button =>{ 
    calculator.compute()
calculator.updateDisplay()})

allClearButtons.addEventListener('click', button =>{ 
    calculator.clear()
calculator.updateDisplay()})

deleteButtons.addEventListener('click', button =>{ 
    calculator.delete()
calculator.updateDisplay()})
