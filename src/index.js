const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const keys = require('./keys');
const session = require('express-session');
const { sessionStore } = require('./middlewares/session');

const app = express();


app.use(session({
    secret: keys.keysession,
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));



app.set('port', process.env.PORT || 3006);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/api/user', require('./routes/userRoute'));
app.use('/api/advice', require('./routes/adviceRoute'));
app.use('/api/qa', require('./routes/qaRoute'));
app.use('/api/contact', require('./routes/contactRoute'));
app.use('/api/img-carrousell', require('./routes/imgCarrousellRoute'));
app.use('/api/img-in-products', require('./routes/imgInProductRoute'));
app.use('/api/customer', require('./routes/customerRoute'));
app.use('/api/rol', require('./routes/rolRoute'));


app.get('/', (req, res) => {
    res.send("Bienvenidos a full-lip");
});

app.listen(app.get('port'), () => {
    console.log("el servidor esta en el puerto :" + app.get('port'));
});
