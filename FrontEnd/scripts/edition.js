let arrayData = [];
fetch("http://localhost:5678/api/works")
  .then((res) => res.json())
  .then((data) => {
    arrayData = data;
    console.log("Données récupérées :", arrayData);

    // Appel de la fonction pour afficher toutes les images
    displayAllImages();
    loadModalImages();
    AddPhoto();
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

        // Ajoute un gestionnaire d'événements pour l'icône de suppression
        deleteIcon.addEventListener('click', () => {
            deleteImage(project.id, imageContainer);
        });
    });
}

// **********************************************fetch delet************************************************

// Fonction pour envoyer une requête DELETE et supprimer l'image de la div
function deleteImage(imageId, imageContainer) {
    fetch(`http://localhost:5678/api/works${imageUrl}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Supprime l'image de la div
            imageContainer.remove();
        } else {
            console.error('Failed to delete image');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


const btnAddPhoto = document.getElementById('addphoto');

// fenetre modal ajout photo

const modalContainerAdd = document.querySelector('.modal-container-add-photo');
const closeModalAddButton = document.getElementById('close-modal-add');
const modalContainer = document.querySelector('.modal-container');
const returnModal = document.getElementById('return-modal');

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

// declenchement input

const browseButton = document.getElementById('browse-button');
const photoInput = document.getElementById('photo-input');

browseButton.addEventListener('click', () => {
    photoInput.click(); // Déclenchez le clic sur l'élément input de type "file"
});

// *********************** fetch post new photo ; test 1

function AddPhoto() {
    const ajoutButton = document.getElementById('valide-photo');
    const titreNewPhoto = document.getElementById('title');
    const categoryNewPhoto = document.getElementById('category');
    const visuPhoto = document.querySelector('.visu-photo');
    const photoInput = document.getElementById('photo-input');
    const form = document.forms.namedItem("fileinfo");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const output = document.querySelector("#output");

        const fd = new FormData();
        const token = localStorage.getItem("token")
        console.log(token);

        fd.append('title', titreNewPhoto.value);
        fd.append('category', categoryNewPhoto.value);
        if (photoInput.files.length > 0) {
        fd.append('image', photoInput.files[0]);
        } else {
        output.innerHTML = "Veuillez sélectionner une image.";
        return;
        }
        console.log(fd.get("category"));
        console.log(fd.get("title"));
        console.log(fd.get("image"));

        fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: fd,
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    });



    // ajoutButton.addEventListener('click', () => {
    //     const title = titreNewPhoto.value;
    //     const category = categoryNewPhoto.value;
    //     const photoFile = photoInput.files[0]; // Récupère le premier fichier sélectionné




        // Ajoute un écouteur d'événements sur le changement de l'élément input de type "file"
        photoInput.addEventListener('change', (e) => {
            console.log(e);
            console.log("L'image a été sélectionnée avec succès !");
            visuPhoto.classList.add('active');

            const VisuNewImage = document.querySelector('.container-newphoto');
            const selectedImage = document.createElement('img');
            const file = photoInput.files[0];
            console.log(file);

            if (file) {
                const imageUrl = URL.createObjectURL(file);
                selectedImage.src = imageUrl;
                console.log("L'URL de l'image est :", imageUrl);

            }

            VisuNewImage.appendChild(selectedImage);
        });




}







