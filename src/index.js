const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const keys = require('./keys');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const sessionStore = new MySQLStore(keys.databaseSession);
const app = express();

app.use(session({
    secret: keys.keysession,
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}))


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



app.post('/api/user/logout', (req, res) => {
    sessionStore.destroy(req.body.session, () => {
        res.json("Cerró la sesión");
    });
});



app.get('/', (req, res) => {
    res.send("Bienvenidos a full-lip");
});

app.listen(app.get('port'), () => {
    console.log("el servidor esta en el puerto :" + app.get('port'));
});
