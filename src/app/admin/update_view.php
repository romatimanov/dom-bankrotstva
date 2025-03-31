<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

try {
    $pdo = new PDO("mysql:host=127.0.0.1;dbname=my_site;charset=utf8mb4", "root", "root", [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => 'Ошибка подключения к базе данных']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['id'])) {
    $id = (int) $_GET['id'];

    try {
        $stmt = $pdo->prepare("SELECT views FROM articles WHERE id = ?");
        $stmt->execute([$id]);
        $current = $stmt->fetchColumn();

        $newViews = $current + 1;

        $stmt = $pdo->prepare("UPDATE articles SET views = ? WHERE id = ?");
        $result = $stmt->execute([$newViews, $id]);

        if ($result) {
            echo json_encode(['success' => true, 'views' => $newViews]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Ошибка при обновлении']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => 'Ошибка запроса: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Неверный метод или отсутствует ID']);
}
