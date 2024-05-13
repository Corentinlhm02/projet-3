let arrayData = [];
fetch("http://localhost:5678/api/works")
  .then((res) => res.json())
  .then((data) => {
    arrayData = data;
    console.log("Données récupérées :", arrayData);

    // Appel de la fonction pour afficher toutes les images
    displayAllImages();
    loadModalImages();
  })
  .catch((err) => console.log(err));

    const sectionGallery = document.querySelector(".gallery");
    const sectionButtons = document.querySelector(".filterButtons");

    // fonction pour afficher toutes les images
    function displayAllImages() {
        sectionGallery.innerHTML = '';
        arrayData.forEach(project => {
            const projectContainer = document.createElement('div');
            const projectImage = document.createElement('img');
            projectImage.src = project.imageUrl;
            const projectName = document.createElement('h3');
            projectName.innerText = project.title;
            projectContainer.appendChild(projectImage);
            projectContainer.appendChild(projectName);
            sectionGallery.appendChild(projectContainer);
        });
    }

    // fonction pour filtrer les images par catégorie
    function filterImagesByCategory(category) {
        sectionGallery.innerHTML = '';
        arrayData.forEach(project => {
            if (project.category.name === category) {
                const projectContainer = document.createElement('div');
                const projectImage = document.createElement('img');
                projectImage.src = project.imageUrl;
                const projectName = document.createElement('h3');
                projectName.innerText = project.title;
                projectContainer.appendChild(projectImage);
                projectContainer.appendChild(projectName);
                sectionGallery.appendChild(projectContainer);
            }
        });
    }

    // fenetre modal

document.addEventListener('DOMContentLoaded', function() {
    const openModalLink = document.getElementById('open-modal');
    const closeModalButton = document.getElementById('close-modal');
    const modalContainer = document.querySelector('.modal-container');

    openModalLink.addEventListener('click', function(e) {
        e.preventDefault();

        // Ouvrir la fenêtre modale
        modalContainer.classList.add('active');
    });

    closeModalButton.addEventListener('click', function() {
        // Fermer la fenêtre modale
        modalContainer.classList.remove('active');
    });
});


// fonction pour charger les images dans la fenêtre modale
function loadModalImages() {
    const gridPhoto = document.querySelector('.grid-photo');
    gridPhoto.innerHTML = ''; // Efface le contenu précédent de la fenêtre modale

    arrayData.forEach(project => {
        const imageContainer = document.createElement('div');
        const image = document.createElement('img');
        const deleteIcon = document.createElement('i');
        deleteIcon.className = 'delete-icon fa-solid fa-trash-can'; 

        image.src = project.imageUrl;
        imageContainer.appendChild(image);
        imageContainer.appendChild(deleteIcon); 
        gridPhoto.appendChild(imageContainer);
    });
}

const btnAddPhoto = document.getElementById('addphoto');

// btnAddPhoto.addEventListener('click', function() {
//     alert('clic');

// });

// fenetre modal ajout photo

const modalContainerAdd = document.querySelector('.modal-container-add-photo');
const closeModalAddButton = document.getElementById('close-modal-add');
const modalContainer = document.querySelector('.modal-container');
const returnModal = document.getElementById('return-modal')

        btnAddPhoto.addEventListener('click', function(e) {
            e.preventDefault();
    
            // Ouvrir la fenêtre modale
            modalContainerAdd.classList.add('active');
            modalContainer.classList.remove('active');
        });
    
        closeModalAddButton.addEventListener('click', function() {
            // Fermer la fenêtre modale
            modalContainerAdd.classList.remove('active');
            modalContainer.classList.remove('active');
        });
    
        returnModal.addEventListener('click', function() {
            modalContainerAdd.classList.remove('active');
            modalContainer.classList.add('active');
        });

// poster la nouvelle photo

// function AddPhoto(){

//     const ajoutButton = document.getElementById('new-photo');
//     const titreNewPhoto = document.querySelector('input[type="text"]');
//     const categoryNewPhoto = document.querySelector("select");

//     titreNewPhoto.addEventListener('input', (e) => {
//         console.log(e.target.value);

//         });

//     categoryNewPhoto.addEventListener('input', (e) => {
//         console.log(e.target.value);
    
//         });


//         fetch("http://localhost:5678/api/works", {
//             method: "post",
//             header:{ "Content-Type": "application/json" },
//             body: JSON.stringify({
//                 title: "",
//                 category: "",
//                 imageUrl:"",
//             }),
//         })
//         .then((res)=> response.json())
//         .then((json) => console.log(json));
// }