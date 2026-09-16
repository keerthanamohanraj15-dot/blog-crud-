const API = "http://localhost:5000/api/blogs";

const form = document.getElementById("blogForm");
const blogId = document.getElementById("blogId");
const title = document.getElementById("title");
const content = document.getElementById("content");
const blogsDiv = document.getElementById("blogs");
const message = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");

async function loadBlogs() {
  try {
    const response = await fetch(API);
    const blogs = await response.json();

    blogsDiv.innerHTML = "";

    blogs.forEach(blog => {
      const div = document.createElement("div");
      div.className = "blog";

      const h2 = document.createElement("h2");
      h2.textContent = blog.title;

      const p = document.createElement("p");
      p.textContent = blog.content;

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit ✏️";
      editBtn.onclick = () => editBlog(blog);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete 🗑️";
      deleteBtn.className = "delete";
      deleteBtn.onclick = () => deleteBlog(blog._id);

      div.append(h2, p, editBtn, deleteBtn);
      blogsDiv.appendChild(div);
    });
  } catch (error) {
    message.textContent = "Backend is not running.";
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const data = {
    title: title.value,
    content: content.value
  };

  const id = blogId.value;
  const url = id ? `${API}/${id}` : API;
  const method = id ? "PUT" : "POST";

  try {
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error("Request failed");

    message.textContent = id ? "Blog updated successfully! ✅" : "Blog added successfully! ✅";
    resetForm();
    loadBlogs();
  } catch (error) {
    message.textContent = "Something went wrong. Check the backend.";
  }
});

function editBlog(blog) {
  blogId.value = blog._id;
  title.value = blog.title;
  content.value = blog.content;
  submitBtn.textContent = "Update Blog";
  cancelBtn.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function deleteBlog(id) {
  if (!confirm("Are you sure you want to delete this blog?")) return;

  try {
    const response = await fetch(`${API}/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Delete failed");

    message.textContent = "Blog deleted successfully! ✅";
    loadBlogs();
  } catch (error) {
    message.textContent = "Delete failed.";
  }
}

cancelBtn.onclick = resetForm;

function resetForm() {
  form.reset();
  blogId.value = "";
  submitBtn.textContent = "Add Blog";
  cancelBtn.classList.add("hidden");
}

loadBlogs();