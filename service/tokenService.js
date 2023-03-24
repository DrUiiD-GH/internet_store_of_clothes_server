const jwt = require("jsonwebtoken");

class tokenService {
    generateJwt(id, email) {
        return jwt.sign(
            {id, email},
            process.env.SECRET_KEY,
            {expiresIn: '24h'}
        )

    }
}

module.exports = new tokenService()