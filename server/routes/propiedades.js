const express = require('express');
const Renta = require('../models/renta'); //subir nivel
const Customer = require('../models/usuario'); //subir nivel
const _ = require('underscore');
var MongoClient = require('mongodb').MongoClient;

const app = express();


app.post('/ConsultarPropiedades', (req, res) => {
    var limite = req.body.limite;
    // let limit = limite.toInt();
    let limit = Number(limite);
    var url = "mongodb://localhost:27017";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("sample_airbnb");
        /*collection.find({}).toArray(function(err, docs) {
            assert.equal(err, null);
            console.log("Found the following records");
            console.log(docs)
            callback(docs);
        });*/

        //Find the first document in the customers collection:
        dbo.collection("listingsAndReviews").find({}).limit(limit).toArray(function(err, result) {
            if (err) throw err;
            //console.log(result);
            let count = result.length;
            return res.status(200).json({
                ok: true,
                count,
                result
            });
        });
        db.close();
    });
});

app.post('/ConsultarTipoPropiedades', (req, res) => {
    var tipo = req.body.tipo_propiedad;
    var limite = req.body.limite;

    //let limit = limite.toInt();
    let limit = Number(limite);
    var url = "mongodb://localhost:27017";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("sample_airbnb");

        //Find the first document in the customers collection:
        // db.listingsAndReviews.find({"property_type":"House"},{"property_type":1}).limit(10);

        dbo.collection("listingsAndReviews").find({ "property_type": tipo }, { "property_type": 1 }).limit(limit).toArray(function(err, result) {
            if (err) throw err;
            //console.log(result);
            let count = result.length;
            return res.status(200).json({
                ok: true,
                count,
                result
            });
        });
        db.close();
    });
});


app.post('/ConsultarPropiedadesPorPrecio', (req, res) => {
    var precio = req.body.precio;
    var limite = req.body.limite;

    //let limit = limite.toInt();
    let limit = Number(limite);
    let price = Number(precio);
    var url = "mongodb://localhost:27017";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("sample_airbnb");

        //Find the first document in the customers collection:
        // db.listingsAndReviews.find({"property_type":"House"},{"property_type":1}).limit(10);

        dbo.collection("listingsAndReviews").find({ "price": price }).limit(limit).toArray(function(err, result) {
            if (err) throw err;
            //console.log(result);
            let count = result.length;
            return res.status(200).json({
                ok: true,
                count,
                result
            });
        });
        db.close();
    });
});

/* renta.save((err, usrDB) => {
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
 });*/

/*
app.post('/RegistrarRenta', (req, res) => {
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
            let cliente = customers;
            console.log(cliente[0].id);
            let body = req.body;
            let renta = new Renta({
                //para poder mandar los datos a la coleccion

                propiedad_id: body.propiedad,
                customer_id: cliente[0].id

            });

            renta.save((err, usrDB) => {
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
});*/

module.exports = app;