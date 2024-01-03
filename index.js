import express from 'express';
import morgan from 'morgan'
import cors from 'cors'
import RegisterationRoutes from './routes/registerationRoutes.js';

const app = express();
app.use(express.json());

app.use(morgan("dev"))
app.use(cors({
    origin: '*'
}))

app.use('/register',RegisterationRoutes)
export default app;