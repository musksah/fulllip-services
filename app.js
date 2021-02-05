const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const keys = require('./src/keys');
const session = require('express-session');
const { sessionStore } = require('./src/middlewares/session');

const app = express();


app.use(session({
    secret: keys.keysession,
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
 

app.set('port', 8005);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/api/user', require('./src/routes/userRoute'));
app.use('/api/advice', require('./src/routes/adviceRoute'));
app.use('/api/qa', require('./src/routes/qaRoute'));
app.use('/api/img-carrousell', require('./src/routes/imgCarrousellRoute'));
app.use('/api/img-in-products', require('./src/routes/imgInProductRoute'));
app.use('/api/customer', require('./src/routes/customerRoute'));
app.use('/api/rol', require('./src/routes/rolRoute'));
app.use('/api/video', require('./src/routes/videoRoute'));
app.use('/api/item', require('./src/routes/itemRoute'));
app.use('/api/email', require('./src/routes/emailRoute'));
app.use('/api/epayco', require('./src/routes/epaycoRoute'));
app.use('/api/order', require('./src/routes/orderRoute'));
app.use('/api/donation', require('./src/routes/donationRoute'));
app.use('/api/settings', require('./src/routes/settingsRoute'));


app.get('/', (req, res) => {
    res.send("Bienvenido a los servicios de Fullip");
});

app.listen(app.get('port'), () => {
    console.log("el servidor esta en el puerto :" + app.get('port'));
});
