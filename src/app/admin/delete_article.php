<?php
header('Content-Type: application/json');
$pdo = new PDO("mysql:host=127.0.0.1;dbname=my_site;charset=utf8mb4", "root", "root");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $id = (int) ($data['id'] ?? 0);

    if ($id) {
        $stmt = $pdo->prepare("DELETE FROM articles WHERE id = ?");
        if ($stmt->execute([$id])) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Ошибка при удалении']);
        }
    } else {
        echo json_encode(['success' => false, 'error' => 'ID не передан']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Метод не разрешён']);
}
