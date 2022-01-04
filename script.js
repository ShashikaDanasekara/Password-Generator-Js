
const resultElement = document.getElementById('result');
const clipboardElement = document.getElementById('clipboard');

const lengthElement = document.getElementById('length');
const uppercaseElement = document.getElementById('uppercase');
const lowercaseElement = document.getElementById('lowercase');
const numbersElement = document.getElementById('numbers');
const symbolsElement = document.getElementById('symbols');

const generteElement = document.getElementById('generate');

const randomFunc = {
    lower:getRandomLower,
    upper:getRandomUpper,
    number:getRandomNumber,
    symbol:getRandomSymbol
};

/**
 * generate functions for generate following functions
 * lower function, upper function, number function, symbol function
 */

function getRandomLower(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function getRandomSymbol(){
    const symbols = '~`!@#$%^&*()_-+={[}]|\:;<,>.?/';
    return symbols[Math.floor(Math.random() * symbols.length)]
}

/**
 * when the generate button is clicked 
 * a random password should be generated according to given length
 * with correct characters symbol combination
 * 
 * 1. listen to user click on button 'generate password'
 * 2. take password length value and filter to number between 4-20
 * 3. get all values of checkboxes and save then on valriables
 * 4. pass all values to generate password function
 * 5. generatepw function will fiter out unchecked types
 * 3. using loop it will generate the password using generator functions
 */

generteElement.addEventListener('click', ()=>{

    let length = +lengthElement.value;
    const hasLower = lowercaseElement.checked;
    const hasUpper = uppercaseElement.checked;
    const hasNumber = numbersElement.checked;
    const hasSymbol = symbolsElement.checked;

    length<4? length=4:length;
    length>20? length=20:length;

    resultElement.innerText = generatePassword(hasLower,hasUpper,hasNumber,hasSymbol,length);
});

function generatePassword(lower,upper,number,symbol,length){

    let generatedpw = '';
    const typesCount = lower + upper + number + symbol;
    const typeArray = [{lower},{upper},{number},{symbol}].filter(
        item => Object.values(item)[0]);

    if(typesCount == 0){
        alert("All check boxes are empty!")
        return '';
    }

    for(let i=0; i<length; i+=typesCount){
        typeArray.forEach(type => {
            const fucCallName = Object.keys(type)[0];
            generatedpw += randomFunc[fucCallName]();
        });
    }
    console.log(length)
    return generatedpw.slice(0,length);
}

/**
 * when you click the clipboard button text should be copied to clipboard
 * 
 * 1. create a textarea and add the password as its value
 * 2. add the text area to DOM
 * 3. let user copy the text using execCommand('copy')
 * 4. remove the text area to DOM
 */
clipboardElement.addEventListener('click',()=>{

    const textarea = document.createElement('textarea');
    const password = resultElement.innerText;

    if(!password){
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Text copied to clipboard');
});

