const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const AutoIncrement = require('mongoose-sequence')(mongoose);

//declarar esquema
let Schema = mongoose.Schema;

let customerSchema = new Schema({

    firstName: {
        type: String,
        required: [true, 'Por favor ingresa el nombre de usuario']
    },
    lastName: {
        type: String,
        required: [true, 'Por favor ingrese su Nombre']
    },
    address: {
        type: String,
        required: [true, 'Por favor ingresa su Direccion']
    },
    city: {
        type: String,
        required: [true, 'Por favor ingresa la fecha de nacimiento']
    },
    country: {
        type: String,
        required: [true, 'Por favor ingresa Su Pais']
    },

    district: {
        type: String,
        required: [true, 'Por favor ingresa Su Distrito']

    },
    status: {
        type: Boolean,
        default: true
    }
});

//el esquema utilize el plugin
customerSchema.plugin(AutoIncrement, { inc_field: 'id' }, uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

//crea una coleccion
module.exports = mongoose.model('Customer', customerSchema);