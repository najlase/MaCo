const connection = require('../db-connection');

class ConventionsController{

    getAll(req, res){
        let reductionType = -1;
        let table = '';
        if (req.params.type === 'student'){
            reductionType = '2';
            table = 'StudentClaim';
        } else if (req.params.type === 'teacher'){
            reductionType = '1';
            table = 'TeacherClaim';
        }

        let userId = req.user.id;
        let query = `SELECT r.cID as id, description, startDate as start_date, EndDate as end_date, reduction, name as partner from Convention c, Reduction r, Partners p, RelatedTo rt
        WHERE r.cID = c.cID AND p.companyID = rt.companyid AND c.cID = rt.cID AND reductionTypeID = ${reductionType} AND NOT EXISTS (Select * from ${table} claim WHERE claim.cID = r.cID AND claim.personID = ${userId})`;

        connection.query(query, function (err, rows, fields) {
            if (err) throw err
          
            console.log(rows);
            res.send(rows);
          });
    }

    claim(req, res){
        
        let table = '';
        if (req.params.type === 'student'){
            table = 'StudentClaim';
        } else if (req.params.type === 'teacher'){
            table = 'TeacherClaim';
        }
    
        const cId = req.params.id;
        console.log(cId)
        connection.query('INSERT INTO `' + table + '` (`cId`, `personID`, `validated`) VALUES (' + cId + ', ' + req.user.id + ', 0)', function (err, rows, fields) {
            if (err) throw err
            res.status(201).send();
          });
    }

}

module.exports = new ConventionsController();