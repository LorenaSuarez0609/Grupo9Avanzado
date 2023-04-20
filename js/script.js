const formularioUsuarios = document.querySelector(".formularioUsuarios")
const contenedorMascota = document.querySelector("#contenedorMascota")

const mascota = {
                nombreMascota:"" ,
                cumpleGato:"",
                sexoMascota:"",
                peso :0, 
                cirPanza:0, 
                largoPata:0 
                }

const calcularIMC = (peso,cp,lp) => { 
    var a = cp/0.70622;
    var b = a-lp;
    var c = b/0.9156;
    var d = c-lp;
    return d;
}



const renderzarMascotas = () => {
    contenedorMascota.innerHTML=""

    var calculo = calcularIMC(mascota.peso, mascota.cirPanza, mascota.largoPata)
    console.log(calculo)
    let estadoGato =""
    
    if(calculo <=10){
        estadoGato = "Bajo Peso"
        console.log(estadoGato)
        var ventana = window.open("./gatoflaco.html", "gatoFlaco", "height=700,width=700,left=100,top=100,toolbar=no,menubar=no");
        ventana.mascota=mascota;
           
    }
    else{ if(calculo<=25){
            estadoGato = "Tu gato esta perfecto"
            console.log(estadoGato)
            var ventana=window.open("./gatook.html", "gatoOk", "height=700,width=700,left=100,top=100,toolbar=no,menubar=no");
            ventana.mascota=mascota;
            } 
            else{ 
                estadoGato = "Sobre peso"
                console.log(estadoGato)
                 var ventana=window.open("./gatogordo.html", "gatoGordo", "height=700,width=700,left=100,top=100,toolbar=no,menubar=no");
                ventana.mascota=mascota;
            }
        }    
    
    contenedorMascota.innerHTML += `
    <div class= imc-card>
    <h2>Nombre Mascota: ${mascota.nombreMascota}</h2>
    <p>Cumpleaños: ${mascota.cumpleGato}</p>
    <p>Sexo: ${mascota.sexoMascota}</p>
    <p>Peso: ${mascota.peso}</p>
    <p>Circunsferencia Panza:${mascota.cirPanza}
    <p>Largo Pata: ${mascota.largoPata}</p>
    <p>Resultado IMC: ${calculo.toFixed(2)} </p>
    <p>Estado: ${estadoGato}</p>
                             
        `
        calculo = 0
        estadoGato=""

} 


formularioUsuarios.addEventListener("submit", (event) =>{
    event.preventDefault()
   
    mascota.nombreMascota= formularioUsuarios.nombreMascota.value
    mascota.cumpleGato= formularioUsuarios.cumpleGato.value
    mascota.sexoMascota= formularioUsuarios.sexoMascota.value
    mascota.peso= formularioUsuarios.peso.value
    mascota.cirPanza= formularioUsuarios.cirPanza.value
    mascota.largoPata= formularioUsuarios.largoPata.value

    renderzarMascotas()
})


function genPDF(){
    mascota.nombreMascota= formularioUsuarios.nombreMascota.value
    var calculo = 0;
    var imagenGato = new Image();
    imagenGato.src="";
    var estadoGato = "";
    if(mascota.nombreMascota == ""){
        swal("Rellene el formulario", "Sin datos","warning");  
    }   
    else {
        mascota.cumpleGato= formularioUsuarios.cumpleGato.value
        mascota.sexoMascota= formularioUsuarios.sexoMascota.value
        mascota.peso= formularioUsuarios.peso.value
        mascota.cirPanza= formularioUsuarios.cirPanza.value
        mascota.largoPata= formularioUsuarios.largoPata.value
        calculo = calcularIMC(mascota.peso, mascota.cirPanza, mascota.largoPata)
        if(calculo <=10){
            estadoGato = "Tu gato tiene Bajo Peso";
            imagenGato.src = "./jepg/Gato-flaco.jpeg";
                      }
        else{ if(calculo<=25){
            estadoGato = "Tu gato esta perfecto";
            imagenGato.src = "./jepg/Gato-ok.jpeg";
                        } 
            else{ 
                estadoGato = "Tu gato tiene Sobre peso";
                imagenGato.src = "./jepg/Gato-gordo.jpeg";
                }
            }    
        console.log(imagenGato);
        var doc = new jsPDF();
        doc.setFontSize(15);
        doc.setFont("helvetica", "normal");
        doc.text(20, 20, 'Love Our Cats');
        doc.text(20, 30, 'Nombre de tu Mascota');
        doc.text(20, 40, mascota.nombreMascota);
        doc.text(20, 50, 'Cumpleaños de tu Gato');
        doc.text(20, 60, mascota.cumpleGato);
        doc.text(20, 70, 'Sexo de tu Mascota');
        doc.text(20, 80, mascota.sexoMascota);
        doc.text(20, 90, 'Peso de tu Mascota');
        doc.text(20, 100, mascota.peso);
        doc.text(20, 110, 'Circunferencia de la pata');
        doc.text(20, 120, mascota.cirPanza);
        doc.text(20, 130, 'Largo de la Pata');
        doc.text(20, 140, mascota.largoPata);
        doc.text(20, 150, 'Indice de Masa Corporal');
        doc.text(20, 160, calculo.toFixed(2));
        doc.text(20, 170, 'Estado de tu Mascota');
        doc.text(20, 180, estadoGato);
        doc.addImage(imagenGato, 'JPEG', 20, 200, 80, 80);
        doc.save('LoveOurCats.pdf');
        swal("Guardando el documento en un pdf", "Click en Ok....","success");        
        } 
        
    

}

