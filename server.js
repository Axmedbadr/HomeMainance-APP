const express = require('express');
const cors = require('cors');
const app = express();

// 1. Habaynta CORS (Nadiif ah)
const allowedOrigins = [
    'https://homemainance-app-production.up.railway.app', // Frontend-kaaga Railway
    'http://localhost:5173', // Local development (Vite)
    'http://localhost:3000'  // Local development (React)
];

app.use(cors({
    origin: function (origin, callback) {
        // Oggolow requests-ka aan lahayn origin (sida mobile apps ama curl)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'CORS policy ma oggola origin-kan.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes-kaaga caadiga ah
app.get('/api/users/provider/:id', (req, res) => {
    // Code-kaaga xogta soo saaraya...
    res.json({ message: "Xogta waa la helay!" });
});

const PORT = process.env.PORT || 5006;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));