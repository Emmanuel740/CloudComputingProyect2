const express = require('express');
const app = express();
app.use(require('./usuario'));
app.use(require('./renta'));
app.use(require('./propiedades'));

module.exports = app;