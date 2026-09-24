const API = "http://localhost:5000/api/blogs";

const form = document.getElementById("blogForm");
const blogId = document.getElementById("blogId");
const title = document.getElementById("title");
const content = document.getElementById("content");
const blogsDiv = document.getElementById("blogs");
const message = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");


// ===============================
// LOAD BLOGS
// ===============================
async function loadBlogs() {
  try {
    const response = await fetch(API);
    const blogs = await response.json();

    blogsDiv.innerHTML = "";

    blogs.forEach(blog => {
      const div = document.createElement("div");

      div.innerHTML = `
        <h3>${blog.title}</h3>
        <p>${blog.content}</p>
        <button onclick="editBlog('${blog._id}', '${blog.title.replace(/'/g, "\\'")}', '${blog.content.replace(/'/g, "\\'")}')">
          Edit
        </button>

        <button onclick="deleteBlog('${blog._id}')">
          Delete
        </button>

        <hr>
      `;

      blogsDiv.appendChild(div);
    });

  } catch (error) {
    console.error(error);
    message.textContent = "Could not load blogs.";
  }
}


// ===============================
// ADD / UPDATE BLOG
// ===============================
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");

  // Check login
  if (!token) {
    alert("Please login first.");
    window.location.href = "login.html";
    return;
  }

  const data = {
    title: title.value,
    content: content.value
  };

  try {

    // UPDATE
    if (blogId.value) {

      const response = await fetch(`${API}/${blogId.value}`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },

        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      message.textContent = "Blog updated successfully!";

    }

    // ADD
    else {

      const response = await fetch(API, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },

        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      message.textContent = "Blog added successfully!";
    }

    // Clear form
    form.reset();
    blogId.value = "";
    submitBtn.textContent = "Add Blog";

    loadBlogs();

  } catch (error) {
    console.error(error);
    message.textContent = "Something went wrong: " + error.message;
  }
});


// ===============================
// EDIT BLOG
// ===============================
function editBlog(id, blogTitle, blogContent) {

  blogId.value = id;
  title.value = blogTitle;
  content.value = blogContent;

  submitBtn.textContent = "Update Blog";
}


// ===============================
// CANCEL UPDATE
// ===============================
cancelBtn.addEventListener("click", () => {

  form.reset();

  blogId.value = "";

  submitBtn.textContent = "Add Blog";

  message.textContent = "";
});


// ===============================
// DELETE BLOG
// ===============================
async function deleteBlog(id) {

  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first.");
    window.location.href = "login.html";
    return;
  }

  try {

    const response = await fetch(`${API}/${id}`, {
      method: "DELETE",

      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message);
    }

    message.textContent = "Blog deleted successfully!";

    loadBlogs();

  } catch (error) {
    console.error(error);
    message.textContent = "Delete failed: " + error.message;
  }
}


// Load blogs when page opens
loadBlogs();