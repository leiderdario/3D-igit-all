import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, message } = body;

    // Validar que los campos requeridos estén presentes
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Crear el transporter con Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || '3digitallfactory@gmail.com',
        pass: process.env.EMAIL_PASS, // App Password de Gmail
      },
    });

    // Configurar el correo
    const mailOptions = {
      from: process.env.EMAIL_USER || '3digitallfactory@gmail.com',
      to: '3digitallfactory@gmail.com', // Tu correo donde recibirás los mensajes
      replyTo: email,
      subject: `Nuevo mensaje de contacto de ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: #0A0A0A; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">Nuevo Mensaje de Contacto</h1>
            <p style="margin: 10px 0 0 0; color: #00F0FF;">3Digit-All Factory</p>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; border-bottom: 2px solid #00F0FF; padding-bottom: 10px;">Información del Contacto</h2>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tr>
                <td style="padding: 12px; background-color: #f9f9f9; font-weight: bold; width: 30%; border: 1px solid #e0e0e0;">Nombre:</td>
                <td style="padding: 12px; border: 1px solid #e0e0e0;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px; background-color: #f9f9f9; font-weight: bold; border: 1px solid #e0e0e0;">Email:</td>
                <td style="padding: 12px; border: 1px solid #e0e0e0;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 12px; background-color: #f9f9f9; font-weight: bold; border: 1px solid #e0e0e0;">Empresa:</td>
                <td style="padding: 12px; border: 1px solid #e0e0e0;">${company || 'No especificada'}</td>
              </tr>
            </table>
            
            <h3 style="color: #333; margin-top: 30px; border-bottom: 2px solid #FF00AA; padding-bottom: 10px;">Mensaje</h3>
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin-top: 15px; border-left: 4px solid #FF00AA;">
              <p style="margin: 0; color: #555; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; color: #888; font-size: 12px;">
              <p>Este mensaje fue enviado desde el formulario de contacto de 3Digit-All Factory</p>
              <p>Fecha: ${new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' })}</p>
            </div>
          </div>
        </div>
      `,
      text: `
Nuevo mensaje de contacto de ${name}

Nombre: ${name}
Email: ${email}
Empresa: ${company || 'No especificada'}

Mensaje:
${message}

---
Este mensaje fue enviado desde el formulario de contacto de 3Digit-All Factory
Fecha: ${new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' })}
      `,
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: 'Mensaje enviado correctamente' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return NextResponse.json(
      { error: 'Error al enviar el mensaje' },
      { status: 500 }
    );
  }
}
