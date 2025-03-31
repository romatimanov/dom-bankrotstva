<?php

header('Content-Type: application/json');
ob_clean();

$host = '127.0.0.1';
$db = 'my_site';
$user = 'root';
$pass = 'root';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;port=3306;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => 'Ошибка подключения к базе: ' . $e->getMessage()
    ]);
    exit;
}

function slugify($text)
{
    $text = strtolower($text);
    $text = preg_replace('/[^\p{L}\p{Nd}\s-]+/u', '', $text);
    $text = preg_replace('/[\s]+/', '-', $text);
    return trim($text, '-');
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!is_array($data)) {
    echo json_encode([
        'success' => false,
        'error' => 'Невалидный JSON: ' . $input
    ]);
    exit;
}

$title = trim($data['title'] ?? '');
$content = trim($data['content'] ?? '');
$image = trim($data['image_url'] ?? '');
$tags = trim($data['tags'] ?? '');
$category = trim($data['category'] ?? '');


if ($title === '' || $content === '') {
    echo json_encode([
        'success' => false,
        'error' => 'Заголовок и текст обязательны'
    ]);
    exit;
}

$baseSlug = slugify($title);
$slug = $baseSlug;
$suffix = 1;

while (true) {
    $check = $pdo->prepare("SELECT COUNT(*) FROM articles WHERE slug = ?");
    $check->execute([$slug]);
    $exists = $check->fetchColumn();

    if ($exists == 0) break;

    $slug = $baseSlug . '-' . $suffix++;
}

try {
    $stmt = $pdo->prepare("INSERT INTO articles (title, category, content, image_url, tags, slug) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->execute([$title, $category, $content, $image, $tags, $slug]);


    echo json_encode([
        'success' => true,
        'message' => 'Статья сохранена',
        'slug' => $slug
    ]);
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => 'Ошибка при сохранении: ' . $e->getMessage()
    ]);
}
