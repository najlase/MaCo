const authService = require('../services/AuthService');
const connection = require('../db-connection');

class AuthController {

    login(req, res) {
        const {email, password} = req.body;
        connection.query('SELECT personID as id, personTypeID as role, email, lastName, firstname, status from Person WHERE email = "' + email + '" AND password = "' + password + '"', function (err, rows, fields) {
            if (err) throw err
          
            if(rows && rows.length === 1 && rows[0].status === 1){
                const token = authService.generateAccessToken(JSON.stringify(rows[0]));
                res.send(JSON.stringify({token, userData: rows[0]}));
            }
            else {
                res.sendStatus(403);
            }
          });
    }

    register(req, res) {
        const {firstname, lastname, email, password} = req.body;
        connection.query(`INSERT INTO Person (personTypeID, lastName, firstName, email, password, status) VALUES (1,"${lastname}","${firstname}","${email}","${password}",1)`, function (err, rows, fields) {
            if (err) throw err
          });

        const token = authService.generateAccessToken(email);
        res.send(JSON.stringify({token}));
    }
}

module.exports = new AuthController();