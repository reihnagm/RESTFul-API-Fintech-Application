require('dotenv/config');
module.exports = {
    database: {
        mysql: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        }
    },
    formatRupiah: (value, symbol = "", prefix) => {
	    let number_string = value.replace(/[^,\d]/g, '').toString(),
		split = number_string.split(','),
		sisa = split[0].length % 3,
		rupiah = split[0].substr(0, sisa),
		ribuan = split[0].substr(sisa).match(/\d{3}/gi);
		if(ribuan) {
			separator = sisa ? '.' : '';
			rupiah += separator + ribuan.join(',');
		}
		rupiah = split[1] != undefined ? rupiah + '.' + split[1] : rupiah;
		return prefix == undefined ? rupiah : (rupiah ? symbol +' '+ 'Rp' + rupiah : '');
    },
    port: process.env.PORT,
}
