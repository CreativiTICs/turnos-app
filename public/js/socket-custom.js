var socket = io();

//Escuchar
socket.on("connect", function () {
  console.log("Conectado al servidor");
});
socket.on("disconnect", function () {
  console.log("Perdimos conexión con el servidor");
});

//Enviar información
socket.emit(
  "enviarMensaje",
  {
    usuario: 'Carlos',
    mensaje: "Hola Mundo",
  },
  function (resp) {
    console.log("Respuesta server:", resp);
  }
);

//Escuchar información
socket.on("enviarMensaje", function (mensaje) {
  console.log("Servidor:", mensaje);
});
