const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const AutoIncrement = require('mongoose-sequence')(mongoose);

//declarar esquema
let Schema = mongoose.Schema;

let rentaSchema = new Schema({

    customer_id: {
        type: Number,
        ref: 'Customer',
        required: [true, 'Porfavor ingresa el ID del cliente']
    },
    propiedad_id: {
        type: String,
        ref: 'listingsAndReviews',
        required: [true, 'Por favor ingrese el id de la Propiedad']
    },


    status: {
        type: Boolean,
        default: true
    }
});

//el esquema utilize el plugin
rentaSchema.plugin(AutoIncrement, { inc_field: 'renta_id' }, uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

//crea una coleccion
module.exports = mongoose.model('Renta', rentaSchema);