const { io }=require('../server');
const { TicketControl } = require("../classes/ticket-control");

//Traemos el constructor
const ticketControl = new TicketControl();

io.on("connection", (client) => {
  client.on("siguienteTicket", (data, callback) => {
    let siguienteTicket = ticketControl.siguienteTicket();
    callback(siguienteTicket);
  });

  //Emitir evento llamado estado actual
  client.emit("estadoActual", {
    actual: ticketControl.getUltimoTicket(), 
    ultimos4: ticketControl.getUltimos4()
  });

  client.on('atenderTicket', (data, callback)=>{

    if(!data.escritorio){
      return callback({
        err: true,
        mensaje: 'El escritorio es necesario'
      });
    }

    let atenderTicker = ticketControl.atenderTicker(data.escritorio);

    callback(atenderTicker);

    //Notificar cambios en los últimos 4
    client.broadcast.emit('ultimos4', {ultimos4: ticketControl.getUltimos4()});

  })

});
