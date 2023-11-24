const apiUrl = 'http://localhost:5678/api/works';

const reponse= await fetch(apiUrl)
const trueReponse= await reponse.json()
console.log(trueReponse)
console.log(reponse)
const index= trueReponse.map(list=> list.imageUrl)
console.log(index)

 
const gallery= document.querySelector('.gallery')

const boutonsText = ["Tous", "Objets", "Appartements", "Hôtels & restaurants"]
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


const tous=  document.querySelector(".btn-tous")
tous.addEventListener("click",function(){
 document.querySelector(".gallery").innerHTML =""
    genererProjets(trueReponse)
})

 const objets =  document.querySelector(".btn-obj")
  objets.addEventListener("click", function(){
    const objetsFiltres =  trueReponse.filter(function(objet){
    return objet.category.name === "Objets"
    })
    document.querySelector(".gallery").innerHTML =""
    genererProjets(objetsFiltres)
  })

  const apparts =  document.querySelector(".btn-appart")
  apparts.addEventListener("click", function(){
    const appartsFiltres =  trueReponse.filter(function(appart){
    return appart.category.name === "Appartements"
    })
     document.querySelector(".gallery").innerHTML =""
    genererProjets(appartsFiltres)
  })

  const hotels =  document.querySelector(".btn-hotel")
  hotels.addEventListener("click", function(){
    const hotelsFiltres =  trueReponse.filter(function(hotel){
    return hotel.category.name === "Hotels & restaurants"
    })
    document.querySelector(".gallery").innerHTML =""
    genererProjets(hotelsFiltres)
  })

  

  