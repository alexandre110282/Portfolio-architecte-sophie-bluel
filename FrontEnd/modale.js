// Fenêtre modale
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

let titreInput, categorieInput;
const createFormElement = (labelText, inputType) => {
  const form = document.createElement("form");
  const label = document.createElement("label");
  const input = document.createElement("input");

  label.textContent = labelText;
  input.setAttribute("type", inputType);

  form.appendChild(label);
  form.appendChild(input);

// Stocker une référence aux éléments globalement
  if (labelText === "Titre") {
    titreInput = input;
  } else if (labelText === "Catégorie") {
    categorieInput = input;
  }

  return form;
};
let newImg = null
import { genererImg } from "./script.js";
    

function handleFormChange() {
    
    const imagePresente = ajoutPhoto.querySelector("img") !== null;
    const texteTitre = titreInput.value.trim() !== "";
    const texteCategorie = categorieInput.value.trim() !== "";
    console.log("Image présente:", imagePresente);
    console.log("Texte dans le titre:", texteTitre);
    console.log("Texte dans la catégorie:", texteCategorie);
    // Vérifier si les deux formulaires ont du texte et qu'une image est présente
    if (texteTitre && texteCategorie && imagePresente) {
        // Activer le bouton
        addButton.disabled = false;
        addButton.style.backgroundColor = "#1D6154";
        console.log("Texte dans le titre:", texteTitre);
        console.log("Formulaires remplis avec succès !")
        console.log("bouton activé")
    } else {
        // Désactiver le bouton
        addButton.disabled = true;
        addButton.style.backgroundColor = "#A7A7A7";
        console.log("bouton desactivé")
    }
    
    
}
addButton.addEventListener("click", function (){
        console.log(addButton)
    })
 const formsContainer = document.createElement("div");

function creaForms() {
   
    formsContainer.classList.add("formsContainer");
    formsContainer.appendChild(createFormElement("Titre", "text"));
    formsContainer.appendChild(createFormElement("Catégorie", "text"));
    // Ajout de la div contenant les formulaires à modalWrapper
    modalWrapper.appendChild(formsContainer);
}

function creaBackButton(){
 backButtonContainer.classList.add("back-button-container");
            // Création de l'icône de retour
            backButton.classList.add("backButton");
            backButton.innerHTML = `<i class="fa-solid fa-arrow-left"></i>`;
            backButton.id = "modalBack";
            // Ajout de l'icône au conteneur
            backButtonContainer.appendChild(backButton);
            // Ajout du conteneur à la modal
            modalWrapper.appendChild(backButtonContainer);
}

function creaFigureWithImg(event){
    event.preventDefault()
    if(gallery && newImg){
        const figure = document.createElement ("figure")
        const imageElement = document.createElement("img");
            imageElement.src = URL.createObjectURL(newImg);
            imageElement.alt = "Image sélectionnée";
        figure.appendChild(imageElement)
        gallery.appendChild(figure)}
    insideModal()
}


function modal2() {
    
        // Vérifier si l'événement provient du bouton btnAjout
            const wrapper = document.querySelector(".imgWrapper");
            if (wrapper) {
                formsContainer.innerHTML=""
                ajoutPhoto.innerHTML = ""
                wrapper.remove();   
            // Changer le texte de l'élément titlemodal
            titlemodal.textContent = additionalTitleText;
            
           
           
            creaBackButton()
            creaForms()

            // Création de la div ajoutPhoto
            ajoutPhoto.classList.add("ajoutPhoto");
            
            // Intérieur ajoutPhoto
            ajoutPhoto.innerHTML = `<i class="fa-regular fa-image"></i>`;
            const addPhotoButton = document.createElement("button");
            addPhotoButton.classList.add("addPhotoButton");
            addPhotoButton.innerText = "+ Ajouter une photo";
            const textAjoutPhoto = document.createElement("p");
            textAjoutPhoto.classList.add("textAjout");
            textAjoutPhoto.innerText = "jpg. png : 4mo max";
            ajoutPhoto.appendChild(addPhotoButton);
            ajoutPhoto.appendChild(textAjoutPhoto);
            addPhotoButton.addEventListener("click", function () {
                // Création de l'élément input de type "file"
            const fileInput = document.createElement("input");
            fileInput.type = "file";

            // Ajout d'un écouteur d'événements pour le changement de fichier
            fileInput.addEventListener("change", function (event) {
            // Vous pouvez traiter le fichier sélectionné ici
            const selectedFile = event.target.files[0];
            console.log("Fichier sélectionné :", selectedFile.name);

            // Vérifier si un fichier a été sélectionné
            if (selectedFile) {
                newImg = selectedFile;
                console.log(newImg);

                // Création d'un élément image
                const imageElement = document.createElement("img");
                imageElement.src = URL.createObjectURL(selectedFile);
                imageElement.alt = "Image sélectionnée";

                // Effacer le contenu existant de ajoutPhoto
                ajoutPhoto.innerHTML = "";

                // Ajouter l'élément image à la div ajoutPhoto
                ajoutPhoto.appendChild(imageElement);
            }
        })

    // Cliquez sur l'élément input de type "file" pour ouvrir l'explorateur de fichiers
    fileInput.click();
});
            // Ajout du bouton "Ajouter une photo" à la div ajoutPhoto
            ajoutPhoto.appendChild(addPhotoButton);
            // Changer le texte du bouton btnAjout
            addButton.textContent = "Valider";
            // Désactiver le bouton btnAjout
            addButton.disabled = true;
            addButton.style.backgroundColor = "#A7A7A7";
            // Ajout du bouton btnAjout après les formulaires
            modalWrapper.insertBefore(ajoutPhoto,formsContainer)
            modalWrapper.appendChild(addButton)
        }

[ titreInput, categorieInput ].forEach(input =>{ input.addEventListener("input", handleFormChange)});
        backButton.addEventListener("click", function (event) {
            event.stopPropagation()
            resetOpenModal();
            insideModal()
        });

   addButton.addEventListener("click",creaFigureWithImg)  
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
    addButton.innerHTML = defaultButtonText;
    addButton.disabled = false;
    addButton.style.backgroundColor = "#1D6154";

    addButton.addEventListener("click", function (event) {
        event.preventDefault()
        modal2(event)    
        })
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
    }
});

closeButtonElement.addEventListener("click", closeModal);

document.querySelectorAll(".modale").forEach(a => {
    a.addEventListener("click", openModal);
});

