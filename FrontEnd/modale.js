function openModal(e) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute("href"));
    target.style.display = null;
    target.removeAttribute("aria-hidden");
    target.setAttribute("aria-modal", "true");
    insideModal();
}

const titlemodal = document.createElement("h3");
titlemodal.setAttribute("id", "titlemodal");
const defaultTitleText = "Galerie Photo";
const additionalTitleText = "Ajout photo";
titlemodal.textContent = defaultTitleText;
const addButton = document.createElement("button");
addButton.classList.add("btn_ajout");
const defaultButtonText = "Ajouter une photo";
const modalWrapper = document.querySelector(".modal-wrapper");
const closeButton = document.createElement("span");
closeButton.classList.add("close-btn");
closeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M17.6546 8.05106C18.1235 7.58214 18.1235 6.82061 17.6546 6.35169C17.1856 5.88277 16.4241 5.88277 15.9552 6.35169L12.005 10.3056L8.05106 6.35544C7.58214 5.88652 6.82061 5.88652 6.35169 6.35544C5.88277 6.82436 5.88277 7.58589 6.35169 8.05481L10.3056 12.005L6.35544 15.9589C5.88652 16.4279 5.88652 17.1894 6.35544 17.6583C6.82436 18.1272 7.58589 18.1272 8.05481 17.6583L12.005 13.7044L15.9589 17.6546C16.4279 18.1235 17.1894 18.1235 17.6583 17.6546C18.1272 17.1856 18.1272 16.4241 17.6583 15.9552L13.7044 12.005L17.6546 8.05106Z" fill="black"/>
</svg>`;


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