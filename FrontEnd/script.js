const apiUrl = 'http://localhost:5678/api/works';
console.log(apiUrl)
const reponse= await fetch(apiUrl)
const trueReponse= await reponse.json()
console.log(trueReponse)
console.log(reponse)
const index= trueReponse.map(list=> list.imageUrl)

 
const gallery= document.querySelector('.gallery')

const boutonsText = ["Tous", "Objets", "Appartements", "Hôtels & restaurants"]
const boutonsCat = ["Tous", "Objets", "Appartements", "Hotels & restaurants"]
const boutonClass =[ "btn-tous", "btn-obj", "btn-appart", "btn-hotel"]
const listFiltre= document.createElement("div")
 listFiltre.classList.add("listfiltres")
 
// Boucle pour créer et configurer chaque bouton

for (let i = 0; i < boutonsText.length; i++) {
    // Création du bouton
    const bouton = document.createElement('button')
    bouton.type = "submit"
    bouton.classList.add("filtres", boutonClass[i])
    // Attribution du texte au bouton à partir du tableau
    bouton.innerText = boutonsText[i]
    bouton.setAttribute('data-category', boutonsCat[i])
    // Ajout du bouton au corps du document
    listFiltre.appendChild(bouton)
}


const portH2 = document.querySelector("#portfolio h2")
portH2.parentNode.insertBefore(listFiltre, portH2.nextSibling)

function genererProjets(trueReponse){
for (let i=0; i< trueReponse.length; i++){
    let figure =document.createElement("figure")
//creation balise img et figcaption
    const img = document.createElement("img")
    const figcaption = document.createElement("figcaption")
    //insertion texte figcaption
    figcaption.innerText = trueReponse[i].title
    //acces image[i] et alt
    img.src = trueReponse[i].imageUrl
    img.alt = trueReponse[i].title
    // insertion nouveaux elements dans figure
    figure.appendChild(img)
    figure.appendChild(figcaption)
    //insertion figure dans balise gallery
    gallery.appendChild(figure)
}}
genererProjets(trueReponse)


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