const { Router } = require('express');
const router = new Router();
const mysql = require('mysql');

//conexion a la base de datos
const conexion = mysql.createConnection({
    host: 'localhost',
    database: 'db_pizzeria',
    user: 'root',
    password: ''
});

conexion.connect((error) => {
    if (error) {
        throw error;
    } else {
        console.log('Conexion establecida con exito')
    }
});

//RUTAS
//database functions

//SELECT 
router.get('/clientes', (req, res) => {
    let sql = "SELECT * FROM clientes";
    let query = conexion.query(sql, (error, results) => {
        if (error) {
            throw error
        } else {
            res.render('clientes', {
                results,
                titulo: "Clientes",
            })
        }
    })
});

//INSERT
router.post('/save', (req, res) => {
    let data = { nombre: req.body.c_nombre, apellido: req.body.c_apellido, email: req.body.c_email };
    let sql = "INSERT INTO clientes SET ?";
    let query = conexion.query(sql, data, (error, results) => {
        if (error) {
            throw error
        } else {
            res.redirect('/clientes'); //redirijo 
        }
    })
});

//update
router.post('/update', (req, res) => {
    let sql = "UPDATE clientes SET nombre = '" + req.body.c_nombre + "', apellido = '" + req.body.c_apellido + "', email = '" + req.body.c_email + "' WHERE id ='" + req.body.id + "'";
    let query = conexion.query(sql, (error, results) => {
        if (error) {
            throw error
        } else {
            res.redirect('/clientes'); //redirijo 
        }
    })
})

//delete
router.post('/delete', (req, res) => {
    let sql = "DELETE FROM clientes WHERE id ='" + req.body.cliente_id + "'";
    let query = conexion.query(sql, (error, results) => {
        if (error) {
            throw error
        } else {
            //console.log('Registro eliminado', results);
            res.redirect('/clientes');
        }
    })
});

//contenido estatico
router.get('/', (req, res) => {
    res.render('home', {
        titulo: "Home",
    })
});

router.get('*', (req, res) => {
    res.send('Error pagina no encontrada')
});

module.exports = router;