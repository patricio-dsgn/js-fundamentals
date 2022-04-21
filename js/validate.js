

const nameField = document.getElementsByName('name_contact')[0];
const emailField = document.getElementsByName('email_contact')[0];
const phoneField = document.getElementsByName('phone_contact')[0];
const skillField = document.getElementById('topic_contact');
const sendButton = document.getElementsByName('btn_enviar')[0];
const commentField = document.getElementsByName('commit_contact')[0];

const errorList = document.getElementById('errors');

function showErrors(element, message){
    element.classList.add('error');
    errorList.innerHTML += `<li>${message}</li>`
}

function cleanErrors(){
    errorList.innerHTML = '';
    nameField.classList.remove("error");
    emailField.classList.remove("error");
    phoneField.classList.remove("error");
    commentField.classList.remove("error");
}


async function sendMail(name, email, phone, select, comment){
    await fetch ('https://30kd6edtfc.execute-api.us-east-1.amazonaws.com/prod/send-email', {
    method: 'POST',
    headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({name, email, phone, select, comment})
    });
    const content = await rawResponse.json();
}






sendButton.addEventListener('click', (event) => {
    event.preventDefault();
    let hasErrors = false;

    cleanErrors();

    const nameClean = nameField.value.trim();
    if(nameClean.length == 0 || nameClean.indexOf(' ') < 0){
        showErrors(nameField, 'Error en el nombre y apellido');
        hasErrors = true;
    }

    const emailRE = /\w+@\w+\.\w{2,10}/;
    if(!emailRE.exec(emailField.value)){
        showErrors(emailField, 'Error en el email');
        hasErrors = true;
    }

    const phoneRE = /^\+?\d{7,15}$/;
    const phoneClean = phoneField.value.replace(' ','');
    if(!phoneRE.exec(phoneClean)){
        showErrors(phoneField, 'Error en el teléfono');
        hasErrors = true;
    }
    
    const commentClean = commentField.value.trim();
    if(commentClean.length < 20){
        showErrors(commentField, 'Error en el comentario');
        hasErrors = true;
    }

    if(!hasErrors){
        sendMail(nameClean, emailField.value, phoneClean, skillField.value, commentClean);
    }





});