const logBtn = document.querySelector("#log-btn");
const regBtn = document.querySelector("#reg-btn");
const regForm = document.querySelectorAll(".register-form");
const logForm = document.querySelector(".remember-forgot");
const buttonLogin = document.querySelector(".login-button");
const googleButton = document.querySelector(".google-button p");
const gambar = document.querySelector("#gambar-login-register");
const cekboxMentor = document.querySelector('.cekbox')
var  inputs = Array.from(document.getElementsByTagName('input'));
var btn = document.querySelector("#btn-box");
var boxForm = document.querySelector('.box-form');
var widthElemen;

function ubahLebar(){
    widthElemen = boxForm.offsetWidth/2-10;
    btn.style.width = `${widthElemen}px`;
    if(regBtn.classList.contains('active')){
        btn.style.left = `${widthElemen}px`;
    }

    return widthElemen;
}

function regActive(){
    clear();
    regBtn.classList.add("active");
    logBtn.classList.remove("active");
    btn.style.left = `${ubahLebar()}px`;

    regForm.forEach( (item)=> {
        item.style.display = 'block';
    }); 

    cekboxMentor.style.display = 'block';
    logForm.style.display = 'none';
    gambar.src ='ASET/GAMBAR/banner-register.svg' ;
    buttonLogin.textContent = "Register";
    googleButton.textContent = "Daftar dengan Google";
}

function logActive(){
    clear();
    regBtn.classList.remove("active");
    logBtn.classList.add("active");
    btn.style.left = '0';

    regForm.forEach( (item) => {
        item.style.display = 'none';
    }); 
    
    cekboxMentor.style.display = 'none';
    logForm.style.display = 'flex';
    gambar.src ='ASET/GAMBAR/banner-login.svg' ;
    buttonLogin.textContent = "Login";
    googleButton.textContent = "Masuk dengan Google";
}

function clear(){
    inputs.forEach(input => {
        if(input.type === 'checkbox'){
            input.checked = false;
        }else {
            input.value = "";
        }
    });
}

if(window.location.hash.slice(1) == "register"){
    regActive();
}else {
    logActive();
}

window.onload = function(){

    window.addEventListener("resize", ubahLebar);

    regBtn.addEventListener("click", regActive);

    logBtn.addEventListener("click", logActive);

    
}


