<?php
header('Content-Type: application/json');
$pdo = new PDO("mysql:host=127.0.0.1;dbname=my_site;charset=utf8mb4", "root", "root");

if ($_SERVER['REQUEST_METHOD'] === 'PUT' && isset($_GET['id'])) {
    $data = json_decode(file_get_contents("php://input"), true);

    $stmt = $pdo->prepare("UPDATE articles SET title = ?, content = ?, tags = ?, category = ?, image_url = ? WHERE id = ?");
    $result = $stmt->execute([
        $data['title'],
        $data['content'],
        $data['tags'],
        $data['category'],
        $data['image_url'],
        $_GET['id']
    ]);

    if ($result) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Ошибка при обновлении']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Неверный запрос']);
}
