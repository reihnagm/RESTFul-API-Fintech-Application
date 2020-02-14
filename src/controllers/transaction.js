const moment = require('moment');
const config = require('../configs/configs');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const Balance = require('../models/Balance');
module.exports = {
    get_all: async (request, response) => {
        try {
            const data = await Transaction.get_history();
            response.json({ data });
        } catch (error) {
            console.log(error.message);
        }
    },
    store: async (request, response) => {
        const top_up_new = async (data) => {
            try {
                await Balance.top_up_new(data);
            } catch (error) {
                console.error(error.message);
            }
        }
        const top_up_update = async (data) => {
            try {
                await Balance.top_up_update(data);
            } catch (error) {
                console.error(error.message);
            }
        }
        const transfer_p2p_in = async (data) => {
            try {
                await Balance.transfer_p2p_in(data);
            } catch (error) {
                console.error(error.message);
            }
        }
        const transfer_p2p_out = async (data) => {
            try {
                await Balance.transfer_p2p_out(data);
            } catch (error) {
                console.error(error.message);
            }
        }
        const transfer_fee = async (data) => {
            try {
                await Balance.transfer_fee(data);
            } catch (error) {
                console.error(error.message);
            }
        }
        let get_amount, get_amount_with_code = [];
        let check_recipient, check_code = [];
        let current_amount, current_amount_with_code;
        try {
            check_recipient = await User.check_recipient(request.body.recipient);
            check_code = await Transaction.check_code(request.body.code);
            get_amount = await Balance.get_amount(request.body.recipient);
            if(request.body.code) {
                if(check_code.length === 0) {
                    return response.json('wrong code.');
                } else {
                    get_amount_with_code = await Balance.get_amount_with_code(request.body.code);
                }
            }
        } catch (error) {
            console.log(error.message);
        }
        if(get_amount.length !== 0) {
            current_amount = get_amount[0].amount.replace(/\D/g,'');
        }
        if(get_amount_with_code.length !== 0) {
            current_amount_with_code = get_amount_with_code[0].amount.replace(/\D/g,'');
        }
        const transaction = request.body.transaction;
        const date = new Date();
        let amount, code, data, recipient, result, convert_result, convert_result_without_symbol;
        switch (transaction) {
            case "Top Up":
                if(current_amount) {
                    result = parseInt(current_amount) + parseInt(request.body.amount);
                } else {
                    result = parseInt(request.body.amount);
                }
                code = `TOP${moment(new Date()).format('DDMMYY')}${Math.floor(Math.random()*(999-100+1)+100)}`;
                recipient = request.body.recipient;
                convert_result =  config.formatRupiah(result.toString(), '+', 'Rp');
                convert_result_without_symbol = config.formatRupiah(result.toString(),'','Rp');
                data = { amount: convert_result_without_symbol, code, recipient }
                if(check_recipient.length === 0) {
                    top_up_new(data);
                } else {
                    top_up_update(data);
                }
            break;
            case "Transfer Fee":
                if(parseInt(current_amount_with_code) <= parseInt(request.body.amount)) {
                    return response.json('your balance is not enough.');
                }
                result =  parseInt(current_amount_with_code) - parseInt(request.body.amount) - 50;
                code = `TRF${moment(new Date()).format('DDMMYY')}${Math.floor(Math.random()*(999-100+1)+100)}`;
                recipient = "Bank-In";
                convert_result = config.formatRupiah(result.toString(), '-', 'Rp');
                convert_result_without_symbol = config.formatRupiah(result.toString(),'','Rp');
                data = { amount: convert_result_without_symbol, code }
                transfer_fee(data);
            break;
            case "Transfer P2P (In)":
                if(current_amount) {
                    result = parseInt(current_amount) + parseInt(request.body.amount);
                } else {
                    result = parseInt(request.body.amount);
                }
                code = `TRI${moment(new Date()).format('DDMMYY')}${Math.floor(Math.random()*(999-100+1)+100)}`;
                recipient = request.body.recipient;
                convert_result =  config.formatRupiah(result.toString(), '+', 'Rp');
                convert_result_without_symbol = config.formatRupiah(result.toString(),'','Rp');
                data = { amount: convert_result_without_symbol, code, recipient }
                transfer_p2p_in(data);
            break;
            case "Transfer P2P (Out)":
                if(parseInt(current_amount) <= parseInt(request.body.amount)) {
                    return response.json('your balance is not enough.');
                }
                result = parseInt(current_amount) - parseInt(request.body.amount);
                code = `TRO${moment(new Date()).format('DDMMYY')}${Math.floor(Math.random()*(999-100+1)+100)}`;
                recipient = request.body.recipient;
                convert_result =  config.formatRupiah(result.toString(), '-', 'Rp');
                convert_result_without_symbol = config.formatRupiah(result.toString(),'','Rp');
                data = { amount: convert_result_without_symbol, code, recipient }
                transfer_p2p_out(data);
            default:
        }
        data = { transaction, code, date, amount: convert_result, recipient }
        try {
            await Transaction.insert_history(data);
            response.json('history created.');
        }  catch(error) {
            console.log(error.message);
            response.json('server error.');
        }
    },
}
