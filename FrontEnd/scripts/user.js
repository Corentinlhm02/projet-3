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
                window.location.href='edtion.html'
            };
        });
    });
};

login();
console.log('yess')















// fetch("http://localhost:5678/api/users/login"), {
//     method: "post",
//     body: JSON.stringify({
//         email: 'sophie.bluel@test.tld',
//         password: 'S0phie',
//     })
// }
   
//    // Sélectionner les éléments du formulaire
//     const loginForm = document.querySelector(".loginForm");
//     const emailInput = document.querySelector('input[type="email"]');
//     const passwordInput = document.querySelector('input[type="password"]');
//     const loginButton = document.querySelector('input[type="submit"]');
    
//     let adressemail = "";
//     let motdepasse = "";

//     emailInput.addEventListener("input", (e) => {
//         adressemail = e.target.value;
//         console.log(adressemail);
//     });

//     passwordInput.addEventListener("input", (e) => {
//         motdepasse = e.target.value;
//         console.log(motdepasse);
//     });


//     loginForm.addEventListener("submit", (e) => {
//         e.preventDefault(); 
        
//         // Vérification des identifiants
//         if (adressemail === "sophie.bluel@test.tld" && motdepasse === "S0phie") {
//             // Redirection vers index.html
//             window.location.href = "index.html";
//         } else {
//             // Affichage d'un message d'erreur d'authentification
//             alert("Erreur d'authentification. Veuillez vérifier vos identifiants.");
//         }
//     });


    