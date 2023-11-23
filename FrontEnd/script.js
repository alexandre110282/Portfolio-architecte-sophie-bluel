const apiUrl = 'http://localhost:5678/api/works';

const reponse= await fetch(apiUrl)
const trueReponse= await reponse.json()
console.log(trueReponse)
console.log(reponse)
const index= trueReponse.map(list=> list.imageUrl)
console.log(index)

 
const gallery= document.querySelector('.gallery')
const boutonsText = ["Tous", "Objets", "Appartements", "Hôtels & restaurants"];
const listFiltre= document.createElement("div")
 listFiltre.classList.add("listfiltres")
 
// Boucle pour créer et configurer chaque bouton
for (let i = 0; i < boutonsText.length; i++) {
    // Création du bouton
    const bouton = document.createElement('button')
    bouton.type = "submit"
    bouton.classList.add("filtres")
    // Attribution du texte au bouton à partir du tableau
    bouton.innerText = boutonsText[i]
    // Ajout du bouton au corps du document
    listFiltre.appendChild(bouton)
}


const portH2 = document.querySelector("#portfolio h2")
portH2.parentNode.insertBefore(listFiltre, portH2.nextSibling)


for (let i=0; i< index.length; i++){
    
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
    console.log(figure)
}


  