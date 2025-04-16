// operand  + - * /
// operator 0-9
// รับค่า operand มาก่อน operator
const calculatorDisplay = document.querySelector('#display')
const inputBtn = document.querySelectorAll('.button')
const clearBtn = document.getElementById('clearbtn')

let firstValue =0; //ตัวแรกแรก
let operatorValue = '';
let waitForNext = false //ก่อนป้อนตัวที่สอง เช็คว่ามีเลขตัวแรกกับเครื่องหมายรึยัง เก็บสถานะตัวเลขและตัวดำเนินการ

inputBtn.forEach(input =>{
    //ปุ่มตัวเลข 0-9
    if(input.classList.contains('numberbutton')){
        input.addEventListener('click',function(){
            setNumberValue(input.value)
        })
    }
    else if(input.classList.contains('operatorbutton')){
        input.addEventListener('click',function(){
            callOperator(input.value)
        })
    }
    else if(input.classList.contains('decimalbutton')){
        input.addEventListener('click',function(){
            addDecimal();
        })
    }
})

function callOperator(operator){
    const currentValue = Number(calculatorDisplay.value)
    if(operatorValue && waitForNext ){
        operatorValue = operator
        return;
    }
    if(!firstValue){
        firstValue = currentValue;
    }
    else{
        const result = calculate[operatorValue](firstValue,currentValue)
        calculatorDisplay.value = result
        firstValue = result
        if(firstValue === "error"){
            reselAll();
        }
    }
    operatorValue = operator
    waitForNext = true
}

function setNumberValue(number){
    if(waitForNext){
        calculatorDisplay.value=number
        waitForNext=false
    }
    else{
        const displayValue = calculatorDisplay.value;
        if(displayValue === '0'){
            calculatorDisplay.value = number
        }
        else{
            calculatorDisplay.value += number
        }
    }   
    // ตอนแรกเป็น เลข 0 จะส่งเลขอื่่นไปบนหน้าจอ
    // ถ้ามีเลขอื่นอยู่ จะเอาเลขตัวใหม่ไปต่อตัวหลัง
}

const calculate ={
    "/":function (firstNumber,secondNumber){
        if(secondNumber!=0){
            return firstNumber / secondNumber
        }
        else{
            return "error"
        }
    },
    "*":function (firstNumber,secondNumber){
        return firstNumber*secondNumber
    },
    "-":function (firstNumber,secondNumber){
        return firstNumber-secondNumber
    },
    "+":function (firstNumber,secondNumber){
        return firstNumber+secondNumber
    },
    "=":function (firstNumber,secondNumber){
        return secondNumber
    }
}

function addDecimal(){
    if(waitForNext) return;
    if(!calculatorDisplay.value.includes('.')){
        calculatorDisplay.value += '.'
    }
}

function reselAll(){
    calculatorDisplay.value = 0;
    firstValue = 0
    operatorValue = ''
    waitForNext = false
}

clearBtn.addEventListener('click',function(){
    reselAll();
})

