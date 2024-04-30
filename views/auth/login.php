<h1 class="nombre-pagina">Login</h1>
<p class="descripcion-pagina">Inicia sesión con tus datos</p>

<?php 

include_once __DIR__ . '/../templates/alertas.php';

?>
<form method="POST" action="/" class="formulario">
    <div class="campo">
        <label for="email">Email: </label>
        <input 
            type="email"
            id="email"
            placeholder="Tu email"
            name="email"        
        />
    </div>

    <div class="campo">
        <label for="password">Contraseña: </label>
        <input 
            type="password"
            id="password"
            name="password"
            placeholder="Tu contraseña"
        />
    </div>

    <input type="submit" class="boton" value="Iniciar Sesion">

</form>

<div class="acciones">
    <a href="/crear-cuenta">¿Aún no tienes una cuenta? Crea una.</a>
    <a href="/olvide">Olvidé mi contraseña</a>
</div>

