const connection = require('../db-connection');

class ClaimsController{

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
    
        connection.query('SELECT r.cID as id, description, startDate as start_date, EndDate as end_date, reduction, name as partner, cl.validated from ' + table + ' cl, Convention c, Reduction r, Partners p, RelatedTo rt WHERE cl.cID = r.cID AND r.cID = c.cID AND p.companyID = rt.companyid AND c.cID = rt.cID AND reductionTypeID = ' + reductionType + ' AND cl.personID = ' + req.user.id, function (err, rows, fields) {
            if (err) throw err
          
            console.log(rows);
            res.send(rows);
          });
    }

    unclaim(req, res){
        
        let table = '';
        if (req.params.type === 'student'){
            table = 'StudentClaim';
        } else if (req.params.type === 'teacher'){
            table = 'TeacherClaim';
        }
    
        const cId = req.params.id;
        console.log(cId)
        connection.query('Delete from `' + table + '` WHERE cId = ' + cId + ' AND personID = ' + req.user.id, function (err, rows, fields) {
            if (err) throw err
            res.status(201).send();
          });
    }

    getAllForManager(req, res){
        connection.query(`SELECT per.personID, per.firstName, per.lastName, r.cID as id, description, startDate as start_date, EndDate as end_date, reduction, name as partner, scl.validated from StudentClaim scl, Person per, Convention c, Reduction r, Partners p, RelatedTo rt WHERE scl.cID = r.cID AND r.cID = c.cID AND p.companyID = rt.companyid AND c.cID = rt.cID AND per.personID = scl.personID AND reductionTypeID = 2`,
        function (err, rows, fields) {
            if (err) throw err;
          
            console.log(rows);
            res.send(rows);
          });
    }

    confirm(req, res){
        
        let table = '';
        if (req.params.type === 'student'){
            table = 'StudentClaim';
        } else if (req.params.type === 'teacher'){
            table = 'TeacherClaim';
        }

        let userId = req.params.userId;
    
        const cId = req.params.id;
        console.log(cId);
        connection.query('Update `' + table + '` SET validated = 1 WHERE cId = ' + cId + ' AND personID = ' + userId, function (err, rows, fields) {
            if (err) throw err;
            res.status(200).send();
          });
    }

    remove(req, res){
        
        let table = '';
        if (req.params.type === 'student'){
            table = 'StudentClaim';
        } else if (req.params.type === 'teacher'){
            table = 'TeacherClaim';
        }

        let userId = req.params.userId;
    
        const cId = req.params.id;
        console.log(cId);
        connection.query('Delete FROM `' + table + '` WHERE cId = ' + cId + ' AND personID = ' + userId, function (err, rows, fields) {
            if (err) throw err;
            res.status(200).send();
          });
    }
}

module.exports = new ClaimsController();