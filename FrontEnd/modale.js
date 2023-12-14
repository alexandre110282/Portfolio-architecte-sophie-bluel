const gallery = document.querySelector('.gallery');
// Titre modal
const titlemodal = document.createElement("h3");
titlemodal.setAttribute("id", "titlemodal");
const defaultTitleText = "Galerie Photo";
const additionalTitleText = "Ajout photo";
titlemodal.textContent = defaultTitleText;

// Bouton ajout photo
const addButton = document.createElement("button");
addButton.classList.add("btn_ajout");
const defaultButtonText = "Ajouter une photo";
let validButton = document.createElement("button")
const modalWrapper = document.querySelector(".modal-wrapper");

const closeButton = document.createElement("span");
closeButton.classList.add("close-btn");
closeButton.innerHTML = `<i class="fa-solid fa-xmark"></i>`;

const closeLink = document.createElement("a");
closeLink.setAttribute("href", "#"); // Ajoutez le lien vers lequel vous souhaitez rediriger
closeLink.appendChild(closeButton);

const backButton = document.createElement("span");
const backButtonContainer = document.createElement("div");
const ajoutPhoto = document.createElement("div");

modalWrapper.appendChild(closeButton);

const closeButtonElement = document.querySelector(".close-btn");
const formsContainer = document.createElement("div");
let newImg = null
import { genererImg } from "./script.js";

let titreInput,categorieSelect // Déclarez ces variables globalement

function creaForms() {
    formsContainer.classList.add("formsContainer");

    const titreForm = document.createElement("form");
    const titreLabel = document.createElement("label");
    titreInput = document.createElement("input"); 
    titreLabel.textContent = "Titre";
    titreInput.setAttribute("type", "text");
    titreInput.setAttribute("name", "title")
    titreForm.append(titreLabel,titreInput);

    // Créez un formulaire pour le menu déroulant "Catégorie"
    const categorieForm = document.createElement("form");
    const categorieLabel = document.createElement("label");
    categorieSelect = document.createElement("select");
    categorieLabel.textContent = "Catégorie";
    categorieSelect.setAttribute("name", "category")
    // Ajoutez des options au menu déroulant
    const optionVide = document.createElement("option");
    optionVide.value = ""

    const option1 = document.createElement("option");
    option1.value = "1";
    option1.textContent = "Objets";

    const option2 = document.createElement("option");
    option2.value = "2";
    option2.textContent = "Appartements";

    const option3 = document.createElement("option");
    option3.value = "3";
    option3.textContent = "Hôtels & restaurants";

    const options = [
    { value: "", text: "" },
    { value: "1", text: "Objets" },
    { value: "2", text: "Appartements" },
    { value: "3", text: "Hôtels & restaurants" }
];

for (const optionData of options) {
    const option = document.createElement("option");
    option.value = optionData.value;
    option.textContent = optionData.text;
    categorieSelect.appendChild(option);
}

    categorieForm.append(categorieLabel, categorieSelect);
    formsContainer.append(titreForm,categorieForm);
    modalWrapper.appendChild(formsContainer);
}

function handleFormChange() {
    const imagePresente = ajoutPhoto.querySelector("img") !== null;
    const texteTitre = titreInput.value.trim() !== ""; // Utilisez la variable globale titreInput
    const choixCategorie = categorieSelect.value.trim() !== ""; // Utilisez la variable globale categorieSelect
    console.log("Image présente:", imagePresente);
    console.log("Texte dans le titre:", texteTitre);
    console.log(titreInput)
    console.log(titreInput.value)
    console.log("Texte dans la catégorie:", choixCategorie);
    console.log(categorieSelect.value)

    if (texteTitre && choixCategorie && imagePresente) {
        validButton.disabled = false;
        validButton.style.backgroundColor = "#1D6154";
        console.log("Formulaires remplis avec succès !");
        console.log("bouton activé");
        
    } else {
        validButton.disabled = true;
        validButton.style.backgroundColor = "#A7A7A7";
        console.log("bouton désactivé");
    }
}

function creaBackButton(){
 backButtonContainer.classList.add("back-button-container");
            backButton.classList.add("backButton");
            backButton.innerHTML = `<i class="fa-solid fa-arrow-left"></i>`;
            backButton.id = "modalBack";
            backButtonContainer.appendChild(backButton);       
            modalWrapper.appendChild(backButtonContainer);
}

function getTokenFromLocalStorage() {
    // Récupérez le token depuis le localStorage
    const token = localStorage.getItem("token");
    return token;
}

function envoyerDonneesALaAPI() {

  const token = getTokenFromLocalStorage()
  console.log(token)
 
  const formData = new FormData();
  
  formData.append("image", selectedFile);
  formData.append("title", titreInput.value);
  formData.append("category", categorieSelect.value)

  // Effectuez une requête HTTP POST vers l'API
  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
                Authorization: `Bearer ${token}`
            },
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Échec de la requête vers l'API");
      }
      return response.json();
    })
    .then((data) => {
         works.push(data);
        return works;
      
    })
    .catch((error) => {
      console.error("Erreur :", error);
    });
}

