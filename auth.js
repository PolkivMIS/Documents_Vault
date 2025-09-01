// auth.js

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('.login-form');

  // 🧠 Auto-redirect if already logged in
  if (window.location.pathname.includes('index.html') && sessionStorage.getItem("auth") === "true") {
    window.location.href = "vault.html";
  }

  // 🔐 Handle login form submission
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
});

// ✅ List of valid users
const users = [
  { username: 'admin', password: 'freelancer@1994' },
  { username: 'deepshikha', password: 'rs@1234' },
  { username: 'issuagarwal', password: 'rs@1991' }
];

function handleLogin(e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    sessionStorage.setItem("auth", "true");
    sessionStorage.setItem("username", username);
    window.location.href = "vault.html";
  } else {
    showError('Invalid username or password');
  }
}

function showError(message) {
  const errorBox = document.querySelector('.error-message');
  if (errorBox) {
    errorBox.textContent = message;
    errorBox.style.display = 'block';
  } else {
    alert(message); // fallback
  }
}