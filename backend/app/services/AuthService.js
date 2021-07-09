const jwt = require("jsonwebtoken");

const TOKEN_SECRET = 'a49460dbe6780674d4748611fb2a6021f43e69d868255a6876116b824c12eb508d0167e01407b60b42e7912d5f8c334a05a0ea2a2587a51fbb7d62b242787c39';

class AuthService {

    authenticateToken(req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) return res.sendStatus(401);
      
        jwt.verify(token, TOKEN_SECRET, (err, user) => {
          if (err) return res.sendStatus(403);
          req.user = user;
          next();
        })
    }

    generateAccessToken(email) {
        return jwt.sign(email, TOKEN_SECRET);
    }
}

module.exports = new AuthService();