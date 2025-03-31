<?php
header('Content-Type: application/json');

try {
    $pdo = new PDO("mysql:host=127.0.0.1;dbname=my_site;charset=utf8mb4", "root", "root", [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => 'Ошибка подключения к базе данных']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT' && isset($_GET['id'])) {
    $id = (int) $_GET['id'];
    $data = json_decode(file_get_contents("php://input"), true);

    $requiredFields = ['title', 'content', 'tags', 'category', 'image_url'];
    foreach ($requiredFields as $field) {
        if (!isset($data[$field])) {
            echo json_encode(['success' => false, 'error' => "Отсутствует поле: $field"]);
            exit;
        }
    }

    try {
        $stmt = $pdo->prepare("
            UPDATE articles 
            SET title = ?, content = ?, tags = ?, category = ?, image_url = ? 
            WHERE id = ?
        ");
        $result = $stmt->execute([
            $data['title'],
            $data['content'],
            $data['tags'],
            $data['category'],
            $data['image_url'],
            $id
        ]);

        echo json_encode(['success' => $result]);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => 'Ошибка при обновлении: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Неверный метод или отсутствует ID']);
}
