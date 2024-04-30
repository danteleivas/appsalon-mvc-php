<?php 

namespace Classes;

use PHPMailer\PHPMailer\PHPMailer;

class Email{

    public $nombre;
    public $email;
    public $token;


    public function __construct( $email, $nombre, $token){
        $this->email = $email;
        $this->nombre = $nombre;
        $this->token = $token;

    }

    public function enviarConfirmacion(){

        $mail = new PHPMailer();
        $mail->isSMTP();
        $mail->Host = $_ENV['EMAIL_HOST'];
        $mail->SMTPAuth = true;
        $mail->Port = $_ENV['EMAIL_PORT'];
        $mail->Username = $_ENV['EMAIL_USER'];
        $mail->Password = $_ENV['EMAIL_PASS'];
        $phpmailer = new PHPMailer();

        $mail->setFrom('cuentas@appsalon.com');
        $mail->addAddress('cuentas@appsalon.com' , 'AppSalon.com');
        $mail->Subject = 'Confirma tu cuenta';
        $mail->isHTML(TRUE);
        $mail->CharSet = 'UTF-8';

        $contenido = "<html>";
        $contenido .= "<p><strong>Hola, ". $this->nombre . "</strong>! Has creado tu cuenta en App Salon, solo debes confirmarla presionando el siguiente enlace</p>";
        $contenido .= "<p>Presiona aquí: <a href='". $_ENV['APP_URL'] ."/confirmar-cuenta?token=" . $this->token ."'>Confirmar cuenta</a></p>";
        $contenido .= "<p>Si tu no solicitaste una cuenta, puedes ignorar el mensaje</p>";
        $contenido .= "</html>";

        $mail->Body = $contenido;

        //Enviar el mail

        $mail->send();
        
        
    }

    public function enviarInstrucciones(){

        $mail = new PHPMailer();
        $mail->isSMTP();
        $mail->Host = $_ENV['EMAIL_HOST'];
        $mail->SMTPAuth = true;
        $mail->Port = $_ENV['EMAIL_PORT'];
        $mail->Username = $_ENV['EMAIL_USER'];
        $mail->Password = $_ENV['EMAIL_PASS'];
        $phpmailer = new PHPMailer();

        $mail->setFrom('cuentas@appsalon.com');
        $mail->addAddress('cuentas@appsalon.com' , 'AppSalon.com');
        $mail->Subject = 'Reestablece tu contraseña';
        $mail->isHTML(TRUE);
        $mail->CharSet = 'UTF-8';

        $contenido = "<html>";
        $contenido .= "<p><strong>Hola, ". $this->nombre . "! Para reestablecer tu contraseña haz click en el siguiente enlace: </strong></p>";
        $contenido .= "<p>Presiona aquí: <a href='". $_ENV['APP_URL'] ."/recuperar?token=" . $this->token ."'>Reestablecer contraseña</a></p>";
        $contenido .= "<p>Si tu no solicitaste un cambio de contraseña, puedes ignorar el mensaje</p>";
        $contenido .= "</html>";

        $mail->Body = $contenido;

        //Enviar el mail

        $mail->send();
        
        
    }


}


?>