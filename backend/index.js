const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const authController = require('./app/controllers/AuthController');
const authService = require('./app/services/AuthService');
const conventionsController = require('./app/controllers/ConventionsController');
const claimsController = require('./app/controllers/ClaimsController');
const partnersController = require('./app/controllers/PartnersController');
const cors = require('cors');

const port = 3000


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());

app.post('/api/login', authController.login);

app.get('/api/:type/conventions', authService.authenticateToken, conventionsController.getAll);
app.get('/api/:type/conventions/:id/claim', authService.authenticateToken, conventionsController.claim);

app.get('/api/partners', authService.authenticateToken, partnersController.getAll);

app.get('/api/manager/claims/', authService.authenticateToken, claimsController.getAllForManager);

app.get('/api/:type/claims', authService.authenticateToken, claimsController.getAll);
app.delete('/api/:type/claims/:id', authService.authenticateToken, claimsController.unclaim);

app.get('/api/:type/claims/:id/:userId/confirm', authService.authenticateToken, claimsController.confirm);
app.delete('/api/:type/claims/:id/:userId', authService.authenticateToken, claimsController.remove);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

  
//   connection.end()