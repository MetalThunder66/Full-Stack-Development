const { Router } = require('express');
const router = new Router();
const mysql = require('mysql');

//conexion a la base de datos
const conexion = mysql.createConnection({
    host: 'localhost',
    database: 'agustin_ignacio_sau', //Linea Original: database: 'db_pizzeria' database: 'agustin_ignacio_sau',
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

//clientes
//select 
router.get('/clientes', (req, res) => {
    let sql = "SELECT * FROM clientes";
    let query = conexion.query(sql, (error, results) => {
        if (error) {
            throw error
        } else {
            res.render('clientes', {
                results,
                titulo: "Clientes",
                subtitulo: "Lista De Clientes",
            })
        }
    })
});

//insert
router.post('/save_client', (req, res) => {
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
router.post('/update_client', (req, res) => {
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
router.post('/delete_client', (req, res) => {
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

//productos 
//select 
router.get('/', (req, res) => {
    let sql = "SELECT * FROM productos";
    let query = conexion.query(sql, (error, results) => {
        if (error) {
            throw error
        } else {
            res.render('home', {
                results,
                titulo: "Home",
                subtitulo: "Nuestros Productos",
            })
        }
    })
});

//insert
router.post('/save_product', (req, res) => {
    let data = { variedad: req.body.variedad, tipo: req.body.prodTipo, precio: req.body.prodPrecio };
    let sql = "INSERT INTO productos SET ?";
    let query = conexion.query(sql, data, (error, results) => {
        if (error) {
            throw error
        } else {
            res.redirect('/'); //redirijo 
        }
    })
});

//update
router.post('/update_product', (req, res) => {
    let sql = "UPDATE productos SET variedad = '" + req.body.variedad + "', tipo = '" + req.body.prodTipo + "', precio = '" + req.body.prodPrecio + "' WHERE id ='" + req.body.prodId + "'";
    let query = conexion.query(sql, (error, results) => {
        if (error) {
            throw error
        } else {
            res.redirect('/'); //redirijo 
        }
    })
})

//delete
router.post('/delete_product', (req, res) => {
    let sql = "DELETE FROM productos WHERE id ='" + req.body.prodId + "'";
    let query = conexion.query(sql, (error, results) => {
        if (error) {
            throw error
        } else {
            //console.log('Registro eliminado', results);
            res.redirect('/');
        }
    })
});

router.get('/nosotros', (req, res) => {
    res.render('nosotros', {
        titulo: "Nosotros",
        subtitulo: "Sobre Nosotros",
    })
});

router.get('*', (req, res) => {
    res.send('Error pagina no encontrada')
});

module.exports = router;