require('dotenv').config();

db = connect(process.env.MONGO_URI);

class Proyecto{
    constructor(nombre, descripcion, inicio, 
                fin, estado, presupuesto, objetivo) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.inicio = inicio
        this.fin = fin;
        this.estado = estado;
        this.presupuesto = presupuesto;
        this.objetivo = objetivo;
      }
}

var proyectos = [];

db.proyectos.find({}).forEach(function(doc) {
    proyectos.push(new Proyecto(doc.nombre, doc.descripcion, doc.inicio, 
                                doc.fin, doc.estado, doc.presupuesto));
});

function estadosProyectos() {
  var mesesProyectos = new Map();
  
  mesesProyectos.set("planeado", 0);
  mesesProyectos.set("en progreso", 0);
  mesesProyectos.set("completado", 0);
  mesesProyectos.set("cancelado", 0);

  for (var i = 0; i < proyectos.length; i++) {
    var estado = proyectos[i].estado; 

    var sumaActual = mesesProyectos.get(estado);

    mesesProyectos.set(estado, sumaActual + 1);
  }
    return mesesProyectos;
};

function proyectosMensuales() {
  const date = new Date();
  const year = date.getFullYear();

  var mesesProyectos = new Map();
  
  for (var i = 1; i <= 12; i++) {
    var key = "key" + i;
    mesesProyectos.set(key, 0); 
  }

  for (var i = 0; i < proyectos.length; i++) {
    var p_fecha = JSON.stringify(proyectos[i].inicio);
    var p_mes = parseInt(p_fecha.substring(6, 8));
    var p_year = parseInt(p_fecha.substring(1, 8));
    var key = "key" + p_mes;

    if (p_year == year) {
      var sumaActual = mesesProyectos.get(key);
      mesesProyectos.set(key, sumaActual + 1);
    }
  }
  return mesesProyectos;
};

module.exports = estadosProyectos, proyectosMensuales;
