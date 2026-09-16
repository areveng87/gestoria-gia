<?php
/**
 * Recibe el formulario de contacto de la web y envía el email
 * internamente usando la función mail() de PHP (disponible en el hosting
 * de Hostinger), sin depender de ningún servicio externo.
 *
 * Sube este archivo a la raíz pública de tu hosting (la misma carpeta
 * donde subes el contenido de `dist/` tras `npm run build`), de forma que
 * quede accesible en https://tudominio.com/send-mail.php
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Método no permitido']);
    exit;
}

// --- Configuración ---
$destinatario = 'info@gestoriagia.es';
$asuntoBase   = 'Consulta desde la web — Gestoría G.I.A';

// --- Lectura de datos (JSON o formulario clásico) ---
$input = json_decode(file_get_contents('php://input'), true);
if (!is_array($input)) {
    $input = $_POST;
}

$nombre  = trim($input['nombre'] ?? '');
$email   = trim($input['email'] ?? '');
$mensaje = trim($input['mensaje'] ?? '');

// Honeypot anti-spam: si este campo oculto viene relleno, se descarta en silencio
$honeypot = trim($input['website'] ?? '');
if ($honeypot !== '') {
    echo json_encode(['ok' => true]);
    exit;
}

if ($nombre === '' || $email === '' || $mensaje === '') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Faltan campos obligatorios']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Email no válido']);
    exit;
}

$nombreLimpio  = str_replace(["\r", "\n"], '', $nombre);
$emailLimpio   = str_replace(["\r", "\n"], '', $email);
$asunto        = $asuntoBase . ' — ' . $nombreLimpio;

$cuerpo  = "Nuevo mensaje desde el formulario de contacto de la web:\n\n";
$cuerpo .= "Nombre: {$nombreLimpio}\n";
$cuerpo .= "Email: {$emailLimpio}\n\n";
$cuerpo .= "Mensaje:\n{$mensaje}\n";

// El remitente técnico debe ser del propio dominio para evitar que los
// proveedores de correo marquen el envío como spam (SPF/DMARC).
$dominio = $_SERVER['HTTP_HOST'] ?? 'localhost';
$from    = 'info@' . preg_replace('/^www\./', '', $dominio);

$cabeceras  = "From: Formulario Web <{$from}>\r\n";
$cabeceras .= "Reply-To: {$emailLimpio}\r\n";
$cabeceras .= "Content-Type: text/plain; charset=UTF-8\r\n";

$enviado = mail($destinatario, $asunto, $cuerpo, $cabeceras);

if ($enviado) {
    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'No se pudo enviar el email']);
}
