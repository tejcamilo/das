import express, { json } from "express";
import bodyParser from 'body-parser';
//import citasRoutes from './routes/citasRoutes.js';
//import setUsuariosRoutes from './routes/usuariosRoutes.js';
import { connectDB } from "./config/database.js";
import  * as citasController from "./controllers/citasController.js";
import * as usuariosController from "./controllers/usuariosController.js";
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const server = express();
const PORT = process.env.PORT || 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));

connectDB().then(() => {  }).catch((error) => {
    console.log(error);
});



server.set('view engine', 'ejs');
server.use(express.urlencoded({ extended: true }));
server.use(express.static('src/assets')); 
server.use(json());
server.set('views', join(__dirname, 'views'));

server.get('/citas', citasController.index);
server.get('/citas/agendar', citasController.agendarCitas);
server.get('/citas/consultar', citasController.consultarCitas);
server.post('/citas/agendar', citasController.updateCita);
server.post('/citas/reagendar', citasController.reagendarCita);
server.post('/citas/consultar', citasController.cancelarCita);
server.post('/citas/reprogramar', citasController.reagendarCita);

//server.use('/citas', citasRoutes);
//server.use('/usuarios', usuariosRoutes);

server.set('view engine', 'ejs');
//server.set('views', join(__dirname, 'views'));

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
