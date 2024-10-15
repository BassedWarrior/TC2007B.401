const jwt = require("jsonwebtoken");  // Utilizado para mantener la sesión iniciada.


exports.generateJWT = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET,
                    { expiresIn: process.env.JWT_EXPIRATION_TIME });
};


exports.authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).send("No se proporcionó token");
    };

    jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: "Token inválido" });
        };

        req.user = decode;
        next();
    });
};
