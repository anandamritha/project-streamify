const mysql = require('mysql2');

//create a conncetion
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Aami@1992',
    port:3306,
    database:'phase1_ui_designing'
});

//connect to database
connection.connect((err) => {
    if(err){
        console.error('Error Connecting to MYSQL server ' + err);
        return;
    }
    console.log('Connected');
})

//export default connection;
module.exports = connection; //in CommonJS