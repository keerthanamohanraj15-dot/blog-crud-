const API_BASE = "https://blog-crud-fdql.onrender.com";

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

// Load blogs
async function loadBlogs() {
    try {
        const response = await fetch(`${API_BASE}/api/blogs`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const blogs = await response.json();

        const blogsContainer = document.getElementById("blogs");
        blogsContainer.innerHTML = "";

        blogs.forEach(blog => {
            const div = document.createElement("div");

            div.innerHTML = `
                <h3>${blog.title}</h3>
                <p>${blog.content}</p>
                <button onclick="deleteBlog('${blog._id}')">Delete</button>
                <hr>
            `;

            blogsContainer.appendChild(div);
        });

    } catch (error) {
        console.error(error);
    }
}


// Create blog
document.getElementById("blogForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const message = document.getElementById("blogMessage");

    try {
        const response = await fetch(`${API_BASE}/api/blogs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                title: title,
                content: content
            })
        });

        const data = await response.json();

        if (response.ok) {
            message.textContent = "Blog created successfully!";

            document.getElementById("blogForm").reset();

            loadBlogs();
        } else {
            message.textContent = data.message || "Failed to create blog";
        }

    } catch (error) {
        console.error(error);
        message.textContent = "Server error";
    }
});


// Delete blog
async function deleteBlog(id) {
    try {
        const response = await fetch(`${API_BASE}/api/blogs/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (response.ok) {
            alert("Blog deleted successfully!");
            loadBlogs();
        } else {
            alert(data.message || "Delete failed");
        }

    } catch (error) {
        console.error(error);
        alert("Server error");
    }
}


// Logout
document.getElementById("logoutBtn").addEventListener("click", function () {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "login.html";
});


// Start
loadBlogs();