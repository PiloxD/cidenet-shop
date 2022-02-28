const { Router } = require('express');
const router = Router();

const nodemailer = require('nodemailer');

router.post('/nodemailer/send-email', async (req, res) => {
    const { email, city, address, total } = req.body;
    //CONTENIDO HTML INICIO
    contentHTML = `
    <tr>
    <td style="padding-top: 30px;">
        <table width="560" align="center" cellpadding="0" cellspacing="0" border="0" class="devicewidthinner" style="border-bottom: 1px solid #eeeeee; text-align: center;">
            <tbody>
                <tr>
                    <td style="padding-bottom: 10px;">
                        <a><img src="https://www.camaradelpacifico.org/tl_files/Casos%20Exito/CIDENET%20SAS/LOGO%20CIDENET.png" alt="PapaChina" /></a>
                    </td>
                </tr>
            </tbody>
        </table>
    </td>
</tr>
    <tr>
    <td style="padding-top: 0;">
        <table width="560" align="center" cellpadding="0" cellspacing="0" border="0" class="devicewidthinner" style="border-bottom: 1px solid #bbbbbb;">
            <tbody>
                <tr>
                    <td style="width: 45%; font-size: 16px; font-weight: bold; color: #666666; padding-bottom: 5px;">
                        Información del comprador
                    </td>
                </tr>
                <tr>
                    <td style="width: 45%; font-size: 14px; line-height: 18px; color: #666666;">
                        ${email}
                    </td>
                </tr>
                <tr>
                    <td style="width: 45%; font-size: 14px; line-height: 18px; color: #666666;">
                    ${city}
                    </td>
                </tr>
                <tr>
                    <td style="width: 45%; font-size: 14px; line-height: 18px; color: #666666; padding-bottom: 10px;">
                    ${address}
                    </td>
                </tr>
            </tbody>
        </table>
    </td>
</tr>
<tr>
                                    <td style="padding-top: 0;">
                                        <table width="560" align="center" cellpadding="0" cellspacing="0" border="0" class="devicewidthinner" style="border-bottom: 1px solid #bbbbbb; margin-top: -5px;">
                                        <tr>
                    <td style="width: 45%; font-size: 16px; font-weight: bold; color: #666666; padding-bottom: 5px;">
                        Factura
                    </td>
                </tr>    
                                        <tbody>
                                                <tr>
                                                
                                                    <td style="font-size: 14px; font-weight: bold; line-height: 18px; color: #666666; padding-top: 10px;">
                                                        Total: 
                                                    </td>
                                                    <td style="font-size: 14px; font-weight: bold; line-height: 18px; color: #666666; padding-top: 10px; text-align: right;">
                                                    ${total}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
    `;
    //CONTENIDO HTML FIN
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'andresdm1997@gmail.com',
            pass: '2804683030303012'
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    let info = await transporter.sendMail({
        from: '"Cidenet Shop" <andresdm1997@gmail.com>',
        to: email,
        subject: 'Gracias por confiar en nosotros',
        html: contentHTML
    })



    res.send('Email ENVIADO CON EXITO');
});

module.exports = router;
