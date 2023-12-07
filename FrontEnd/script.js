const apiUrl = 'http://localhost:5678/api/works';
console.log(apiUrl);
const reponse = await fetch(apiUrl);
const trueReponse = await reponse.json();
console.log(trueReponse);
console.log(reponse);
const index = trueReponse.map(list => list.imageUrl);
const imgEdit = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M13.5229 1.68576L13.8939 2.05679C14.1821 2.34503 14.1821 2.81113 13.8939 3.0963L13.0016 3.99169L11.5879 2.57808L12.4803 1.68576C12.7685 1.39751 13.2346 1.39751 13.5198 1.68576H13.5229ZM6.43332 7.73578L10.5484 3.61759L11.9621 5.03121L7.84387 9.14633C7.75494 9.23525 7.64455 9.29964 7.52496 9.33337L5.73111 9.84546L6.2432 8.05162C6.27693 7.93203 6.34133 7.82164 6.43025 7.73271L6.43332 7.73578ZM11.4408 0.646245L5.39074 6.6932C5.12397 6.95998 4.93078 7.28808 4.82959 7.64685L3.9526 10.7133C3.879 10.9708 3.94953 11.2468 4.13965 11.4369C4.32977 11.627 4.60574 11.6976 4.86332 11.624L7.92973 10.747C8.29156 10.6427 8.61967 10.4495 8.88338 10.1858L14.9334 4.13888C15.7951 3.27722 15.7951 1.87894 14.9334 1.01728L14.5624 0.646245C13.7007 -0.215415 12.3024 -0.215415 11.4408 0.646245ZM2.69844 1.84214C1.20816 1.84214 0 3.05031 0 4.54058V12.8812C0 14.3715 1.20816 15.5796 2.69844 15.5796H11.0391C12.5293 15.5796 13.7375 14.3715 13.7375 12.8812V9.44683C13.7375 9.039 13.4094 8.71089 13.0016 8.71089C12.5937 8.71089 12.2656 9.039 12.2656 9.44683V12.8812C12.2656 13.5589 11.7167 14.1078 11.0391 14.1078H2.69844C2.02076 14.1078 1.47188 13.5589 1.47188 12.8812V4.54058C1.47188 3.86291 2.02076 3.31402 2.69844 3.31402H6.13281C6.54065 3.31402 6.86875 2.98591 6.86875 2.57808C6.86875 2.17025 6.54065 1.84214 6.13281 1.84214H2.69844Z" fill="black"/>
</svg>`;

window.addEventListener('keydown', function (e) {
    if (e.key === "F5") {
        localStorage.clear();
    }
});

const gallery = document.querySelector('.gallery');
const boutonsText = ["Tous", "Objets", "Appartements", "Hôtels & restaurants"];
const boutonsCat = ["Tous", "Objets", "Appartements", "Hotels & restaurants"];
const boutonClass = ["btn-tous", "btn-obj", "btn-appart", "btn-hotel"];
const listFiltre = document.createElement("div");
listFiltre.classList.add("listfiltres");
const token = localStorage.getItem('token');

function boutonFiltres() {
    for (let i = 0; i < boutonsText.length; i++) {
        // Création du bouton
        const bouton = document.createElement('button');
        bouton.type = "submit";
        bouton.classList.add("filtres", boutonClass[i]);
        // Attribution du texte au bouton à partir du tableau
        bouton.innerText = boutonsText[i];
        bouton.setAttribute('data-category', boutonsCat[i]);
        // Ajout du bouton au corps du document
        listFiltre.appendChild(bouton);
    }
    const portH2 = document.querySelector("#portfolio h2");
    portH2.parentNode.insertBefore(listFiltre, portH2.nextSibling);
}

function genererProjets(trueReponse) {
    for (let i = 0; i < trueReponse.length; i++) {
        let figure = document.createElement("figure");
        //creation balise img et figcaption
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");
        //insertion texte figcaption
        figcaption.innerText = trueReponse[i].title;
        //acces image[i] et alt
        img.src = trueReponse[i].imageUrl;
        img.alt = trueReponse[i].title;
        // insertion nouveaux elements dans figure
        figure.appendChild(img);
        figure.appendChild(figcaption);
        //insertion figure dans balise gallery
        gallery.appendChild(figure);
    }
}

function genererImg() {
    const imgElements = [];
    for (let i = 0; i < trueReponse.length; i++) {
        let figure = document.createElement("figure");
        //creation balise img et figcaption
        const img = document.createElement("img");
        //acces image[i] et alt
        img.src = trueReponse[i].imageUrl;
        img.alt = trueReponse[i].title;
        // insertion nouveaux elements dans figure
        figure.appendChild(img);
        imgElements.push(figure);
    }
    return imgElements;
}

function workingFilter() {
    for (let index = 0; index < boutonClass.length; index++) {
        let choixbouton = document.querySelector("." + boutonClass[index]);
        choixbouton.addEventListener("click", function () {
            // Récupérer la catégorie à partir de l'attribut data-category
            const category = choixbouton.getAttribute('data-category');
            if (category === "Tous") {
                document.querySelector(".gallery").innerHTML = "";
                genererProjets(trueReponse);
            } else {
                // Filtrer les projets en fonction de la catégorie
                const projetsFiltres = trueReponse.filter(function (projet) {
                    return projet.category.name === category;
                });
                // Vider la galerie et générer les projets filtrés
                document.querySelector(".gallery").innerHTML = "";
                genererProjets(projetsFiltres);
            }
        });
    }
}
if (token != null) {
    // Le token existe, vous pouvez effectuer des opérations avec le token ici
    console.log("Le token existe");
    genererProjets(trueReponse);
    const projetsH2 = document.querySelector(".entetegallery");
    projetsH2.style.display = "flex";
    const modification = document.createElement("a");
    modification.classList.add("modif", "modale");
    modification.href = "#modal1";
    modification.innerHTML = imgEdit + " Modifier";
    const portH2 = document.querySelector("#portfolio h2");
    portH2.parentNode.insertBefore(modification, portH2.nextSibling);
    const blackBanner = document.createElement("div");
    blackBanner.classList.add("banner");
    blackBanner.href = "#banner";
    blackBanner.innerHTML = imgEdit + " Modifier";
    document.querySelector("header").insertBefore(blackBanner, document.querySelector("h1"));
    const loginLink = document.getElementById('loginLink');
    loginLink.innerHTML = '<a href="#">Logout</a>';
    loginLink.addEventListener('click', function (e) {
        e.preventDefault();
        // Supprimer le token du localStorage
        localStorage.removeItem('token');
        // Rediriger vers la page de login ou effectuer d'autres opérations si nécessaire
        window.location.href = './index.html';
    });
} else {
    // Le token est null (n'existe pas)
    console.log("Le token n'existe pas");

    boutonFiltres();
    workingFilter();
    genererProjets(trueReponse);
}

// Fenêtre modale

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
closeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M17.6546 8.05106C18.1235 7.58214 18.1235 6.82061 17.6546 6.35169C17.1856 5.88277 16.4241 5.88277 15.9552 6.35169L12.005 10.3056L8.05106 6.35544C7.58214 5.88652 6.82061 5.88652 6.35169 6.35544C5.88277 6.82436 5.88277 7.58589 6.35169 8.05481L10.3056 12.005L6.35544 15.9589C5.88652 16.4279 5.88652 17.1894 6.35544 17.6583C6.82436 18.1272 7.58589 18.1272 8.05481 17.6583L12.005 13.7044L15.9589 17.6546C16.4279 18.1235 17.1894 18.1235 17.6583 17.6546C18.1272 17.1856 18.1272 16.4241 17.6583 15.9552L13.7044 12.005L17.6546 8.05106Z" fill="black"/>
</svg>`;

