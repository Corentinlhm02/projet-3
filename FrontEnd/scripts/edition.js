let arrayData = [];

function fetchDisplayImages() {
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
}
fetchDisplayImages();
AddPhoto();
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

// fenetre modal
const openModalLink = document.getElementById('open-modal');
const closeModalButton = document.getElementById('close-modal');
const modalContainert = document.querySelector('.modal-container');

openModalLink.addEventListener('click', function (e) {
    e.preventDefault();

    // Ouvrir la fenêtre modale
    modalContainert.classList.add('active');
});

closeModalButton.addEventListener('click', function () {
    // Fermer la fenêtre modale
    modalContainert.classList.remove('active');
});

// affiche les images dans la fenetre modale
function loadModalImages() {
    const gridPhoto = document.querySelector('.grid-photo');
    gridPhoto.innerHTML = ''; // Efface le contenu précédent de la fenêtre modale

    arrayData.forEach(project => {
        const imageContainer = document.createElement('div');
        imageContainer.setAttribute('data-id', project.id);

        const image = document.createElement('img');
        const deleteIcon = document.createElement('i');
        deleteIcon.className = 'delete-icon fa-solid fa-trash-can';

        image.src = project.imageUrl;
        imageContainer.appendChild(image);
        imageContainer.appendChild(deleteIcon);
        gridPhoto.appendChild(imageContainer);

        // Ajoute un événements pour l'icône de suppression
        deleteIcon.addEventListener('click', () => {
            deleteImage(project.id, imageContainer);
        });
    });
}

function deleteImage(imageId) {
    const token = localStorage.getItem("token"); // Récupère le token depuis le localStorage

    fetch(`http://localhost:5678/api/works/${imageId}`, { // Utilise l'ID de l'image dans l'URL
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    })
        .then(response => {
            if (response.status == 204) {
                // Supprime l'image de la div
                // imageContainer.remove();
                console.log('Image supprimée avec succès');
            } else {
                console.error('Échec de la suppression de l\'image');
            }
        })
    fetchDisplayImages();
}


const btnAddPhoto = document.getElementById('addphoto');

// fenetre modal ajout photo

const modalContainerAdd = document.querySelector('.modal-container-add-photo');
const closeModalAddButton = document.getElementById('close-modal-add');
const modalContainer = document.querySelector('.modal-container');
const returnModal = document.getElementById('return-modal');

btnAddPhoto.addEventListener('click', function (e) {
    e.preventDefault();

    // Ouvrir modale
    modalContainerAdd.classList.add('active');
    modalContainer.classList.remove('active');
});

closeModalAddButton.addEventListener('click', function () {
    // Fermer modale
    modalContainerAdd.classList.remove('active');
    modalContainer.classList.remove('active');
});

returnModal.addEventListener('click', function () {
    modalContainerAdd.classList.remove('active');
    modalContainer.classList.add('active');
});

// declenchement input

const browseButton = document.getElementById('browse-button');
const photoInput = document.getElementById('photo-input');

browseButton.addEventListener('click', () => {
    photoInput.click(); // Déclenchez le clic sur l'élément input de type "file"
});

// bouton vert quand image selctioné

document.getElementById('photo-input').addEventListener('change', function () {
    var uploadButton = document.getElementById('valide-photo');
    if (this.files && this.files.length > 0) {
        uploadButton.classList.remove('disabled');
        uploadButton.classList.add('enabled');
        uploadButton.disabled = false;
    } else {
        uploadButton.classList.remove('enabled');
        uploadButton.classList.add('disabled');
        uploadButton.disabled = true;
    }
});


// *********************** fetch post new photo *********************

function AddPhoto() {
    const ajoutButton = document.getElementById('valide-photo');
    const titreNewPhoto = document.getElementById('title');
    const categoryNewPhoto = document.getElementById('category');
    const visuPhoto = document.querySelector('.visu-photo');
    const photoInput = document.getElementById('photo-input');
    const form = document.forms.namedItem("fileinfo");
    const VisuNewImage = document.querySelector('.container-newphoto');

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const fd = new FormData();
        const token = localStorage.getItem("token");

        fd.append('title', titreNewPhoto.value);
        fd.append('category', categoryNewPhoto.value);

        if (photoInput.files.length > 0) {
            const file = photoInput.files[0];
            resizeImage(file, 367, 489, (blob) => {
                fd.append('image', blob, file.name);

                fetch("http://localhost:5678/api/works", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: fd,
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        // Réinitialiser le formulaire après envoi
                        form.reset();
                        photoInput.value = '';
                        // Supprimer l'aperçu de l'image
                        visuPhoto.classList.remove('active');
                        const existingImage = VisuNewImage.querySelector('img');
                        if (existingImage) {
                            VisuNewImage.removeChild(existingImage);
                        }
                        // Mettre à jour l'affichage des images
                        fetchDisplayImages();
                    })
                    .catch(error => console.error('Error:', error));

            })

            modalContainerAdd.classList.remove('active');
            modalContainer.classList.remove('active');


        }

    });


    // Ajoute un écouteur d'événements sur le changement de l'élément input de type "file"
    photoInput.addEventListener('change', (e) => {
        visuPhoto.classList.add('active');

        const VisuNewImage = document.querySelector('.container-newphoto');
        const selectedImage = document.createElement('img');
        const file = photoInput.files[0];

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            selectedImage.src = imageUrl;

            VisuNewImage.appendChild(selectedImage);
        }
    });

    // Fonction pour redimensionner l'image
    function resizeImage(file, maxWidth, maxHeight, callback) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const img = new Image();
            img.onload = function () {
                // Création d'un canvas pour dessiner l'image redimensionnée
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                canvas.width = maxWidth;
                canvas.height = maxHeight;
                ctx.drawImage(img, 0, 0, maxWidth, maxHeight);

                //prend l'image dans le canvas et le transforme en fichier blob, pour etre manipulé
                canvas.toBlob(callback, file.type); 

            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }

}

