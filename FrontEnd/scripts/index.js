let arrayData = [];
fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then((data) => {
        arrayData = data;
        console.log("Données récupérées :", arrayData);

        // Appel de la fonction pour afficher toutes les images
        displayAllImages();
    })
    .catch((err) => console.log(err));

const sectionGallery = document.querySelector(".gallery");
const sectionButtons = document.querySelector(".filterButtons");

function createButtons(categories) {
    // Bouton "Tous"
    const allButton = document.createElement('button');
    allButton.innerText = 'Tous';
    allButton.classList.add('btn-tous', 'btnFilter');
    allButton.id = 'btnFilter-0';
    allButton.addEventListener('click', handleButtonClick);
    
    sectionButtons.appendChild(allButton);

    // Autres boutons
    categories.forEach((category, index) => {
        const button = document.createElement('button');
        button.innerText = category.name;
        button.classList.add('btnFilter');
        button.id = `btnFilter-${index + 1}`;
        button.addEventListener('click', handleButtonClick);
        sectionButtons.appendChild(button);
    });
}


// Fonction pour filtrer les images par catégorie
function filterImagesByCategory(category) {
    sectionGallery.innerHTML = '';
    arrayData.forEach(project => {
        if (category === 'Tous' || project.category.name === category) {
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

fetch('http://localhost:5678/api/categories')
    .then(response => response.json())
    .then(data => {
        createButtons(data);
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des catégories:', error);
    });


// Fonction pour gérer la sélection des boutons
function handleButtonClick(event) {
    document.querySelectorAll('button').forEach(button => {
        button.classList.remove('button-selected');
    });
    event.target.classList.add('button-selected');
    const category = event.target.innerText;
    filterImagesByCategory(category);
}


// Fonction pour afficher toutes les images
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
