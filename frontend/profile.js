const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    document.getElementById("name").textContent =
        payload.name || "User";

    document.getElementById("email").textContent =
        payload.email || "Email not available";

} catch (error) {

    console.error("Invalid token:", error);

    localStorage.removeItem("token");

    window.location.href = "login.html";
}