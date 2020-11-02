module.exports = (sequelize, type) => {
    const ConfirmationResponse = sequelize.define('confirmation_response', {
        id_confirmation_response: {
            type: type.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        x_cust_id_cliente: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        x_ref_payco: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        x_id_factura: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        x_id_invoice: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        x_description: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        x_amount: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        x_amount_country: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        x_amount_ok: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        x_tax: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        x_amount_base: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        x_currency_code: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        x_bank_name: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        x_cardnumber: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        x_quotas: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        x_respuesta: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        x_response: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        x_approval_code: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        x_transaction_id: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        x_fecha_transaccion: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        x_transaction_date: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        x_cod_respuesta: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        x_cod_response: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        x_response_reason_text: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        x_errorcode: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        x_cod_transaction_state: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        x_transaction_state: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        x_franchise: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        x_business: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        x_customer_doctype: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        x_customer_document: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        x_customer_name: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        x_customer_lastname: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        x_customer_email: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        x_customer_phone: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        x_customer_movil: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        x_customer_ind_pais: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        x_customer_country: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        x_customer_city: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        x_customer_address: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        x_customer_ip: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        x_signature: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        x_test_request: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        x_extra1: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        x_extra2: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        x_extra3: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        x_extra4: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        x_extra5: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        x_extra6: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        x_extra7: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        x_extra8: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        x_extra9: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
        x_extra10: {
            type: type.STRING,
            allowNull: false,
            defaultValue: ''
        },
    }, {
        tableName: 'confirmation_response'
    });
    return ConfirmationResponse;
}