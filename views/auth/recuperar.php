<h1 class="nombre-pagina">Reestablece tu contraseña</h1>
<p class="descripcion-pagina">Ingresa tu nueva contraseña</p>

<?php 

include_once __DIR__ . '/../templates/alertas.php';

if($error){

    return;

}
?>
<form method="POST" class="formulario">
    
    <div class="campo">
        <label for="password">Contraseña: </label>
        <input 
            type="password"
            id="password"
            name="password"
            placeholder="Tu contraseña"
        />
    </div>

    <input type="submit" class="boton" value="Guardar nueva contraseña">

</form>

<div class="acciones">
    <a href="/">¿Ya reestableciste tu contraseña? Inicia sesión</a>
</div>