import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { checkAuth } from '../middlewares/checkAuthMiddleware.js';
import upload from '../middlewares/uploadImages.js'

class Api {
    constructor(app) {
        this.app = app;
    }

    static build() {
        const app = express();

        app.use(cors({
            origin: ['http://admin.localhost:3000', 'http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3000'],
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true 
        }));

        // Middleware para cookies
        app.use(cookieParser());

        // Middleware de debug
        app.use((req, res, next) => {
            console.log(`${req.method} ${req.url}`, req.body);
            next();
        });

        app.use(express.json());
        return new Api(app);
    }

    addPostRoute(path, handler, needMiddleware = true) {
        if (needMiddleware) {
            if (path.includes('addMember')) {
                this.app.post(path, upload.single('profile_pic', 1), handler);
            } else {
                this.app.post(path, checkAuth, handler);
            }
        } else {
            this.app.post(path, handler);
        }
    }

    addGetRoute(path, handler) {
        // this.app.get(path, checkAuth, handler);
         this.app.get(path, handler);
    }

    start(port, host = 'localhost') {
        this.app.listen(port, host, () => {
            console.log(`Server running on http://${host}:${port}`);
            console.log(`API URL: http://${host}:${port}`);
        });
    }
}

export default Api;