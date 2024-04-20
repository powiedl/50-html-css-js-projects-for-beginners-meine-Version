const buttonEl = document.querySelector('button');
const copyEl = document.querySelector('.copy');
const inputEl = document.querySelector('input');
const alertEl = document.querySelector('.alert-container');
const charsEl = document.querySelector('#allowedChars');
const lengthEl = document.querySelector('#passwordLength');

const defPasswordLength = 10;
const defChars='1234567890!"§$%&/()=?qwertzuiopasdfghjklyxcvbnmQWERTZUIOPASDFGHJKLYXCVBNM,.-#;:_*@';
charsEl.value = defChars;
lengthEl.value = defPasswordLength;

function randomChar(chars) {
    const lenChars = chars.length;
    const rnd = Math.floor(Math.random()*lenChars);
    return chars[rnd];
}

function generatePassword(chars,pwdLen) {
    let pwd='';
    for (let i=0;i<pwdLen;i++) {
        pwd+=randomChar(chars)
    }
    return pwd;
}

buttonEl.addEventListener('click',() => {
    const pwd=generatePassword(charsEl.value,lengthEl.value);
    inputEl.value=pwd;
})

copyEl.addEventListener('click',() => {
    if (inputEl.value) {
        navigator.clipboard.writeText(inputEl.value);
        alertEl.innerText=inputEl.value + ' copied!'
        alertEl.classList.add('active');
        setTimeout(() => {
            alertEl.classList.remove('active');
        },700);
    }
})

