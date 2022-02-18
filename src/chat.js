//make connection
const socket = io("http://localhost:3000");

//query dom
const message = document.getElementById("message");
const handle = document.getElementById("handle");
const btn = document.getElementById("send");
const messages = document.getElementById("messages");
const feedback = document.getElementById("feedback");

//emit event
btn.addEventListener("click", () => {
  console.log("clicked");
  socket.emit("chat", {
    message: message.value,
    handle: handle.value,
  });
});

message.addEventListener("keypress", () => {
  socket.emit("typing", handle.value);
});

//listen for events
socket.on("chat", (data) => {
  let handle = document.createElement("p");
  handle.classList.add("handle");
  handle.innerText = data.handle;
  let text = document.createElement("p");
  text.innerText = data.message;
  let message = document.createElement("div");
  message.append(handle);
  message.append(text);
  message.classList.add("message");
  feedback.innerHTML = "";
  messages.append(message);
});

socket.on("typing", (data) => {
  let notice = document.createElement("p");
  notice.innerText = `${data} is typing a message`;
  feedback.innerHTML = notice.innerHTML;
});
