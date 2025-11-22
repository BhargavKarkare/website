const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// const { Pool } = require('pg'); // Disabled for demo stability

// In-memory store for demo/fallback
const localUsers = [
    {
        id: 'demo-id',
        email: 'doctor@hospital.com',
        password_hash: '$2a$10$YourHashHere', // We'll handle demo login specifically
        full_name: 'Dr. Demo',
        role: 'doctor'
    }
];

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Pure In-Memory Login
        const user = localUsers.find(u => u.email === email);

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Verify Password
        let validPassword = false;
        // For the demo user:
        if (user.email === 'doctor@hospital.com' && password === 'demo123') validPassword = true;
        else validPassword = await bcrypt.compare(password, user.password_hash);

        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ token, user: { id: user.id, email: user.email, role: user.role, name: user.full_name } });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const register = async (req, res) => {
    const { email, password, fullName, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        // Check if exists
        if (localUsers.find(u => u.email === email)) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const user = {
            id: `local-${Date.now()}`,
            email,
            password_hash: hashedPassword,
            full_name: fullName,
            role: role || 'doctor'
        };
        localUsers.push(user);

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({ token, user: { id: user.id, email: user.email, role: user.role, name: user.full_name } });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { login, register };
