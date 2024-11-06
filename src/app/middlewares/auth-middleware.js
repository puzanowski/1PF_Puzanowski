const fs = require('fs');
const path = require('path');

function generateRandomToken(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
        token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
}

module.exports = (req, res, next) => {
    if (req.method === 'POST' && req.path === '/auth/login') {
        const { username, password } = req.body;
        const dbPath = path.join(__dirname, '../data/db.json');
        const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

        const user = db.users.find(
            user => user.username === username && user.password == password
        );

        if (user) {
            res.status(200).json({
                id: user.id,
                username: user.username,
                role: user.role,
                token: generateRandomToken(16)
            });
        } else {
            res.status(401).json({ success: false, message: 'Usuario o contraseña inválidos.' });
        }
    } else {
        next();
    }
};
