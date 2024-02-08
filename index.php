<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio</title>
  <link rel="stylesheet" href="style.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
</head>
<body>
    
    <section class="header">
        <h1>unsplash</h1>
        <small>random image feed</small>
    </section>

    <section class="box">
        <div class="box-content"></div>

        <div class="box-loading">
            <div class="loader"></div>
        </div>
    </section>

    <section class="box-menu close">
        <div class="menu-icon">
            <i class="fa-solid fa-gear"></i>
        </div>

        <label for=""> Grid size
            <input class="input-grid-size" type="range" min="1" max="5" step="1" value="1" />
        </label>
        <label for=""> Main color
            <input class="input-main-color" type="color" value="#ffffff" />
        </label>
        <label for=""> Light color
            <input class="input-light-color" type="color" value="#444444" />
        </label>
        <label for=""> background color
            <input class="input-background-color" type="color" value="#610000" />
        </label>
        <label for="">
            <button class="btn-reload"><i class="fa-solid fa-rotate-right"></i> Reload</button>
        </label>
        <label for="">
            <button class="btn-clear"><i class="fa-solid fa-trash-can"></i> Clear</button>
        </label>
        
    </section>

    <section class="button-top">
        <i class="fa-solid fa-arrow-up"></i>
    </section>

    <section class="footer">
        unsplash © <?= date('Y') ?>, Todos os direitos reservados.
    </section>

    <script src="script.js"></script>
</body>
</html>