const form = document.getElementById("userForm");
const userList = document.getElementById("userList");

async function loadUsers() {
  const res = await fetch("/users");
  const users = await res.json();
  userList.innerHTML = "";
  users.forEach(user => {
    const li = document.createElement("li");
    li.textContent = `${user.nome} (${user.email})`;
    userList.appendChild(li);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;

  const res = await fetch("/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, email }),
  });

  if (res.ok) {
    form.reset();
    await loadUsers();
  } else {
    const { error } = await res.json();
    alert(error || "Erro ao cadastrar usuário");
  }
});

loadUsers();
