const crypto = require('crypto');


module.exports.confirmationPayment = (req, res) => {
    const cust_id_cliente = "AJK12312312";
    const p_key = "AJK12312312";

    const params = req.body;
    let x_ref_payco = params.x_ref_payco;
    let x_transaction_id = params.x_transaction_id;
    let x_amount = params.x_amount;
    let x_currency_code = params.x_currency_code;
    let x_signature = params.x_signature;
    let hash_string = `${cust_id_cliente}^${p_key}^${x_ref_payco}^${x_transaction_id}^${x_amount}^${x_currency_code}`;
    const hash_signature = crypto.createHash('sha256').update(hash_string).digest('base64');

    let x_response = params.x_response;
    let x_motivo = params.x_response_reason_text;
    let x_id_invoice = params.x_id_invoice;
    let x_approval_code = params.x_approval_code;

    let responsX, message = "";
    if(x_signature == hash_signature){
        let x_cod_response = params.x_cod_response;
        switch (x_cod_response) {
            case 1:
                message = "transacción aceptada";
                console.log("transacción aceptada");
                break;   
            case 2:
                message = "transacción rechazada";
                console.log("transacción rechazada");
                break;   
            case 3:
                message = "transacción pendiente";
                console.log("transacción pendiente");
                break;   
            case 4:
                message = "transacción fallida";
                console.log("transacción fallida");
                break;   
            default:
                message = "Opción no valida";
                console.log("transacción fallida");
                break;   
        }
        responsX+="Son iguales";
    }else{
        responsX+="Paila";
    }


    
    // $p_cust_id_cliente = '';
    // $p_key             = '';
    
    // $x_ref_payco      = $_REQUEST['x_ref_payco'];
    // $x_transaction_id = $_REQUEST['x_transaction_id'];
    // $x_amount         = $_REQUEST['x_amount'];
    // $x_currency_code  = $_REQUEST['x_currency_code'];
    // $x_signature      = $_REQUEST['x_signature'];
    
    
    // $signature = hash('sha256', $p_cust_id_cliente . '^' . $p_key . '^' . $x_ref_payco . '^' . $x_transaction_id . '^' . $x_amount . '^' . $x_currency_code);
    
    // $x_response     = $_REQUEST['x_response'];
    // $x_motivo       = $_REQUEST['x_response_reason_text'];
    // $x_id_invoice   = $_REQUEST['x_id_invoice'];
    // $x_autorizacion = $_REQUEST['x_approval_code'];
    
    //  //Validamos la firma
    // if ($x_signature == $signature) {
    
    //  /*Si la firma esta bien podemos verificar los estado de la transacción*/
    
    //   $x_cod_response = $_REQUEST['x_cod_response'];
    
    //  switch ((int) $x_cod_response) {
    
    //  case 1:
    //   # code transacción aceptada
    //  //echo 'transacción aceptada';
    // break;
    
    // case 2:
    //   # code transacción rechazada
    // //echo 'transacción rechazada';
    //   break;
    
    // case 3:
    //  # code transacción pendiente
    // //echo 'transacción pendiente';
    // break;
    
    // case 4:
    // # code transacción fallida
    // //echo 'transacción fallida';
    // break;
    
    
    //  }
    
    // } else {
    
    // die('Firma no valida');
    
    // }   
    // res.json(params);
    res.json({'data':message});
} 