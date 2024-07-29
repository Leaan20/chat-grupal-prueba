// Nuest ra instancia del socket del lado del front
console.log("funciona");

const socket = io();

// Variable para guardar el nombre del usuario

let user;

// identifica el parrafo con el chatBox.
const chatBox = document.querySelector("#chatBox");

// Utilizamos Sweet Alert para el mensaje de bienvenida

//Swal es un objeto  global que nos permite usar los metodos de la libreria.
// Fire , es el metodo para configurar el alerta.

Swal.fire({
    title: "Identifiquese",
    input : "text",
    text : "Ingresa un usuario para identificarte en el chat",
    // Validar el input en su value.
    inputValidator : (value) => {
        return !value && "Necesitas escribir un nombre para continuar";
    },
    // Para no poder salirse al clickear afuera
    allowOutsideClick: false,
}).then(result => {
    user = result.value;
});

// Funciona como una promesa , utilizamos el then , para que del valor resultante , podamos guardar el usuario.

// Evento.

chatBox.addEventListener("keyup", (event)=> {
    if(event.key === "Enter"){
        // Permite sacar los espacios en blanco del principio y del final.
        // Si el mensaje tiene mas de 0 caracteres, por lo menos 1, lo enviamos al backend
        if(chatBox.value.trim().length > 0){
            socket.emit("message",{user: user, message : chatBox.value});
            chatBox.value = "";
        }
    }
})


socket.on("messagesLogs", data => {
    const log = document.getElementById("messagesLogs"); 
    let messages = "";

    data.forEach( message => {
        messages = messages + `${message.user} dice ${message.message} <br>`;
    })
    log.innerHTML = messages; 
})