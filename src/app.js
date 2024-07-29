// Chat Comunitario
import express from "express";
// Solo traemos el metodo engine
import { engine } from "express-handlebars";
import { Server } from "socket.io"
const app = express();
const PORT = 8080;


// middleware
app.use(express.json());
// reemplaza lo que hacia el body parse.
app.use(express.urlencoded({extended:true}));
// los archivos publicos
app.use(express.static("./src/public"));


// handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.get("/" , (req,res) => {
    res.render("index");
});

// Listen
const httpServer = app.listen(PORT, ()=> {
    console.log(`Escuchando en el http://localhost:${PORT}`);
});

// Una referencia del servidor

// Creamos un array para el historial de mensajes
let messages = [];

// Generamos una instancia de Socket.io del lado del backend.

const io = new Server(httpServer);

// Lado del backend escuchando con socket.

io.on("connection", (socket) => {
    console.log("Nuevo usuario conectado");

    socket.on("message", (data) => {
        messages.push(data);
        
        //Emitimos mensaje para el lciente con todo el array de datos: 
        io.emit("messagesLogs", messages); 
    })

})
