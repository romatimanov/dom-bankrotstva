<?php
header('Content-Type: application/json');

function generateSlug($string)
{
    $slug = preg_replace('/[^а-яА-Яa-zA-Z0-9\s-]/u', '', $string);
    $slug = trim($slug);
    $slug = preg_replace('/\s+/', '-', $slug);
    $slug = preg_replace('/-+/', '-', $slug);
    return $slug;
}

try {
    $pdo = new PDO(
        "mysql:host=localhost;dbname=u3042332_my_site;charset=utf8mb4",
        "u3042332_my_site",
        "mysite_password",
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]
    );
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => 'Ошибка подключения к базе данных']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT' && isset($_GET['id'])) {
    $id = (int) $_GET['id'];
    $data = json_decode(file_get_contents("php://input"), true);

    $requiredFields = ['title', 'content', 'tags', 'image_url'];
    foreach ($requiredFields as $field) {
        if (!isset($data[$field])) {
            echo json_encode(['success' => false, 'error' => "Отсутствует поле: $field"]);
            exit;
        }
    }

    $title = $data['title'];
    $slug = generateSlug($title);
    $content = $data['content'];
    $tags = $data['tags'];

    $image_url = $data['image_url'];

    try {
        $stmt = $pdo->prepare("
            UPDATE articles 
            SET title = ?, slug = ?, content = ?, tags = ?,  image_url = ? 
            WHERE id = ?
        ");
        $result = $stmt->execute([
            $title,
            $slug,
            $content,
            $tags,
            $image_url,
            $id
        ]);

        echo json_encode(['success' => $result]);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => 'Ошибка при обновлении: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Неверный метод или отсутствует ID']);
}
