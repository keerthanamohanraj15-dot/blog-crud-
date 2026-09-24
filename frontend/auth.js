const API_BASE = "http://localhost:5000";

// REGISTER
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    try {
      const response = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        message.textContent = data.message;
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      message.textContent = "Registration successful!";

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 500);

    } catch (error) {
      message.textContent = "Server connection failed.";
    }
  });
}


// LOGIN
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    try {
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        message.textContent = data.message;
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      message.textContent = "Login successful!";

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 500);

    } catch (error) {
      message.textContent = "Server connection failed.";
    }
  });
}


// PROFILE
const profileDiv = document.getElementById("profile");

if (profileDiv) {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "login.html";
  } else {
    fetch(`${API_BASE}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.user) {
          profileDiv.innerHTML = `
            <h2>${data.user.name}</h2>
            <p>Email: ${data.user.email}</p>
          `;
        }
      })
      .catch(() => {
        profileDiv.textContent = "Could not load profile.";
      });
  }
}