const closeLink = document.createElement("a");
closeLink.setAttribute("href", "#"); // Ajoutez le lien vers lequel vous souhaitez rediriger
closeLink.appendChild(closeButton);

const backButton = document.createElement("span");
const backButtonContainer = document.createElement("div");
const formsContainer = document.createElement("div");
const ajoutPhoto = document.createElement("div");
const wrapper = document.querySelector(".imgWrapper");
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
    
    addButton.addEventListener("click", function (){
        console.log(addButton)
    })
}

let titreImg = ""
let categorieImg = ""



function modal2(event) {
        // Vérifier si l'événement provient du bouton btnAjout
        if (event.target === addButton) {
            const wrapper = document.querySelector(".imgWrapper");
            if (wrapper) {
                wrapper.remove();
            }

            // Changer le texte de l'élément titlemodal
            titlemodal.textContent = additionalTitleText;

            // Création du conteneur pour l'icône de retour
            backButtonContainer.classList.add("back-button-container");

            // Création de l'icône de retour
            backButton.classList.add("backButton");
            backButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                <path d="M0.439478 8.94458C-0.146493 9.53055 -0.146493 10.4822 0.439478 11.0681L7.9399 18.5686C8.52587 19.1545 9.47748 19.1545 10.0635 18.5686C10.6494 17.9826 10.6494 17.031 10.0635 16.445L5.11786 11.5041H19.4999C20.3297 11.5041 21 10.8338 21 10.004C21 9.17428 20.3297 8.50393 19.4999 8.50393H5.12255L10.0588 3.56303C10.6447 2.97706 10.6447 2.02545 10.0588 1.43948C9.47279 0.853507 8.52118 0.853507 7.93521 1.43948L0.43479 8.9399L0.439478 8.94458Z" fill="black"/>
            </svg>`;
            backButton.id = "modal1";

            // Ajout de l'icône au conteneur
            backButtonContainer.appendChild(backButton);

            // Ajout du conteneur à la modal
            modalWrapper.appendChild(backButtonContainer);

            const formsContainer = document.createElement("div");
            formsContainer.classList.add("formsContainer")
            if(formsContainer){
                formsContainer.innerHTML=""
            }
            
            formsContainer.appendChild(createFormElement("Titre", "text"));
            formsContainer.appendChild(createFormElement("Catégorie", "text"));

            // Ajout de la div contenant les formulaires à modalWrapper
            modalWrapper.appendChild(formsContainer);

            // Création de la div ajoutPhoto
            ajoutPhoto.classList.add("ajoutPhoto");
            modalWrapper.insertBefore(ajoutPhoto, addButton);

            // Intérieur ajoutPhoto
            ajoutPhoto.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="70" height="61" viewBox="0 0 70 61" fill="none">
                <path d="M60.5517 6.88793C61.7228 6.88793 62.681 7.84612 62.681 9.01724V51.5768L62.0156 50.7118L43.9165 27.2894C43.3176 26.5042 42.3727 26.0517 41.3879 26.0517C40.4031 26.0517 39.4715 26.5042 38.8594 27.2894L27.8136 41.5824L23.7546 35.8998C23.1557 35.0614 22.1975 34.569 21.1595 34.569C20.1214 34.569 19.1632 35.0614 18.5644 35.9131L7.91783 50.8183L7.31896 51.6434V51.6034V9.01724C7.31896 7.84612 8.27715 6.88793 9.44827 6.88793H60.5517ZM9.44827 0.5C4.75048 0.5 0.93103 4.31945 0.93103 9.01724V51.6034C0.93103 56.3012 4.75048 60.1207 9.44827 60.1207H60.5517C65.2495 60.1207 69.069 56.3012 69.069 51.6034V9.01724C69.069 4.31945 65.2495 0.5 60.5517 0.5H9.44827ZM20.0948 26.0517C20.9337 26.0517 21.7644 25.8865 22.5394 25.5655C23.3144 25.2444 24.0186 24.7739 24.6118 24.1807C25.2049 23.5876 25.6755 22.8834 25.9965 22.1083C26.3175 21.3333 26.4828 20.5027 26.4828 19.6638C26.4828 18.8249 26.3175 17.9943 25.9965 17.2192C25.6755 16.4442 25.2049 15.74 24.6118 15.1468C24.0186 14.5537 23.3144 14.0831 22.5394 13.7621C21.7644 13.4411 20.9337 13.2759 20.0948 13.2759C19.2559 13.2759 18.4253 13.4411 17.6503 13.7621C16.8752 14.0831 16.171 14.5537 15.5779 15.1468C14.9847 15.74 14.5142 16.4442 14.1931 17.2192C13.8721 17.9943 13.7069 18.8249 13.7069 19.6638C13.7069 20.5027 13.8721 21.3333 14.1931 22.1083C14.5142 22.8834 14.9847 23.5876 15.5779 24.1807C16.171 24.7739 16.8752 25.2444 17.6503 25.5655C18.4253 25.8865 19.2559 26.0517 20.0948 26.0517Z" fill="#B9C5CC"/>
            </svg>`;

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
            newImg = selectedFile
            console.log(newImg)
            // Création d'un élément image
            const imageElement = document.createElement("img");
            imageElement.src = URL.createObjectURL(selectedFile);
            imageElement.alt = "Image sélectionnée";

            // Effacer le contenu existant de ajoutPhoto
            ajoutPhoto.innerHTML = "";

            // Ajouter l'élément image à la div ajoutPhoto
            ajoutPhoto.appendChild(imageElement);
        }
                });

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
            modalWrapper.appendChild(addButton);
        }

