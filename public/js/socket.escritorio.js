//Comando para establecer la conexión
var socket = io();

var searchParams = new URLSearchParams(window.location.search);
var label = $("small");

if (!searchParams.has("escritorio")) {
  window.location = "index.html";
  throw new Error("El escritorio es necesario");
}
//Guardamos el escritorio que asignamos en el index
var escritorio = searchParams.get("escritorio");

$("h1").text("Escritorio " + escritorio);

$("button").on("click", function () {
  socket.emit("atenderTicket", { escritorio: escritorio }, function (resp) {
    if (resp === "No hay Turnos") {
      label.text(resp);
      alert(resp);
      return;
    }
    label.text("Turno " + resp.numero);
  });
});
