const connection = require('../configs/db');
module.exports = {
    top_up_new: (data) => {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO
                main_balances
                (amount, code, recipient)
                VALUES
                ('${data.amount}', '${data.code}', '${data.recipient}')`, (error, result) => {
                if (error) {
                    reject(new Error(error));
                } else {
                    resolve(result);
                }
            });
        });
    },
    top_up_update: (data) => {
        return new Promise((resolve, reject) => {
            connection.query(`
                UPDATE main_balances
                SET
                amount = '${data.amount}',
                code = '${data.code}',
                recipient = '${data.recipient}'`, (error, result) => {
                if (error) {
                    reject(new Error(error));
                } else {
                    resolve(result);
                }
            });
        });
    },
    transfer_fee: (data) => {
        return new Promise((resolve, reject) => {
            connection.query(`
                UPDATE main_balances
                SET
                amount = '${data.amount}',
                code = '${data.code}'`, (error, result) => {
                if (error) {
                    reject(new Error(error));
                } else {
                    resolve(result);
                }
            });
        });
    },
    transfer_p2p_in: (data) => {
        return new Promise((resolve, reject) => {
            connection.query(`
                UPDATE main_balances
                SET
                amount = '${data.amount}',
                code = '${data.code}',
                recipient = '${data.recipient}'`, (error, result) => {
                if (error) {
                    reject(new Error(error));
                } else {
                    resolve(result);
                }
            });
        });
    },
    transfer_p2p_out: (data) => {
        return new Promise((resolve, reject) => {
            connection.query(`
                UPDATE main_balances
                SET
                amount = '${data.amount}',
                code = '${data.code}',
                recipient = '${data.recipient}'`, (error, result) => {
                if (error) {
                    reject(new Error(error));
                } else {
                    resolve(result);
                }
            });
        });
    },
    get_amount: (recipient) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT amount FROM main_balances WHERE recipient = '${recipient}'`, (error, result) => {
                if (error) {
                    reject(new Error(error));
                } else {
                    resolve(result);
                }
            });
        });
    },
    get_amount_with_code: (code) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT amount FROM main_balances WHERE code = '${code}'`, (error, result) => {
                if (error) {
                    reject(new Error(error));
                } else {
                    resolve(result);
                }
            });
        });
    }
}
