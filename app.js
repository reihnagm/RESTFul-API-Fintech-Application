const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const config = require('./src/configs/configs');
const port = config.port;
const routerNav = require('./src/index');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', routerNav);
app.listen(port, () => {
    console.log(`Server listening on PORT ${port}`);
});
module.exports = app;
