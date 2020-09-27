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



app.set('port', 8005);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/api/user', require('./src/routes/userRoute'));
app.use('/api/advice', require('./src/routes/adviceRoute'));
app.use('/api/qa', require('./src/routes/qaRoute'));
app.use('/api/contact', require('./src/routes/contactRoute'));
app.use('/api/img-carrousell', require('./src/routes/imgCarrousellRoute'));
app.use('/api/img-in-products', require('./src/routes/imgInProductRoute'));
app.use('/api/customer', require('./src/routes/customerRoute'));
app.use('/api/rol', require('./src/routes/rolRoute'));
app.use('/api/video', require('./src/routes/videoRoute'));


app.get('/', (req, res) => {
    res.send("Bienvenidos a full-lip");
});

app.listen(app.get('port'), () => {
    console.log("el servidor esta en el puerto :" + app.get('port'));
});
