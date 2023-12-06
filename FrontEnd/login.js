async function loginUser() {
  try {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const user = {
      email: email,
      password: password,
    };

    const authToken = "token";

    const response = await fetch('http://localhost:5678/api/users/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(user),
    });

    if (response.status === 404) {
      const invalidEmailDiv = document.querySelector(".invalidEmail");
      invalidEmailDiv.innerHTML = "";
      const invalidEmail = document.createElement("p");
      invalidEmail.innerText = "Email non valide";
      invalidEmailDiv.appendChild(invalidEmail);

      throw new Error("Email non valide");
    }
    if (response.status === 401) {
      const invalidPasswordDiv = document.querySelector(".invalidPassword");
      invalidPasswordDiv.innerHTML = "";
      const invalidPassword = document.createElement("p");
      invalidPassword.innerText = "Mot de passe non valide";
      invalidPasswordDiv.appendChild(invalidPassword);

      throw new Error("Mot de passe non valide");
    }
if (response.ok){
    const data = await response.json();

    localStorage.setItem('token', data.token);

  
    // Rediriger vers la page d'accueil après le traitement
    window.location.href = 'index.html';}
  } catch (error) {
    // Gestion des erreurs ici
    console.error(error.message);
  }
}

// Appeler la fonction loginUser lors de la soumission du formulaire
document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
  loginUser();
});