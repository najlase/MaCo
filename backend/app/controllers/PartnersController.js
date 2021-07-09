const connection = require('../db-connection');

class PartnersController{

    getAll(req, res){
        connection.query('SELECT p.companyID as id, p.name, c.name as categories, logo from Partners p, has h, Category c WHERE p.companyID = h.companyid AND c.categoryID = h.CategoryID', function (err, rows, fields) {
            if (err) throw err

            rows.forEach(element => {
                element.categories = [element.categories];
            });
            res.send(rows);
          });
    }
}

module.exports = new PartnersController();