<?php
session_start();
if (!isset($_SESSION['is_admin']) || $_SESSION['is_admin'] !== true) {
    header('Location: /login.php');
    exit;
}
?>

<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Админка</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/jodit@3.24.3/build/jodit.min.css" />
    <script src="https://cdn.jsdelivr.net/npm/jodit@3.24.3/build/jodit.min.js"></script>
    <link rel="stylesheet" href="/admin.css" />
</head>

<body>
    <div class="admin-layout">
        <aside class="sidebar">
            <ul class="sidebar-menu">
                <li><a href="#" id="create-article-link">Создать статью</a></li>
                <li><a href="#" id="view-articles-link">Все статьи</a></li>
                <li><a href="/logout.php">Выйти</a></li>
            </ul>
        </aside>

        <main class="main-content">
            <section id="create-article-section">
                <h2 class="global-title">Создать статью</h2>
                <form id="article-form" class="form">
                    <input type="text" id="title" placeholder="Заголовок" class="input" />
                    <input type="text" id="category" placeholder="Категория" class="input" />
                    <input type="text" id="tags" placeholder="#тег1, #тег2" class="input" />
                    <textarea id="editor"></textarea>
                    <br />
                    <button type="submit" class="button">Сохранить</button>
                </form>
            </section>

            <section id="view-articles-section" style="display: none;">
                <h2 class="global-title">Все статьи</h2>
                <div id="articles-list">
                    <table class="articles-table">
                        <thead class="thead">
                            <tr class="row">
                                <th class="column">ID</th>
                                <th class="column">Заголовок</th>
                                <th class="column">Теги</th>
                                <th class="column date">Дата</th>
                                <th class="column">Действия</th>
                            </tr>
                        </thead>
                        <tbody id="articles-table-body"></tbody>
                    </table>
                    <div id="pagination-container"></div>
                </div>
            </section>
        </main>
    </div>

    <script src="/admin.js"></script>
</body>

</html>