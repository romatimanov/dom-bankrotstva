<?php
header('Content-Type: application/json');

$uploaddir = __DIR__ . '/../uploads/';


if (!file_exists($uploaddir)) {
    mkdir($uploaddir, 0777, true);
}

if (!isset($_FILES['file'])) {
    file_put_contents(__DIR__ . '/error.log', "Файл не получен\n", FILE_APPEND);
    echo json_encode([
        'success' => false,
        'error' => 'Файл не получен'
    ]);
    exit;
}

$file = $_FILES['file'];
$tmpName = $file['tmp_name'];
$originalName = basename($file['name']);
$filename = uniqid() . '-' . preg_replace('/[^a-zA-Z0-9\.\-_]/', '_', $originalName);
$destination = $uploaddir . $filename;


$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
$host = $_SERVER['HTTP_HOST'];
$url = "$protocol://$host/uploads/$filename";


if (move_uploaded_file($tmpName, $destination)) {
    echo json_encode([
        'success' => true,
        'data' => [
            'files' => [$url]
        ]
    ]);
} else {

    file_put_contents(__DIR__ . '/error.log', "Ошибка при перемещении файла: $tmpName -> $destination\n", FILE_APPEND);
    echo json_encode([
        'success' => false,
        'error' => 'Ошибка при сохранении файла'
    ]);
}
