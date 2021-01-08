const { throws } = require("assert");
const fs = require("fs");

class Ticket {
  constructor(numero, escritorio) {
    this.numero = numero;
    this.escritorio = escritorio;
  }
}

class TicketControl {
  constructor() {
    this.ultimo = 0;
    this.hoy = new Date().getDate();
    this.tickets = [];
    this.ultimos4 = [];

    let data = require("../data/data.json");

    if (data.hoy === this.hoy) {
      this.ultimo = data.ultimo;
      this.tickets = data.tickets;
      this.ultimos4 = data.ultimos4;
    } else {
      this.reiniciarConteo();
    }
  }

  siguienteTicket() {
    this.ultimo += 1;
    let ticket = new Ticket(this.ultimo, null);
    this.tickets.push(ticket);
    this.grabarArchivo();
    return `Turno ${this.ultimo}`;
  }

  getUltimoTicket() {
    return `Turno ${this.ultimo}`;
  }

  getUltimos4() {
    return this.ultimos4;
  }

  atenderTicker(escritorio) {
    if (this.tickets.length === 0) {
      return "No hay Turnos";
    }
    //Extraigo el número para romper la relación de objetos pasados por referencia
    //Evitar problemas
    let numeroTicket = this.tickets[0].numero;
    //Elimino la 1era posición del arreglo
    this.tickets.shift();

    //Creo el ticket a atender
    let atenderTicket = new Ticket(numeroTicket, escritorio);

    //Agrego el ticket al inicio del nuevo arreglo
    this.ultimos4.unshift(atenderTicket);

    //Verificamos que solo existan 4 tickets en ese arreglo (Se puede aumentar)
    if (this.ultimos4.length > 4) {
      //Remover el último elemento de un arreglo
      this.ultimos4.splice(-1, 1);
    }
    this.grabarArchivo();
    return atenderTicket;
  }

  reiniciarConteo() {
    this.ultimo = 0;
    this.tickets = [];
    this.ultimos4 = [];
    this.grabarArchivo();
  }

  grabarArchivo() {
    let jsonData = {
      ultimo: this.ultimo,
      hoy: this.hoy,
      tickets: this.tickets,
      ultimos4: this.ultimos4,
    };
    let jsonDataString = JSON.stringify(jsonData);

    fs.writeFileSync("./server/data/data.json", jsonDataString);
  }
}

module.exports = {
  TicketControl,
};
