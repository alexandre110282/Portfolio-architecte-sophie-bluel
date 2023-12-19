import { trueReponse } from './script.js'
import { gallery } from './script.js'
const titlemodal = document.createElement("h3");
titlemodal.setAttribute("id", "titlemodal");
const defaultTitleText = "Galerie Photo";
const additionalTitleText = "Ajout photo";
titlemodal.textContent = defaultTitleText;

// Bouton ajout photo
function createButton(className, textContent) {
    const button = document.createElement("button");
    button.classList.add(className);
    button.textContent = textContent;
    return button;
}

const addButton = createButton("btn_ajout", "Ajouter une photo");
const validButton = createButton("btn_valid", "Valider");
const modalWrapper = document.querySelector(".modal-wrapper");

function createElement(tag, className, innerHTML = "") {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    if (innerHTML) element.innerHTML = innerHTML;
    return element;
}

const closeButton = createElement("span", "close-btn", `<i class="fa-solid fa-xmark"></i>`);
const backButton = createElement("span", "back-btn"); 
const ajoutPhoto = createElement("div", "ajout-photo"); 


const formsContainer = document.createElement("div");
let newImg = null
import { genererImg } from "./script.js";
import { getToken } from "./token.js";
let titreInput,categorieSelect

 export function openModal() {
    const target = document.querySelector("#modal1");
    target.style.display = null;
    target.removeAttribute("aria-hidden");
    target.setAttribute("aria-modal", "true");
    insideModal();
}

import { genererProjets } from "./script.js";

function creaForms() {
    formsContainer.classList.add("formsContainer");

    const titreForm = document.createElement("form");
    const titreLabel = document.createElement("label");
    titreLabel.textContent = "Titre";
    titreInput = document.createElement("input"); 
    titreInput.type = "text";
    titreInput.name= "title"
    
    titreForm.append(titreLabel,titreInput);

    // Créez un formulaire pour le menu déroulant "Catégorie"
    const categorieForm = document.createElement("form");
    const categorieLabel = document.createElement("label");
    categorieLabel.textContent = "Catégorie";
    categorieSelect = document.createElement("select");
    categorieSelect.setAttribute("name", "category")
    // Ajoutez des options au menu déroulant
    
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
    const isFormValid = ajoutPhoto.querySelector("img") !== null &&
                        titreInput.value.trim() !== "" &&
                        categorieSelect.value.trim() !== "";

    validButton.disabled = !isFormValid;
    validButton.style.backgroundColor = isFormValid ? "#1D6154" : "#A7A7A7";
    console.log(isFormValid ? "Formulaires remplis avec succès et bouton activé" : "bouton désactivé");
}

function creaBackButton() {
    backButton.classList.add("backButton");
    backButton.innerHTML = `<i class="fa-solid fa-arrow-left"></i>`;
    backButton.id = "modalBack";
    modalWrapper.appendChild(backButton);
}

function envoyerDonneesALaAPI() {

  const token = getToken()
  console.log("token pour la requete", token)
  if (!token) {
        console.error("Token non disponible ou expiré.");
        // Ajoutez ici la logique de redirection ou de gestion des erreurs
        return;
    }
 
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
         trueReponse.push(data);
        gallery.innerHTML=""
         genererProjets(trueReponse)
         openModal()
      
    })
    .catch((error) => {
      console.error("Erreur :", error);
    });
}

let selectedFile

function creaAjoutPhoto() {
    ajoutPhoto.classList.add("ajoutPhoto");
    ajoutPhoto.innerHTML = `
        <i class="fa-regular fa-image"></i>
        <button class="addPhotoButton">+ Ajouter une photo</button>
        <p class="textAjout">jpg, png : 4 Mo max</p>
    `;
    const addPhotoButton = ajoutPhoto.querySelector(".addPhotoButton");

    addPhotoButton.addEventListener("click", function() {
        // Création de l'élément input de type "file"
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.classList.add("fileInput");

        // Ajout d'un écouteur d'événements pour le changement de fichier
        fileInput.addEventListener("change", function(event) {
            // Traitement du fichier sélectionné
            selectedFile = event.target.files[0];
            console.log("Fichier sélectionné :", selectedFile.name);

            // Vérification de la taille du fichier
            if (selectedFile) {
                const tailleEnMo = selectedFile.size / 1048576; 
                if (tailleEnMo > 4) {
                    document.getElementById("alertText").textContent = "La taille du fichier ne doit pas dépasser 4 Mo.";
                    document.getElementById("monAlert").style.display = "block";
                    return;
                }
                newImg = URL.createObjectURL(selectedFile)
                ajoutPhoto.innerHTML = `<img src="${newImg}" alt="Image sélectionnée" name="image">`; 
            }
        });

        document.querySelector(".close-btn2").addEventListener("click", function() {
            document.getElementById("monAlert").style.display = "none";
        });

        fileInput.click();
    }); 

    addButton.style.display = "none";
    validButton.disabled = true;
    validButton.style.backgroundColor = "#A7A7A7";
    modalWrapper.insertBefore(ajoutPhoto, formsContainer);
    modalWrapper.appendChild(validButton);
}

function eventHandler(event) {
    event.preventDefault();
    envoyerDonneesALaAPI();
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
    creaAjoutPhoto();
    
    titreInput.addEventListener("input", handleFormChange);
    categorieSelect.addEventListener("change", handleFormChange);

    validButton.removeEventListener("click", eventHandler);
    validButton.addEventListener("click", eventHandler);
    ;

    backButton.addEventListener("click", function (event) {
        event.stopPropagation();
        resetOpenModal();
    });
}

function insideModal() {
    modalWrapper.innerHTML = "";
    titlemodal.textContent = defaultTitleText;
    modalWrapper.appendChild(titlemodal);

    closeButton.addEventListener("click", closeModal);
    modalWrapper.appendChild(closeButton);

    const imgWrapper = document.createElement("span");
    imgWrapper.classList.add("imgWrapper");
    modalWrapper.appendChild(imgWrapper)

   if (imgWrapper.childElementCount === 0) {
        genererImg().forEach(img => imgWrapper.appendChild(img));
    }
    
    addButton.style.display = "block"
    addButton.disabled = false;
    addButton.style.backgroundColor = "#1D6154";
    addButton.addEventListener("click", modal2);
    modalWrapper.appendChild(addButton);
}

function resetOpenModal() {
    while (modalWrapper.firstChild) {
        modalWrapper.removeChild(modalWrapper.firstChild);
    }
    insideModal();
}

const closeModal = function () {
    const target = document.getElementById("modal1");
    target.style.display = "none";
    modalWrapper.innerHTML="" 
};

const ModalExit = document.getElementById("modal1");
ModalExit.addEventListener("click", function (event) {
    if (!modalWrapper.contains(event.target)) {
        ModalExit.style.display = "none";
    closeModal
    }
});

document.querySelectorAll(".modale").forEach(a => {
    a.addEventListener("click", openModal);
});