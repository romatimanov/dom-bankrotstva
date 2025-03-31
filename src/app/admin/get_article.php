<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Methods: GET, OPTIONS");
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

try {
    if (isset($_GET['title'])) {
        $titleSlug = $_GET['title'];
        $stmt = $pdo->query("SELECT * FROM articles");
        $articles = $stmt->fetchAll();

        $found = null;

        foreach ($articles as $a) {
            $slugified = mb_strtolower($a['title']);
            $slugified = preg_replace('/[^a-zа-я0-9\s\-]+/ui', '', $slugified);
            $slugified = preg_replace('/\s+/', '-', $slugified);

            if ($slugified === $titleSlug) {
                $found = $a;
                break;
            }
        }

        if ($found) {
            echo json_encode([
                'success' => true,
                'data' => $found
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'error' => 'Статья не найдена по title'
            ]);
        }
    } elseif (isset($_GET['slug'])) {
        $slug = $_GET['slug'];
        $stmt = $pdo->prepare("SELECT * FROM articles WHERE slug = ?");
        $stmt->execute([$slug]);
        $article = $stmt->fetch();

        if ($article) {
            echo json_encode([
                'success' => true,
                'data' => $article
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'error' => 'Статья не найдена'
            ]);
        }
    } elseif (isset($_GET['id'])) {
        $id = (int) $_GET['id'];
        $stmt = $pdo->prepare("SELECT * FROM articles WHERE id = ?");
        $stmt->execute([$id]);
        $article = $stmt->fetch();

        if ($article) {
            echo json_encode([
                'success' => true,
                'data' => $article
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'error' => 'Статья не найдена'
            ]);
        }
    } else {
        $stmt = $pdo->query("SELECT id, title, slug, image_url, category, content, likes, views, tags, created_at FROM articles ORDER BY created_at DESC");
        $articles = $stmt->fetchAll();

        echo json_encode([
            'success' => true,
            'data' => $articles
        ]);
    }
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => 'Ошибка при получении: ' . $e->getMessage()
    ]);
}
