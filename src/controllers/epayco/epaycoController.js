const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { ConfirmationResponse, Order, OrderDetails, Shipping, Item } = require('../../database');
const moment = require('moment');
const { MailManager } = require('../../util/mail');

module.exports.confirmationPayment = async (req, res) => {
    const params = req.body;
    let currentTimestamp = moment().unix();
    let x_signature = params.x_signature;
    let xCurrencyCode = params.x_currency_code;
    //Información de envío
    let x_extra1 = params.x_extra1;
    let valid_json_dir = await IsValidJSONString(x_extra1);
    //let pShiping = await getShippingInfo(params, valid_json_dir);
    //Información del customer
    let x_extra2 = params.x_extra2;
    let valid_json_cust = await IsValidJSONString(x_extra2);
    //let pCustomeer = await getCustomerInfo(params, valid_json_cust);
    //Información del carrito de compras
    let x_extra3 = params.x_extra3;
    let valid_json_shopcart = await IsValidJSONString(x_extra3);

    let pShiping, pShoppingCart, pCustomerId = "";
    let pTotal = {};

    if (valid_json_cust) {
        console.log("Json válido customer");
        let jsonCustomerInfo = JSON.parse(x_extra2);
        pCustomerId = jsonCustomerInfo.customer_id;
    }

    if (valid_json_shopcart) {
        console.log("Json válido shopping cart");
        pShoppingCart = JSON.parse(x_extra3);
        pTotal = await getTotal(pShoppingCart);
    }

    // Datos de la dirección de envío
    if (valid_json_dir) {
        console.log("Json válido dirección");
        let jsonDirInfo = JSON.parse(x_extra1);
        pShiping = {
            address: jsonDirInfo.address,
            extra_address: jsonDirInfo.adicional,
            // extra_address: JSON.stringify(params),
            name: jsonDirInfo.name,
            lastname: jsonDirInfo.lastname,
            dni_id: jsonDirInfo.dni_id,
            country: "Colombia",
            city: jsonDirInfo.city,
            phone: jsonDirInfo.phone,
            agreed_date: moment(currentTimestamp * 1000).format("YYYY-MM-DD HH:mm:ss")
        };
    } else {
        pShiping = {
            address: params.x_customer_address,
            extra_address: "Json no válido",
            name: params.name,
            lastname: params.x_customer_name,
            dni_id: params.x_customer_document,
            country: "Colombia",
            city: params.x_customer_city,
            phone: params.x_customer_phone,
            agreed_date: moment(currentTimestamp * 1000).format("YYYY-MM-DD HH:mm:ss")
        };
    }

    let hash_signature = await hashPayment(params);

    let responsX, message, shipping, vinsertInfoPayment = "";
    let shippingInsert, order, orderInsert = "";
    let id_shipping, id_shopping, orderDetIns = "";

    if (hash_signature == x_signature) {
        responsX = "Firma verificada";
        let x_cod_response = parseInt(params.x_cod_response);
        switch (x_cod_response) {
            case 1:
                order = await validateInvoice(params);
                if (order === null) {
                    message = "transacción aceptada";
                    vinsertInfoPayment = await insertInfoPayment(params);
                    shippingInsert = await Shipping.create(pShiping).then(function (shipping) {
                        id_shipping = shipping.id_shipping;
                    });
                    orderInsert = await insertOrderPayment(params, pTotal.total_products, pTotal.total_value, id_shipping, pCustomerId).then(function (order) {
                        id_order = order.id_order
                    });
                    orderDetIns = await insertOrderDetailsPayment(pShoppingCart, id_order);
                    console.log(id_shipping);
                    console.log("id_shopping: " + id_order);
                }
                updateProduct(pShoppingCart);
                const mailManager = new MailManager();
                mailManager.sendMailSale();
                break;
            default:
                order = await validateInvoice(params);
                if (order === null) {
                    message = "transacción aceptada";
                    vinsertInfoPayment = await insertInfoPayment(params);
                    shippingInsert = await Shipping.create(pShiping).then(function (shipping) {
                        id_shipping = shipping.id_shipping;
                    });
                    orderInsert = await insertOrderPayment(params, pTotal.total_products, pTotal.total_value, id_shipping, pCustomerId).then(function (order) {
                        id_order = order.id_order
                    });
                    orderDetIns = await insertOrderDetailsPayment(pShoppingCart, id_order);
                    console.log(id_shipping);
                    console.log("id_shopping: " + id_order);
                }
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

function getTotal(data) {
    let jsonTotal = {};
    let total = 0;
    let totalProducts = 0;
    data.forEach(element => {
        let subTotal = parseFloat(element['quantity']) * parseFloat(element['price']);
        totalProducts += parseFloat(element['quantity']);
        total += subTotal;
    });
    jsonTotal.total_value = total;
    jsonTotal.total_products = totalProducts;
    return jsonTotal;
}

function IsValidJSONString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function insertInfoPayment(params) {
    return ConfirmationResponse.create(params);
}

function insertOrderPayment(params, totalProducts, totalValue, idShipping, idCustomer) {
    let x_invoice = params.x_id_invoice;
    let x_response = params.x_response;
    let x_cod_response = params.x_cod_response;
    let order = {
        order_code: x_invoice,
        total_products: totalProducts,
        total_value: totalValue,
        status: x_response,
        status_code: x_cod_response,
        id_shipping: idShipping,
        id_customer: idCustomer,
    };
    return Order.create(order);
}

function insertOrderDetailsPayment(dShoppingCart, id_order) {
    dShoppingCart.forEach(item => {
        let orderDetails = {
            quantity: parseFloat(item['quantity']),
            value: parseFloat(item['price']) * parseFloat(item['quantity']),
            id_order: id_order,
            id_item: item['id']
        };
        let orderDetailsIns = OrderDetails.create(orderDetails);
    });
}

function getCustomerInfo(params, json_validated) {
    if (json_validated) {
        let jsonCustomerInfo = JSON.parse(params.x_extra2);
        return jsonCustomerInfo;
    } else {
        return null;
    }
}

function getShippingInfo(params, json_validated) {
    if (json_validated) {
        let jsonDirInfo = JSON.parse(params.x_extra1);
        return {
            address: jsonDirInfo.address,
            extra_address: jsonDirInfo.adicional,
            name: jsonDirInfo.name,
            lastname: jsonDirInfo.lastname,
            dni_id: jsonDirInfo.dni_id,
            country: "Colombia",
            city: jsonDirInfo.city,
            phone: jsonDirInfo.phone,
            agreed_date: moment(currentTimestamp * 1000).format("YYYY-MM-DD HH:mm:ss")
        };
    } else {
        return {
            address: params.x_customer_address,
            extra_address: "Json no válido",
            name: params.name,
            lastname: params.x_customer_name,
            dni_id: params.x_customer_document,
            country: "Colombia",
            city: params.x_customer_city,
            phone: params.x_customer_phone,
            agreed_date: moment(currentTimestamp * 1000).format("YYYY-MM-DD HH:mm:ss")
        };
    }
}

async function validateInvoice(params) {
    let order = await Order.findOne({ where: { order_code: params.x_id_invoice } });
    if (order) {
        const [numberOfAffectedRows, affectedRows] = await Order.update({ status_code: params.x_cod_response, status: params.x_response }, {
            where: { order_code: params.x_id_invoice },
            returning: true
        })
    }
    return order;
}

async function updateProduct(dShoppingCart) {
    const items = await Item.findAll();
    for (let i = 0; i < dShoppingCart.length; i++) {
        for (let j = 0; j < items.length; j++) {
            if (dShoppingCart[i].id === items[j].dataValues.id_item) {
                const [numberOfAffectedRows, affectedRows] = await Item.update({ stock: parseInt(items[j].dataValues.stock) - parseInt(dShoppingCart[i].quantity) }, {
                    where: { id_item: items[j].dataValues.id_item },
                    returning: true
                })
            }
        }
    }
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
    let response = "";
    try {
        nonExistentFunction();
    } catch (error) {
        response += "Mal"
        console.error(error);
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
    }
    let id_d = "";
    let x_insert = await ConfirmationResponse.create({ x_cust_id_cliente: "12233333333" }).then(function (confirmation_response) {
        console.log(confirmation_response.id_confirmation_response);
        id_d = confirmation_response.id_confirmation_response;
    });;

    const momDate = moment(currentTimestamp * 1000).format("YYYY-MM-DD HH:mm:ss");
    // const hash_signature = await hashPayment(object);
    res.json({ 'hash': momDate, responseQ: id_d });
}

module.exports.pruebajson = async (req, res) => {
    let object = {};

}