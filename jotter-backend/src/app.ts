import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { UserRoutes } from './modules/user/user.routes';
import { AuthRoutes } from './modules/auth/auth.routes';
import { FileRoutes } from './modules/file/file.routes';
import { FolderRoutes } from './modules/folder/folder.routes';
import passport from "passport";
import "./config/passport";
import { resetDatabase } from './modules/system/system.controller';

const app: Application = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173", 
    credentials: true,
}));

app.use(passport.initialize())

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Jotter Backend is Running 🚀' });
});

// --- Application Routes ---
app.use('/', UserRoutes);
app.use('/', AuthRoutes);
app.use('/',FileRoutes);
app.use('/', FolderRoutes);
app.get('/resetDB', resetDatabase); 


// 404 Not Found Handler
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        statusCode: 404,
        message: 'Route not found',
    });
});


app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        statusCode,
        message,
    });
});

export default app;