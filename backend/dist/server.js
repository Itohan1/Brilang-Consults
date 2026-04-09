import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
dotenv.config();
const app = express();
const port = Number(process.env.PORT ?? 4000);
app.use(cors());
app.use(express.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
});
app.get('/api/landing', (_req, res) => {
    res.json({
        stats: {
            activeLearners: '25,000+',
            supportedLanguages: '40+',
            jobsPostedMonthly: '2,500+',
        },
        updates: [
            {
                title: 'New AI speaking coach',
                description: 'Practice real-life conversations with instant fluency feedback.',
            },
            {
                title: 'Verified enterprise gigs',
                description: 'Get access to trusted, high-value projects from global companies.',
            },
        ],
    });
});
app.listen(port, () => {
    console.log(`Backend API running on http://localhost:${port}`);
});
