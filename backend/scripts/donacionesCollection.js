//Utilizar las variables locales para llamar la url de la base de datos
require('dotenv').config();

db = connect(process.env.MONGO_URI);

//Definicion de la clase Donacion
//No pude crear esto en otro archivo porque los exports se pusieron raros pero si alguien lo quiere arreglar, please do
class Donacion{
    constructor(tipo, monto, fecha, donador) {
        this.tipo = tipo;
        this.monto = monto;
        this.fecha = fecha;
        this.donador = donador;
      }
}

var donaciones = [];

//Almacenar los objetos obtenidos de la base de datos en un arreglo
db.donaciones.find({}).forEach(function(doc) {
    donaciones.push(new Donacion(doc.tipo, doc.monto, doc.fecha, doc.donador));
});

//Funcion para calcular el numero de donaciones por mes
function donacionesMensuales(){
    
    //Almacenar los resultados en un mapa inicializado con 0 donde la llave es el mes
    var balanceMensual = new Map();
    for (var i = 1; i <= 12; i++) {
        var key = "key" + i;
        balanceMensual.set(key, 0); 
    }

    //Leer la fecha del objeto y utilizarla para modificar la llave correspondiente en el mapa
    for (var i = 0; i < donaciones.length; i++) {
        var fecha = JSON.stringify(donaciones[i].fecha);
        var mes = parseInt(fecha.substring(6, 8));
        var key = "key" + mes;
        
        //actualizar el valor almacenado en esa llave del mapa
        var currentBalance = balanceMensual.get(key);
        balanceMensual.set(key, currentBalance + donaciones[i].monto);
    }
    return(balanceMensual);
};

//Exportar la funcion
module.exports = donacionesMensuales;