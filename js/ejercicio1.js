let listaNombres =[];

function agregarNombre() {
    let nombre = document.getElementById("nombre").value.trim().toUpperCase();

    
    if(nombre===""){
        alert("por favor ingrese el nombre");
        document.getElementById("nombre").style.backgroundColor="red";
        return;
    }
    else if(listaNombres.includes(nombre)){
        document.getElementById("nombre").style.backgroundColor="white";
        alert(`El nombre ${nombre}ya esta registrado`);
        document.getElementById("nombre").value="";
        return;

    }

    else{
    document.getElementById("nombre").style.backgroundColor="white";
    listaNombres.push(nombre);
    alert(`Se guardo el nombre:${nombre}`);
    document.getElementById("nombre").value ="";
    }
mostrarNombres();
    


}
function mostrarNombres(){
    let lista=document.getElementById("lista");
    let cantidad=document.getElementById("cantidad");

    lista.innerText="";

    for(let i =0; i<listaNombres.length; i++){
        lista.innerHTML+=`<li>${listaNombres[i]} </li>`;
    }
    cantidad.innerText=`Total Nombres: ${listaNombres.length}`;

}
