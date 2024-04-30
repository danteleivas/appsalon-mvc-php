let paso = 1;
let pasoInicial = 1;
let pasoFinal = 3;

const cita = {
    id: '',
    nombre: '',
    fecha: '',
    hora: '',
    servicios: []
}


document.addEventListener('DOMContentLoaded', function(){

    iniciarApp();

})

function iniciarApp(){
    mostrarSeccion();
    tabs();
    botonesPaginador();
    paginaAnterior();
    paginaSiguiente();
    consultarAPI();

    idCliente();
    nombreCliente();
    seleccionarFecha();
    seleccionarHora();
    mostrarResumen();
    

}
function mostrarSeccion(){

    
    // Mostrar Seccion
    const seccionAnterior = document.querySelector('.mostrar');
    
    if (seccionAnterior){
        seccionAnterior.classList.remove('mostrar')
    }

    const pasoSelector = `#paso-${paso}`;
    const seccion = document.querySelector(pasoSelector);
    seccion.classList.add('mostrar');

    
    // Resaltar boton 

    const botonAnterior = document.querySelector('.actual');

    if (botonAnterior){
        botonAnterior.classList.remove('actual')
    }

    const botonSelector = `[data-paso="${paso}"]`;

    const boton = document.querySelector(botonSelector);
    boton.classList.add('actual');



   

    
}

function tabs(){
    const botones = document.querySelectorAll('.tabs button');

    
    botones.forEach(boton => {
        boton.addEventListener('click', function(e){
            paso = parseInt( e.target.dataset.paso);
            
            mostrarSeccion();
            botonesPaginador();

            // Otra forma de cambiar la clase "actual" del boton.

            /*var current = document.getElementsByClassName("actual");

            if (current.length > 0) {
            current[0].className = current[0].className.replace("actual", "");
            }

            this.className += "actual";
            */
            
        
         });

    });
}

function botonesPaginador(){

    const btnAnterior = document.querySelector('#anterior');
    const btnSiguiente = document.querySelector('#siguiente');

    
    
    if (paso === 1){
        btnAnterior.classList.add("ocultar");
        btnSiguiente.classList.remove("ocultar");
    }else if (paso ===  2){
        btnAnterior.classList.remove("ocultar");
        btnSiguiente.classList.remove("ocultar");

     }else if(paso === 3){

        btnAnterior.classList.remove("ocultar");
        btnSiguiente.classList.add("ocultar");
        mostrarResumen();
    }

    mostrarSeccion();

}

function paginaAnterior(){

    const paginaAnterior = document.querySelector('#anterior');
    paginaAnterior.addEventListener('click' , function(){

        if (paso <= pasoInicial) return;

        paso--;
        botonesPaginador();

    })

}

function paginaSiguiente(){

    const paginaSiguiente = document.querySelector('#siguiente');
    paginaSiguiente.addEventListener('click' , function(){

        if (paso >= pasoFinal) return;

        paso++;
        botonesPaginador();

    })

}

async function consultarAPI(){

    try{
        const url = '/api/servicios';
        const resultado = await fetch(url);
        const servicios = await resultado.json();

        mostrarServicios(servicios);
        
    }catch (error){
        console.log(error);
    }

}

function mostrarServicios(servicios){

    servicios.forEach(servicio =>{

        const {id, nombre, precio} = servicio;

        const nombreServicio = document.createElement('P');
        nombreServicio.classList.add('nombre-servicio');
        nombreServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        precioServicio.classList.add('precio-servicio');
        precioServicio.textContent = `$${precio}`;
        
        const servicioDiv = document.createElement('DIV');
        servicioDiv.classList.add('servicio');
        servicioDiv.dataset.idServicio = id;
        servicioDiv.onclick = function(){
            seleccionarServicio(servicio);
        };

        servicioDiv.appendChild(nombreServicio);
        servicioDiv.appendChild(precioServicio);
        

        document.querySelector('#servicios').appendChild(servicioDiv);

    })
}

function seleccionarServicio(servicio){
    const{id} = servicio;
    const {servicios} = cita;

    const divServicio = document.querySelector(`[data-id-servicio="${id}"]`);

    if (servicios.some(agregado => agregado.id === id)){
        
        cita.servicios = servicios.filter(agregado => agregado.id !== id);
        divServicio.classList.remove('seleccionado');

    }else{

        cita.servicios = [...servicios, servicio];
        divServicio.classList.add('seleccionado');
    }
    
    console.log(cita);
}
function idCliente(){
    cita.id = document.querySelector('#id').value;
}

function nombreCliente(){

    cita.nombre = document.querySelector('#nombre').value;
    
    
}

