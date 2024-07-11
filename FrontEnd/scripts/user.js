function login(){
    const loginForm = document.querySelector('.loginForm');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const loginCreds = JSON.stringify({ //convertion de l'objet en JSON
            email:e.target.querySelector('[name=email]').value,
            password:e.target.querySelector('[name=password]').value
        });
        fetch("http://localhost:5678/api/users/login", {
            method: "post",
            headers:{ "Content-Type": "application/json" },
            body: loginCreds,
        })
        .then((res)=>{
            if(res.status==200){
                return res.json();
            } else {
                document.getElementById('error').style.display='block';
            }
        })
        .then((data) => {
            if (data.token){
                localStorage.setItem('token', data.token);
                window.location.href='edtion.html';
            };
        });
    });
};

login();