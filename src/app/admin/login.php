<?php
session_start();
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user = $_POST['username'] ?? '';
    $pass = $_POST['password'] ?? '';

    if ($user === ADMIN_USER && password_verify($pass, ADMIN_PASS_HASH)) {
        $_SESSION['is_admin'] = true;
        header('Location: /admin');
        exit;
    } else {
        $error = 'Неверный логин или пароль';
    }
}
?>

<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Вход</title>
    <link rel="stylesheet" href="./styles.css">
</head>

<body>

    <div class="modal">

        <div class="content">
            <form method="POST" class="form">
                <label class="form-line">
                    <p class="labelText">Введите имя</p>
                    <input
                        type="text"
                        name="username"
                        placeholder="Имя"
                        class="input"
                        required />
                </label>

                <label class="form-line">
                    <p class="labelText">Введите пароль</p>
                    <input
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        class="input"
                        required />
                </label>

                <button type="submit" class="button">Войти</button>

                <?php if (!empty($error)) : ?>
                    <p class="error"><?= $error ?></p>
                <?php endif; ?>
            </form>
            <span class="line"></span>
            <span class="line"></span>
            <span class="line"></span>

        </div>
    </div>
</body>

</html>