export function storeToken(token, durationInMinutes) {
    const now = new Date();
    const expiry = now.getTime() + durationInMinutes * 60000; // Convertit la durée en millisecondes
    const item = {
        value: token,
        expiry: expiry
    };
    localStorage.setItem('token', JSON.stringify(item));
}


export function getToken() {
    const tokenString = localStorage.getItem('token');
    if (tokenString) {
        const item = JSON.parse(tokenString);
        const now = new Date();
        if (now.getTime() > item.expiry) {
            localStorage.removeItem('token');
            return null;
        }
        return item.value; // Renvoie la valeur du token
    }
    return null; // Renvoie null si le token n'est pas présent
}

export function removeToken() {
    localStorage.removeItem('token');
}