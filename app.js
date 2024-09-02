const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];


// READ
// leer todos los usuarios
app.get('/usuarios', (req, res) => {
    res.json(usuarios); // en formato JSON 
});
// leer un usuario por nombre
app.get('/usuarios/:nombre', (req, res) => {
    const nombreUsuario = req.params.nombre; // captura el parámetro "nombre" de la URL
    const usuario = usuarios.find(u => u.nombre.toLowerCase() === nombreUsuario.toLowerCase());
    // método find() se usa en arrays y devuelve el primer elemento que cumple con una 
    // condición proporcionada por una función de prueba
    // ejemplo numeros.find(numero=>numero>10) // busca el primer número mayor que 10 en el array numeros
    if (usuario) {
        res.json(usuario);
    } else {
        res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
});


// CREATE
app.post('/usuarios', (req, res) => {
    const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre: req.body.nombre,
        edad: req.body.edad,
        lugarProcedencia: req.body.lugarProcedencia,
    };
    usuarios.push(nuevoUsuario);
    res.status(201).json(nuevoUsuario);
});


// UPDATE 
app.put('/usuarios/:nombre', (req, res) => {
    const nombreUsuario = req.params.nombre;
    const usuarioIndex = usuarios.findIndex(u => u.nombre.toLowerCase() === nombreUsuario.toLowerCase());
    // el método findIndex si no encuentra elemento devuelve -1, so...
    if (usuarioIndex !== -1) {
        usuarios[usuarioIndex] = {
            ...usuarios[usuarioIndex],
            ...req.body, // spread operator para crear copia actualizada
        };
        res.json(usuarios[usuarioIndex]);
    } else {
        res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
});

// DELETE 
app.delete('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre; 
    const nuevoArrayUsuarios = usuarios.filter(u => u.nombre !== nombre); 
    if (nuevoArrayUsuarios.length !== usuarios.length) {
        usuarios = nuevoArrayUsuarios; 
        // básicamente creamos un huevo objeto sin el usuario que queremos eliminar
        res.status(200).json({ mensaje: 'Usuario eliminado' }); 
    } else {
        res.status(404).json({ mensaje: 'Usuario no encontrado' }); 
    }
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});