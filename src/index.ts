import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import characterRouter from './router/character.router';
import { initSchema } from './database/schema';

dotenv.config();
initSchema();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rutas
app.use('/api/characters', characterRouter);

app.get('/', (req: Request, res: Response) => {
    res.send(`Server is running on port ${PORT}`);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


