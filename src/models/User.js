const connection = require('../configs/db')
module.exports = {
    check_recipient: (recipient) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT recipient FROM main_balances WHERE recipient = '${recipient}'`, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    }
}