let selectedFile

function creaAjoutPhoto(){
ajoutPhoto.classList.add("ajoutPhoto");
ajoutPhoto.innerHTML = `
  <i class="fa-regular fa-image"></i>
  <button class="addPhotoButton">+ Ajouter une photo</button>
  <p class="textAjout">jpg. png : 4mo max</p>
`;
const addPhotoButton = ajoutPhoto.querySelector(".addPhotoButton")

    addPhotoButton.addEventListener("click", function () {
        // Création de l'élément input de type "file"
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.classList.add("fileInput")

        // Ajout d'un écouteur d'événements pour le changement de fichier
        fileInput.addEventListener("change", function (event) {
            // Vous pouvez traiter le fichier sélectionné ici
            selectedFile = event.target.files[0];
            console.log("Fichier sélectionné :", selectedFile.name)

            // Vérifier si un fichier a été sélectionné
            if (selectedFile) {
                newImg = selectedFile;
                const fileURL = URL.createObjectURL(selectedFile)
                newImg = fileURL
                console.log(newImg);

                // Création d'un élément image
                const imageElement = document.createElement("img");
                imageElement.src = URL.createObjectURL(selectedFile);
                imageElement.alt = "Image sélectionnée";
                imageElement.setAttribute("name", "image")
    
                ajoutPhoto.innerHTML = "";
                ajoutPhoto.appendChild(imageElement);
            }
        });

        
        fileInput.click();
    }); 
    ajoutPhoto.appendChild(addPhotoButton); 
    addButton.style.display = "none"
    
    validButton.classList.add("btn_valid")
    validButton.textContent = "Valider";
    validButton.disabled = true;
    validButton.style.backgroundColor = "#A7A7A7";
    modalWrapper.insertBefore(ajoutPhoto, formsContainer);
    modalWrapper.appendChild(validButton);
    }

function modal2() {
    const wrapper = document.querySelector(".imgWrapper");
    if (wrapper) {
        formsContainer.innerHTML = "";
        ajoutPhoto.innerHTML = "";
        wrapper.remove();
    }

    titlemodal.textContent = additionalTitleText;

    creaBackButton();
    creaForms();
    creaAjoutPhoto()
    
    titreInput.addEventListener("input", handleFormChange);
    categorieSelect.addEventListener("change", handleFormChange);

    validButton.addEventListener("click", function (event) {
        event.preventDefault();
        envoyerDonneesALaAPI()
    });

    backButton.addEventListener("click", function (event) {
        event.stopPropagation();
        resetOpenModal();
        insideModal();
    });
}

 export function openModal(e) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute("href"));
    target.style.display = null;
    target.removeAttribute("aria-hidden");
    target.setAttribute("aria-modal", "true");
    insideModal();
}

function insideModal() {
    modalWrapper.innerHTML = "";
    titlemodal.textContent = defaultTitleText;
    modalWrapper.appendChild(titlemodal);
    closeButton.addEventListener("click", closeModal);
    modalWrapper.appendChild(closeButton);
    const spanWrapper = document.createElement("span");
    spanWrapper.classList.add("imgWrapper");
    modalWrapper.appendChild(spanWrapper);
    const wrapper = document.querySelector(".imgWrapper");
    if (wrapper.childElementCount === 0) {
        genererImg().forEach(img => {
            wrapper.appendChild(img);
            
        });
    }
    modalWrapper.appendChild(addButton);
    addButton.style.display = "block"
    addButton.innerHTML = defaultButtonText;
    addButton.disabled = false;
    addButton.style.backgroundColor = "#1D6154";

    addButton.addEventListener("click", modal2);
}

function resetOpenModal() {
    while (modalWrapper.firstChild) {
        modalWrapper.removeChild(modalWrapper.firstChild);
    }
    insideModal();
}

const closeModal = function (e) {
    e.preventDefault();
    const target = document.getElementById("modal1");
    target.style.display = "none";
    while (modalWrapper.firstChild) {
        modalWrapper.removeChild(modalWrapper.firstChild);
    }
};

const ModalExit = document.getElementById("modal1");

ModalExit.addEventListener("click", function (event) {
    // Vérifiez si l'élément cliqué n'est pas à l'intérieur de la modale
    if (!modalWrapper.contains(event.target)) {
        // Si le clic se produit à l'extérieur de la modale, fermez la modale ici
        ModalExit.style.display = "none"; // Ou utilisez une autre méthode pour masquer la modale
    closeModal
    }
});

closeButtonElement.addEventListener("click", closeModal);

document.querySelectorAll(".modale").forEach(a => {
    a.addEventListener("click", openModal);
});