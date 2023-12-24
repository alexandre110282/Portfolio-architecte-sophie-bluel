import { getToken } from "./token.js";
import { removeToken } from "./token.js";
const apiUrl = 'http://localhost:5678/api/works';
const reponse = await fetch(apiUrl);
export const trueReponse = await reponse.json();

const imgEdit = `<i class="fa-regular fa-pen-to-square"></i>`

export const gallery = document.querySelector('.gallery');
const listFiltre = document.createElement("div");
listFiltre.classList.add("listfiltres");

function boutonFiltres() {
  const categories = [];

  // Récupérer les noms de catégories uniques depuis trueReponse
  for (const projet of trueReponse) {
    if (!categories.includes(projet.category.name)) {
      categories.push(projet.category.name);
    }
  }

  // Ajouter un bouton "Tous" manuellement
  categories.unshift("Tous");

  // Créer les boutons de filtre
  for (let i = 0; i < categories.length; i++) {
    const bouton = document.createElement('button');
    bouton.type = "submit";
    bouton.classList.add("filtres");
    bouton.innerText = categories[i];
    bouton.setAttribute('data-category', categories[i]);
    listFiltre.appendChild(bouton);
  }

  const portH2 = document.querySelector("#portfolio h2");
  portH2.parentNode.insertBefore(listFiltre, portH2.nextSibling);
}

function workingFilter() {
  const categories = document.querySelectorAll(".filtres");
  
  for (let index = 0; index < categories.length; index++) {
    const choixbouton = categories[index];
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


 export function genererProjets(trueReponse) {
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

export function genererImg() {
    const imgElements = [];
    for (let i = 0; i < trueReponse.length; i++) {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        img.src = trueReponse[i].imageUrl;
        img.alt = trueReponse[i].title;

        const trashIcone = document.createElement("div");
        trashIcone.classList.add("trash");
        trashIcone.setAttribute('data-index', i);
        trashIcone.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

        trashIcone.addEventListener('click', Delete);

        figure.appendChild(img);
        figure.appendChild(trashIcone);
        imgElements.push(figure);
    }
    return imgElements;
}

function Delete(event) {
    const token = getToken();
    if (!token) {
        console.error("Token non disponible ou expiré.");
        return;
    }

    const dataIndex = event.currentTarget.getAttribute('data-index');
    const imageAssociated = trueReponse[dataIndex];
    const imageIdToDelete = imageAssociated.id;

    fetch(`http://localhost:5678/api/works/${imageIdToDelete}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Échec de la requête de suppression vers l'API");
        }
        trueReponse.splice(dataIndex, 1)
        gallery.innerHTML=""
        genererProjets(trueReponse)
        openModal()
        console.log('Image supprimée avec succès.');
    })
    .catch((error) => {
        console.error("Erreur lors de la suppression de l'image :", error);
    });
}

function createBanner(text) {
    const banner = document.createElement("div");
    banner.classList.add("banner");
    banner.href = "#banner";
    banner.innerHTML = imgEdit + " " + text;
    return banner;
}

if (getToken() != null) {
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
    const blackBanner = createBanner("Mode édition");
    document.querySelector("header").insertBefore(blackBanner, document.querySelector("h1"))
    const loginLink = document.getElementById('loginLink');
    loginLink.innerHTML = '<a href="#">Logout</a>';
    loginLink.addEventListener('click', function (e) {
        e.preventDefault();
        // Supprimer le token du localStorage
        removeToken();
        // Rediriger vers la page de login ou effectuer d'autres opérations si nécessaire
        window.location.href = './index.html';
    });
} else {
    // Le token est null (n'existe pas)
    console.log("Le token n'existe pas");
    let header = document.querySelector("header")
    header.style.margin = "0px"
    boutonFiltres();
    workingFilter();
    genererProjets(trueReponse);
}

document.querySelectorAll(".modale").forEach(a => {
    a.addEventListener("click", openModal);
});
import { openModal } from "./modale.js";