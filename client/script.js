// me (로그인 상태확인)
document.addEventListener('DOMContentLoaded', function() {
    const accessToken = localStorage.getItem('accessToken');
    const myauth = localStorage.getItem('myauth');
    const authDoms = document.querySelectorAll('.auth');

    const homeTextEl = document.querySelector('#homeText');
    if(homeTextEl) homeTextEl.textContent = '환영합니다 Guest 님! 좋은 하루 되세요';

    if(!myauth || !accessToken) return;

    fetch('http://localhost:8080/users/me', {
        headers : {
            "Authorization" : accessToken
        }
    })
    .then(res => res.json())
    .then(res => {
        if(myauth !== res.data.email) {
            logout()
            for(let el of authDoms) {
                el.classList.remove('authorized');                
            }
            return;
        }
        
        for(let el of authDoms) {
            el.classList.add('authorized');
            if(homeTextEl) homeTextEl.textContent = `환영합니다 ${res.data.username} 님! 좋은 하루 되세요`;
        }
    })
    .catch(err => {
        logout()
        for(let el of authDoms) {
            el.classList.remove('authorized');
        }
    })
})

// logout
function logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('myauth');    
    location.reload();
}

//nav
function moveToHome() {
    const currentFileName = location.href.split('/')[location.href.split('/').length-1];
    if(currentFileName !== 'index.html') location.href='index.html';
    else location.reload();
}
function moveToLogin() {
    const currentFileName = location.href.split('/')[location.href.split('/').length-1];
    if(currentFileName !== 'login.html') location.href='login.html';
    else location.reload();
}
function moveToSignup() {
    const currentFileName = location.href.split('/')[location.href.split('/').length-1];
    if(currentFileName !== 'signup.html') location.href='signup.html';
    else location.reload();
}

//login
function loginSubmit(event) {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;

    fetch('http://localhost:8080/users/login', {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            email, password
        })
    })
    .then(res => res.json())
    .then(res => {
        if(res.message !== 'ok') return alert(res.message);
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('myauth', res.data.userInfo.email);
        location.href = 'index.html';
    }) 
    .catch(err =>{
        alert(err.message);
    })
}

//signup
function signupSubmit(event) {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;
    const passwordCheck = event.target[2].value;
    const username = event.target[3].value;
    const mobile = event.target[4].value;
    const gender = Number(event.target[5].value);
    
    if(password !== passwordCheck) return alert('패스워드 확인란이 다릅니다.');

    fetch('http://localhost:8080/users/signup', {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            email, password, username, mobile, gender
        })
    })
    .then(res => res.json())
    .then(res => {
        alert(res.message);
        if(res.message==='signup complete') location.href='login.html';
    })
    .catch(err => alert(err.message));
}