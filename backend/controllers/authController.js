const db = require("../config/db");

// LOGIN FUNCTION
const login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    // Check user in database
    const sql = "SELECT * FROM employees WHERE email = ? AND password = ?";

    db.query(sql, [email, password], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Database error",
                error: err
            });
        }

        if (result.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const user = result[0];

        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user.id,
                name: user.first_name,
                email: user.email,
                role: user.role
            }
        });
    });
};

module.exports = { login };