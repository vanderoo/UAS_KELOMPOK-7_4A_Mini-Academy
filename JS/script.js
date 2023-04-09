window.onload = function(){

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


