const express = require('express');
const Renta = require('../models/renta'); //subir nivel
const Customer = require('../models/usuario'); //subir nivel
const _ = require('underscore');
var MongoClient = require('mongodb').MongoClient;

const app = express();

app.post('/ConsultarRentas', (req, res) => {
    var url = "mongodb://localhost:27017";
    let body = req.body;
    let user = body.user;
    //let d = Number(id);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;

        var dbo = db.db("sample_airbnb");


        /*dbo.collection("rentas").aggregate([{
                $lookup: {
                    from: "customers",
                    localField: "customer_id",
                    foreignField: "id",
                    as: "customer"
                }
            },
            {
                $lookup: {
                    from: "listingsAndReviews",
                    localField: "propiedad_id",
                    foreignField: "_id",
                    as: "propiedad"
                }
            },
        ], { allowDiskUse: false }).toArray(function(err, result) {
            if (err) throw err;
            //console.log(result);
            let count = result.length;
            return res.status(200).json({
                ok: true,
                count,
                result
            });
        });*/
        dbo.collection("customers").find({ "firstName": user }).toArray(function(err, result) {
            if (err) throw err;
            console.log(result[0].id);
            let id = result[0].id

            dbo.collection("rentas").aggregate([{
                    $match: {

                        "customer_id": { $eq: id }

                    }
                },
                {
                    $lookup: {
                        from: "customers",
                        localField: "customer_id",
                        foreignField: "id",
                        as: "customer"
                    }
                },
                {
                    $lookup: {
                        from: "listingsAndReviews",
                        localField: "propiedad_id",
                        foreignField: "_id",
                        as: "propiedad"
                    }
                },
            ], { allowDiskUse: false }).toArray(function(err, result) {
                if (err) throw err;
                //console.log(result);
                let count = result.length;
                return res.status(200).json({
                    ok: true,
                    count,
                    result
                });
            });
        });



    });

});
/*app.post('/RegistrarRenta', (req, res) => {
    let body = req.body;
    let renta = new Renta({
        //para poder mandar los datos a la coleccion

        propiedad_id: body.propiedad,
        customer_id: body.customer

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
});*/

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

            /*return res.status(200).json({
                ok: true,
                customers
            });*/
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
});

module.exports = app;