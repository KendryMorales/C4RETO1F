$(document).ready(function () {
    inicial();
});

function loginEvento(event) {
    try {
        event.preventDefault();
        const email = document.querySelector("#email");
        const password = document.querySelector("#password");
        //para quitar espacios en blancos
        const emailValue = email.value.toLowerCase().trim();
        const passwordValue = password.value.trim();


        console.log(`emailValue`, emailValue);
        console.log(`passwordValue`, passwordValue);

        //Expresiones regulares
        const emailExpression = /\S+@\S+\.\S+/;

        const isEmailFormated = emailExpression.test(emailValue);
        console.log(`isEmailFormated`, isEmailFormated);

        if (emailValue != "" && isEmailFormated) {
            console.log(`email valido`);
            if (passwordValue != "") {
                console.log(`password valido`);
                sendDataAsync(emailValue, passwordValue);
            } else {
                console.log(`password no valido`);
            }
        } else {
            console.log(`email no valido`);
        }

    } catch (error) {
        console.log(`error`, error);
    }
}

async function sendDataAsync(email, password) {
    try {
        //await es espera a que responda
        //javascript solo procesa 1 al tiempo
        // const url = `${'http://localhost:8081/api/user'}/${email}/${password}`;
        const url = 'http://localhost:8081/api/user/' + email + '/' + password;
        const response = await fetch(url);
        const responseInJsonFormat = await response.json();
        console.log(`responseInJsonFormat`, responseInJsonFormat);

        mostrar();
        $("#resultado").append("<tr>");
        $("#resultado").append("<td>" + responseInJsonFormat.id + "</td>");
        $("#resultado").append("<td>" + responseInJsonFormat.email + "</td>");
        $("#resultado").append("<td>" + responseInJsonFormat.password + "</td>");
        $("#resultado").append("<td>" + responseInJsonFormat.name + "</td>");
        $("#resultado").append("</tr>");

        if (responseInJsonFormat.id) {
            console.log(`El usuario se autentico`, email);
            alert("Bienvenido, " + responseInJsonFormat.name);
        }else{
            alert("Sus datos son incorrectos o no esta registrado");
        }
    } catch (error) {
        console.log(`error`, error);
    }
}

function inicial() {
    $(".tabla_box").hide();
}

function mostrar() {
    $(".tabla_box").show(500);
}
