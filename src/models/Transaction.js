const connection = require('../configs/db');
module.exports = {
    get_history: () => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT a.transaction AS Transaction, a.code AS Code, a.date AS Date, a.amount AS Amount, b.PhoneNumber AS Recipient
                FROM transaction_histories a
                INNER JOIN users b ON a.recipient = b.PhoneNumber`, (error, result) => {
                if (error) {
                    reject(new Error(error));
                } else {
                    resolve(result);
                }
            });
        });
    },
    insert_history: (data) => {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO transaction_histories SET ?`, data, (error, result) => {
                if (error) {
                    reject(new Error(error));
                } else {
                    resolve(result);
                }
            });
        });
    },
    check_code: (code) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT code FROM main_balances WHERE code = '${code}'`, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            });
        });
    }
}
