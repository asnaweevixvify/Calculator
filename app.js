function appendNum(numInput){
    let Display = document.querySelector('#display');
    Display.value += numInput;
}
function equal(){
    let Display = document.querySelector('#display');
    let finalNum=Display.value;
    let answer = eval(finalNum);
    Display.value = answer
}
function playSound() {
    document.getElementById("buttonSound").play();
}


