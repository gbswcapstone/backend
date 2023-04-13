const textInputField = document.querySelector(".input");
const btn = document.querySelector(".btn");
const utterThis = new SpeechSynthesisUtterance();
const synth = window.speechSynthesis;

const socket = io.connect("http://localhost:8001");

btn.addEventListener("click", () => {
  socket.emit("ttsSend", { msg: textInputField.value });
  textInputField.value = "";
});

socket.on("ttsSend", (msg) => {
  utterThis.text = msg.msg;
  synth.speak(utterThis);
});
