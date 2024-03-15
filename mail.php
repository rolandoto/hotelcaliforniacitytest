<?php

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    sendResponse('error', "Método [{$_SERVER['REQUEST_METHOD']}] no permitido");
    return;
}

$payload = file_get_contents('php://input');
$data = json_decode($payload, true);

if (!isset($data['email'])) {
    sendResponse('error', 'El campo email es obligatorio');
    return;
}

if (!isset($data['phone'])) {
    sendResponse('error', 'El campo phone es obligatorio');
    return;
}

if (!isset($data['start_date'])) {
    sendResponse('error', 'El campo start_date es obligatorio');
    return;
}

if (!isset($data['end_date'])) {
    sendResponse('error', 'El campo end_date es obligatorio');
    return;
}

if (!isset($data['number_people'])) {
    sendResponse('error', 'El campo number_people es obligatorio');
    return;
}

if (!isset($data['number_children'])) {
    sendResponse('error', 'El campo number_children es obligatorio');
    return;
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

try {

    $mail = new PHPMailer(true);

    // Configura el servidor SMTP
    $mail->isSMTP();
    $mail->Host = 'mail.hotelcaliforniacity.co'; // Host Servidor Entrante
    $mail->SMTPAuth = true;
    $mail->Username = 'pruebas@hotelcaliforniacity.co'; // Nombre de usuario
    $mail->Password = 'pruebashotelcalifornia*2024'; // Contraseña
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465; // Puerto SMTP

    // Configura el remitente y el destinatario
    $mail->setFrom('noreply@hotelcaliforniacity.co', 'noreply'); // Remitente
    //administracion@hotelcaliforniamed.com cambiar
    $mail->addAddress('duvandag01@gmail.com');

    // Contenido del correo
    $mail->isHTML(true);
    $mail->Subject = 'Nueva Reserva';
    $mail->Body = 'Se ha recibido un nuevo correo desde el formulario web'
        . '<br>Correo electrónico: ' . $data['email']
        . '<br>Teléfono:' . $data['phone']
        . '<br>Ingreso:' . $data['start_date']
        . '<br>Salida:' . $data['end_date']
        . '<br>Num de Persona:' . $data['number_people']
        . '<br>Num de Niños:' . $data['number_children'];

    $mail->send();
    sendResponse('success', 'El correo se ha enviado correctamente');
} catch (Exception $e) {
    error_log($e->getMessage());
    sendResponse('error', 'Se produjo un problema al enviar el correo electrónico');
}

function sendResponse($status, $message)
{
    $response = array(
        'status' => $status,
        'message' => $message
    );

    echo json_encode($response);
}