function seleccionarFecha(){

    const inputFecha = document.querySelector('#fecha');

    inputFecha.addEventListener('input', function(e){
        
        const dia = new Date(e.target.value).getUTCDay();
        
        if ([0,6].includes(dia)){
            e.target.value = '';
            mostrarAlerta('El servicio no está disponible los fines de semana', 'error', '.formulario');

        }
        else{
            cita.fecha = e.target.value;
        }

    });
}
function seleccionarHora(){
    const inputHora = document.querySelector('#hora');
    inputHora.addEventListener('input', function(e){

        const horaCita = e.target.value;
        const hora = e.target.value.split(':');
        if(hora[0] < 8 || hora[0] > 21){
            e.target.value = '';
            mostrarAlerta('Solo trabajamos de 8:00 AM a 10:00 PM', 'error', '.formulario');
        }else{
            cita.hora = horaCita;
            console.log(cita);
        }

    });

    
}

function mostrarAlerta(mensaje, tipo, elemento, desaparece = true){
    const alertaPrevia = document.querySelector('.alerta');
    if (alertaPrevia){
        alertaPrevia.remove();
    } 
    const alerta = document.createElement('DIV');
    

    alerta.classList.add('alerta', tipo);
    alerta.textContent = mensaje;


    const referencia = document.querySelector(elemento);
    referencia.appendChild(alerta);

    if (desaparece){
        setTimeout(() => {

        alerta.remove();
        }, 3000);
    }

}

function mostrarResumen(){
    const resumen = document.querySelector('.contenido-resumen');
    while(resumen.firstChild){
        resumen.removeChild(resumen.firstChild);
    }

    if (Object.values(cita).includes('') || cita.servicios.length === 0){
        mostrarAlerta('Completa los datos en los pasos anteriores', 'error', '.contenido-resumen', false )
        return;
    }
        
    // Formatear DIV de Resumen

    const {nombre, fecha, hora, servicios} = cita;
    
    // Heading servicios
    const headingServicios = document.createElement('H3');
    headingServicios.textContent = 'Resumen de servicios';
    resumen.appendChild(headingServicios);


    servicios.forEach(servicio => {
        const {id, precio, nombre} = servicio;

        const contenedorServicio = document.createElement('DIV');
        contenedorServicio.classList.add('contenedor-servicio');

        const textoServicio = document.createElement('P');
        textoServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        precioServicio.innerHTML = `<span>Precio:</span> $${precio}`;

        contenedorServicio.appendChild(textoServicio);
        contenedorServicio.appendChild(precioServicio);

        resumen.appendChild(contenedorServicio);


        
    });

    // Heading Cita
    const headingCita = document.createElement('H3');
    headingCita.textContent = 'Resumen de la cita';
    resumen.appendChild(headingCita);

    const nombreCliente = document.createElement('P');
    nombreCliente.innerHTML = `<span>Nombre:</span> ${nombre}`;

    // Formatear fecha en español

    const fechaObj = new Date(fecha);
    const mes = fechaObj.getMonth();
    const dia = fechaObj.getDate() + 2;
    const year = fechaObj.getFullYear();

    const fechaUTC = new Date(Date.UTC(year,mes, dia));

    const opciones = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
    const fechaFormateada = fechaUTC.toLocaleDateString('es-AR', opciones);
    

    const fechaCita = document.createElement('P');
    fechaCita.innerHTML = `<span>Fecha:</span> ${fechaFormateada}`;

    const horaCita = document.createElement('P');
    horaCita.innerHTML = `<span>Hora:</span> ${hora} hs`;

    const boton = document.createElement('BUTTON');
    boton.classList.add('boton');
    boton.textContent = 'Reservar Cita';
    boton.onclick = reservarCita;

    
    resumen.appendChild(nombreCliente);
    resumen.appendChild(fechaCita);
    resumen.appendChild(horaCita);
    resumen.appendChild(boton);

    
}

async function reservarCita(){
    
    const {nombre, fecha, hora, servicios, id} = cita;
    const idServicios = servicios.map (servicio => servicio.id);

    const datos = new FormData();
    datos.append('fecha', fecha);
    datos.append('hora', hora);
    datos.append('usuarioId', id);

    datos.append('servicios', idServicios);



    // Peticion hacia la api

    try{
        
        const url = '/api/citas';

        const respuesta = await fetch(url, {
            method: 'POST',
            body: datos
        });
        const resultado = await respuesta.json();

        if(resultado.resultado){
            Swal.fire({
                icon: "success",
                title: "Cita Creada",
                text: "La cita fue creada correctamente",
                button: 'OK'
              }).then( () => {
                setTimeout(() => {
                    window.location.reload();
                }, 3000);

              })
        }
    }catch(error){
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un error al guardar la cita"
            
          });
    }

   
    
}

