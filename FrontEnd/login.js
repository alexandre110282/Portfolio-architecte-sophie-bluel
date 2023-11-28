document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const user = {
    email: email,
    password: password,
  };

  // Appel à l'API pour uploader les données du formulaire
  fetch('http://localhost:5678/api/users/login', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (response.status === 404) {
        const invalidEmailDiv = document.querySelector(".invalidEmail");
        const invalidEmail = document.createElement("p");
        invalidEmail.innerText = "Email non valide";
        invalidEmailDiv.appendChild(invalidEmail);

        throw new Error("Email non valide"); // Génère une erreur avec le message "Email non valide"
      }
      if (response.status === 401) {
        const invalidPasswordDiv = document.querySelector(".invalidPassword");
        const invalidPassword =  document.createElement("p");
        invalidPassword.innerText = "Mot de passe non valide";
        invalidPasswordDiv.appendChild(invalidPassword);

        throw new Error("Mot de passe non valide");
      }

      // Continuer le traitement si la requête n'a pas généré d'erreur
      return response.json();
    })
    .catch((error) => {
      // Gestion des erreurs ici
      console.error(error.message);
    });
});