const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        res.status(403).json({
            success: false,
            message: 'No token provided.'
        });
    }

    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            return res.json({ success: false, message: 'Failed to authenticate token.' });
        }
        
        req.user = decoded;

        next();
    });
}