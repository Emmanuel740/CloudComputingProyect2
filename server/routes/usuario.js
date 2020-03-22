const express = require('express');
const Customer = require('../models/usuario'); //subir nivel
const _ = require('underscore');
//const bcrypt = require('bcrypt');
//const _ = require('underscore');
//const { verificaToken } = require('../middlewares/autentificacion');
//const Usuario = require('../models/usuario'); //subir nivel
const app = express();

//GET

app.post('/GetcustomerName', (req, res) => {
    let user = req.body.user;
    console.log(user);
    Customer.find({ $and: [{ firstName: user }, { status: true }] })
        .exec((err, customers) => { //ejecuta la funcion
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            return res.status(200).json({
                ok: true,
                customers
            });
        });
});


app.post('/Getcustomerid', (req, res) => {
    let id = req.body.id;
    console.log(id);
    Customer.find({ $and: [{ id: id }, { status: true }] }) //select * from usuario where estado=true
        .exec((err, customers) => { //ejecuta la funcion
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            return res.status(200).json({
                ok: true,
                customers
            });
        });
});

app.post('/GetcustomerCountry', (req, res) => {
    let country = req.body.country;
    console.log(country);
    Customer.find({ $and: [{ country: country }, { status: true }] }) //select * from usuario where estado=true
        .exec((err, customers) => { //ejecuta la funcion
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            return res.status(200).json({
                ok: true,
                customers
            });
        });
});

app.post('/Registrarcustomer', (req, res) => {
    let body = req.body;
    let usuario = new Customer({
        //para poder mandar los datos a la coleccion

        firstName: body.firstName,
        lastName: body.lastName,
        address: body.address,
        city: body.city,
        country: body.country,
        district: body.district
    });

    usuario.save((err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            usrDB
        });
    });
});


app.put('/Updatecustomer', (req, res) => {
    let id = req.body.id;
    let body = _.pick(req.body, ['firstName', 'lastName', 'address', 'city', 'country', 'district']); //FILTRAR del body, on el pick seleccionar los campos que interesan del body 
    //id 'su coleccion, new -> si no existe lo inserta, runVali-> sirve para validar todas las condiciones del modelo 
    Customer.findOneAndUpdate({ id: id }, body, { new: true, runValidators: true, context: 'query' }, (err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            usrDB
        });

    });
});

app.delete('/DeleteCustomerid', (req, res) => {
    let id = req.body.id;

    Customer.findOneAndUpdate({ id: id }, { status: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            resp

        });

    });

});

app.delete('/DeleteCustomerName', (req, res) => {
    let firstName = req.body.firstName;

    Customer.findOneAndUpdate({ firstName: firstName }, { status: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            resp

        });

    });

});

module.exports = app;