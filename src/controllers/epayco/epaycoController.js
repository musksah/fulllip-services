const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { Shipping } = require('../../database');
const { ConfirmationResponse } = require('../../database');
const moment = require('moment');

module.exports.confirmationPayment = async (req, res) => {
    const params = req.body;
    let currentTimestamp = moment().unix();
    let x_ref_payco = params.x_ref_payco;
    let x_transaction_id = params.x_transaction_id;
    let x_amount = params.x_amount;
    let x_currency_code = params.x_currency_code;
    let x_signature = params.x_signature;

    let strParms = JSON.stringify(params)

    let hash_signature = await hashPayment(params);

    let responsX, message, shipping, vinsertInfoPayment = "";

    let pShiping = {
        address: params.x_customer_address,
        extra_address:  "",
        name: params.x_customer_name,
        lastname: params.x_customer_lastname,
        dni_id: params.x_customer_document,
        country: params.x_customer_country,
        city: params.x_customer_city,
        phone: params.x_customer_movil,
        agreed_date: moment(currentTimestamp*1000).format("YYYY-MM-DD HH:mm:ss"),
        extra_address: strParms
    };

    let x_response = params.x_response;
    let x_motivo = params.x_response_reason_text;
    let x_id_invoice = params.x_id_invoice;
    let x_approval_code = params.x_approval_code;

    if (hash_signature == x_signature) {
        responsX = "Firma verificada";
        let x_cod_response = parseInt(params.x_cod_response);
        switch (x_cod_response) {
            case 1:
                message = "transacción aceptada";
                pShiping.lastname = "Aceptado";
                vinsertInfoPayment = await insertInfoPayment(params);
                shipping = await Shipping.create(pShiping);
                break;
            case 2:
                message = "transacción rechazada";
                vinsertInfoPayment = await insertInfoPayment(params);
                pShiping.lastname = "Rechazada";
                shipping = await Shipping.create(pShiping);
                break;
            case 3:
                message = "transacción pendiente";
                vinsertInfoPayment = await insertInfoPayment(params);
                pShiping.lastname = "Pendiente";
                shipping = await Shipping.create(pShiping);
                break;
            case 4:
                message = "transacción fallida";
                vinsertInfoPayment = await insertInfoPayment(params);
                pShiping.lastname = "Fallida";
                shipping = await Shipping.create(pShiping);
                break;
            default:
                message = "Opción no valida";
                vinsertInfoPayment = await insertInfoPayment(params);
                pShiping.lastname = "No valida";
                shippingn = await Shipping.create(pShiping);
                break;
        }
    } else {
        responsX = "La firma no pudo ser verificada";
    }

    let data =
    {
        "x_cust_id_cliente": "488979",
        "x_ref_payco": "32217071",
        "x_id_factura": "F12333",
        "x_id_invoice": "F12333",
        "x_description": "Cantidad undefined productos",
        "x_amount": "5000",
        "x_amount_country": "5000",
        "x_amount_ok": "5000",
        "x_tax": "0",
        "x_amount_base": "0",
        "x_currency_code": "COP",
        "x_bank_name": "Banco de Pruebas",
        "x_cardnumber": "457562*******0326",
        "x_quotas": "1",
        "x_respuesta": "Aceptada",
        "x_response": "Aceptada",
        "x_approval_code": "000000",
        "x_transaction_id": "32217071",
        "x_fecha_transaccion": "2020-11-01 20:20:13",
        "x_transaction_date": "2020-11-01 20:20:13",
        "x_cod_respuesta": "1",
        "x_cod_response": "1",
        "x_response_reason_text": "00-Aprobada",
        "x_errorcode": "00",
        "x_cod_transaction_state": "1",
        "x_transaction_state": "Aceptada",
        "x_franchise": "VS",
        "x_business": "GLORIA  GRACIA",
        "x_customer_doctype": "CC",
        "x_customer_document": "123123123",
        "x_customer_name": "Pruebas",
        "x_customer_lastname": "epayco",
        "x_customer_email": "xsebastianhrodriguezx@gmail.com",
        "x_customer_phone": "0000000",
        "x_customer_movil": "3024682891",
        "x_customer_ind_pais": "57",
        "x_customer_country": "CO",
        "x_customer_city": "fbbbb",
        "x_customer_address": "123ddd  sdd",
        "x_customer_ip": "186.112.31.125",
        "x_signature": "dd16a416d1b797ea53e737187ea4e739a852a09d18e2b82c7f5ca87cba58b1f0",
        "x_test_request": "TRUE",
        "x_extra1": "",
        "x_extra2": "",
        "x_extra3": "",
        "x_extra4": "",
        "x_extra5": "",
        "x_extra6": "",
        "x_extra7": "",
        "x_extra8": "",
        "x_extra9": "",
        "x_extra10": ""
    };

    res.json({ 'data': message, currency: xCurrencyCode });
}

function insertInfoPayment(params) {
    // let data = {
    //     x_cust_id_cliente: "488979"
    // };
    return ConfirmationResponse.create(params);
}

function hashPayment(params) {
    //Config
    let p_cust_id_cliente = "488979";
    let p_key = "8f10f973a83342f4e06e7a0207885f5f1919c1b7";
    let hash_string = `${p_cust_id_cliente}^${p_key}^${params.x_ref_payco}^${params.x_transaction_id}^${params.x_amount}^${params.x_currency_code}`;
    return crypto.createHash('sha256').update(hash_string).digest('hex');
}

module.exports.pruebaHash = async (req, res) => {
    let object = {};
    // const infoP = await insertInfoPayment(object);
    let currentTimestamp = moment().unix();
    const momDate = moment(currentTimestamp*1000).format("YYYY-MM-DD HH:mm:ss");
    // const hash_signature = await hashPayment(object);
    res.json({ 'hash': momDate });
}