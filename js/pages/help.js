//se crean las variables
let inputEmail = document.getElementById("email");
const btnLimpiar = document.getElementById("clear");
const inputSumbit = document.getElementById("button");
const mailExitoso = document.getElementById("mensaje-exitoso");
const btn = document.getElementById('button');
const mailInvalido = document.getElementById("none-valid");

//se saca la card
function sacarCartel(){
    mailExitoso.removeAttribute("style");
    mailExitoso.setAttribute("style", "display: none");
    mailInvalido.removeAttribute("style");
    mailInvalido.setAttribute("style", "display: none");   
}

//se valida el mail
function validMail(){
    // expreción regular para la validación del Email (sacada de internet)
    var regExprecion = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    var expValido = regExprecion.test(inputEmail.value);
    console.log(expValido);
    if (expValido == false) {
        mailExitoso.removeAttribute("style");
        mailExitoso.setAttribute("style", "display: none");
        mailInvalido.removeAttribute("style");
        mailInvalido.setAttribute("style", "display: flex");
    } else if (expValido == true){
        mailInvalido.removeAttribute("style");
        mailInvalido.setAttribute("style", "display: none");
    }
}

//se ejecutan
inputSumbit.addEventListener("click", validMail);
btnLimpiar.addEventListener("click", sacarCartel);

document.getElementById('form')
.addEventListener('submit', function (event) {
  event.preventDefault();

  btn.value = 'Enviando...';

  const serviceID = 'default_service';
  const templateID = 'template_k0o1xay';

  emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Enviar';
      mailInvalido.removeAttribute("style");
      mailInvalido.setAttribute("style", "display: none");     
      mailExitoso.removeAttribute("style");
      mailExitoso.setAttribute("style", "display: felx");
    }, (err) => {
      btn.value = 'Enviar';
      alert(JSON.stringify(err));
    });
});