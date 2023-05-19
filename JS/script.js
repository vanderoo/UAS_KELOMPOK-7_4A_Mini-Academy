/* window.onload = function(){

    const btn_log = document.querySelector('.login-container');
    const btn_reg = document.querySelector('.register-container');
    var btn_bg_r = document.querySelector('.btn-bg-r');
    var btn_bg_l = document.querySelector('.btn-bg-l');
    
    const currentUrl = window.location.href;
    
    if (currentUrl.includes('login.html')){
    
        btn_bg_l.style.left = '0vw';
    
    }else if(currentUrl.includes('register.html')){
    
        btn_bg_r.style.right = '0vw';
    
    }
    
}
*/

window.onload = function(){

const logBtn = document.querySelector("#log-btn");
const regBtn = document.querySelector("#reg-btn");
const regForm = document.querySelector(".register-form");
const logForm = document.querySelector(".remember-forgot");
var btn = document.querySelector("#btn-box");


regBtn.addEventListener("click", () => {
    regBtn.classList.add("active");
    logBtn.classList.remove("active");
    btn.style.left = '10vw';
    regForm.style.display = 'inline';
    logForm.style.display = 'none';
});

logBtn.addEventListener("click", () => {
    regBtn.classList.remove("active");
    logBtn.classList.add("active");
    btn.style.left = '0';
    regForm.style.display = 'none';
    logForm.style.display = 'flex';
});
}







