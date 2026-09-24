const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

const blogs = document.getElementById("blogs");
const welcome = document.getElementById("welcome");
const logoutBtn = document.getElementById("logoutBtn");

// Welcome message
if (welcome) {
    welcome.innerText = "Welcome to your dashboard!";
}


// Load blogs
async function loadBlogs() {

    try {

        const response = await fetch("http://localhost:5000/api/blogs", {
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const data = await response.json();

        blogs.innerHTML = "";

        if (!Array.isArray(data) || data.length === 0) {

            blogs.innerHTML = `
                <div class="blog-card">
                    <h2>No Blogs Yet 📝</h2>
                    <p>Create your first blog post.</p>
                </div>
            `;

            return;
        }

        data.forEach(blog => {

            const card = document.createElement("div");

            card.className = "blog-card";

            card.innerHTML = `
                <h2>${blog.title}</h2>

                <p>${blog.content}</p>

                <button onclick="deleteBlog('${blog._id}')"
                        class="delete-btn">
                    🗑️ Delete
                </button>
            `;

            blogs.appendChild(card);
        });

    } catch (error) {

        console.error(error);

        blogs.innerHTML = `
            <div class="blog-card">
                <h2>⚠️ Unable to load blogs</h2>
                <p>Make sure the backend server is running.</p>
            </div>
        `;
    }
}


// Delete blog
async function deleteBlog(id) {

    if (!confirm("Delete this blog?")) {
        return;
    }

    try {

        const response = await fetch(
            "http://localhost:5000/api/blogs/" + id,
            {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + token
                }
            }
        );

        if (response.ok) {

            alert("Blog deleted successfully!");

            loadBlogs();

        } else {

            alert("Delete failed.");

        }

    } catch (error) {

        console.error(error);

        alert("Server error.");
    }
}


// Logout
if (logoutBtn) {

    logoutBtn.addEventListener("click", function () {

        localStorage.removeItem("token");

        window.location.href = "login.html";

    });

}


// Start
loadBlogs();