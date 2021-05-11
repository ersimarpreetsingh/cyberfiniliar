import express, { Application } from 'express';
import * as path from 'path';
import * as fs from 'fs';

class App {
    public app: Application;
    public port: number;

    constructor(appInit: { port: number; middlewares: any; controllers: any; }) {
        this.app = express();
        this.port = appInit.port;

        this.middlewares(appInit.middlewares);
        this.routes(appInit.controllers);
        this.assets();
    }


    private middlewares(middlewares: { forEach: (arg0: (middleware: any) => void) => void; }): void {
        middlewares.forEach(middleware => {
            this.app.use(middleware);
        });
    }

    private routes(controllers: { forEach: (arg0: (controller: any) => void) => void; }): void {
        controllers.forEach(controller => {
            this.app.use(controller.path, controller.router);
        });
    }

    private assets(): void {
        if (!fs.existsSync(path.join(__dirname, 'public'))) {
            fs.mkdirSync(path.join(__dirname, 'public'));
        } else if (!fs.existsSync(path.join(__dirname, 'public', 'images'))) {
            fs.mkdirSync(path.join(__dirname, 'public', 'images'));
        }
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use('/', express.static(path.join(__dirname, 'finiliar')));
        this.app.use((req, res, next) => {
            res.sendFile(path.join(__dirname, 'finiliar', 'index.html'));
        });
    }

    public listen(): void {
        this.app.listen(process.env.PORT || this.port, () => {
            console.log(`App listening on the http://localhost:${this.port}`);
        });
    }
}

export default App;
