let socket = io(),
  $form = document.getElementById("chat-form");

$form.addEventListener("submit", (e) => {
  e.preventDefault();

  socket.emit("new message", {
    message: document.getElementById("message-text").value,
  });

  document.getElementById("message-text").value = "";

  return false;
});

socket.on("new user", (newUser) => {
  alert(newUser.message);
});

socket.on("bye user", (newUser) => {
  alert(newUser.message);
});

socket.on("user says", (userSays) => {
  let $li = document.createElement("li");
  $li.innerHTML = userSays.message;
  document.getElementById("chat").append($li);

  if (document.getElementById("title")) {
    document.getElementById("title").style.display = "none";
  }
});