[ titreInput, categorieInput ].forEach(input => input.addEventListener("input", handleFormChange));
        backButton.addEventListener("click", function () {
            resetOpenModal();
            insideModal();
        });

   addButton.addEventListener("click",function(event){
    event.preventDefault()
    if(gallery && newImg){
        const figure = document.createElement ("figure")
        const imageElement = document.createElement("img");
            imageElement.src = URL.createObjectURL(newImg);
            imageElement.alt = "Image sélectionnée";
        figure.appendChild(imageElement)
        gallery.appendChild(figure)}
    insideModal()
    

})
    
}

function openModal(e) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute("href"));
    target.style.display = null;
    target.removeAttribute("aria-hidden");
    target.setAttribute("aria-modal", "true");
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


const closeModal = function (e) {
    e.preventDefault();
    const target = document.getElementById("modal1");
    target.style.display = "none";

    while (modalWrapper.firstChild) {
        modalWrapper.removeChild(modalWrapper.firstChild);
    }
};

insideModal();

document.querySelectorAll(".modale").forEach(a => {
    a.addEventListener("click", openModal);
});

function resetOpenModal() {
    modalWrapper.innerHTML = "";
    insideModal();
}


document.querySelectorAll(".modale").forEach(a => {
    a.addEventListener("click", openModal);
});

closeButtonElement.addEventListener("click", closeModal);