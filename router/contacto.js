const { Router } = require('express');
const contacto = new Router();
const nodemailer = require('nodemailer');

//envio mail
contacto.get('/contacto', (req, res) => {
    res.render('contacto', {
        titulo: "Contacto",
        subtitulo: "Contáctese con nosotros",
    })
});

contacto.post('/send-email', (req, res) => {
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const email = req.body.email;
    const asunto = req.body.asunto;
    const mensaje = req.body.mensaje;

    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    //info para construir el objeto
    let mailOptions = {
        to: 'aliya.steuber50@ethereal.email',
        from: email,
        subject: `${asunto}`,
        html: `<h1> Mensaje para Pizzeria: </h1>
                <h2>De ${nombre} ${apellido}</h2>
                <p> Mensaje: ${mensaje} </p>
                <p> Contacto: ${email}  </p>`,
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).send(error.message);
        } else {
            res.render('emailEnviado', {
                titulo: "Contacto",
                subtitulo: "Gracias por contactarse con nosotros.",
            });
            res.status(200).jsonp(reqbody);
        }
    })

});
module.exports = contacto;