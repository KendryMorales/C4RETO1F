$(document).ready(function () {
    inicial();

    $(".btn").click(function (event) {
        $(".needs-validation").addClass("was-validated");
    });
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
                autenticar(emailValue, passwordValue);
            } else {
                console.log(`password no valido`);
            }
        } else {
            console.log(`email no valido`);
            $("#msg_email").text("Email no valido");
            $("#email").val("");
        }

    } catch (error) {
        console.log(`error`, error);
    }
}

function autenticar(email, pass) {
    $.ajax({
        type: "GET",
        datatype: "JSON",
        url: 'http://129.158.37.103:8081/api/user/'+email+'/'+pass,
        success: function (respuesta) {
            console.log(respuesta);
            if (respuesta.id) {
                console.log(`El usuario se autentico`, email);
                alert("Bienvenido, "+ respuesta.name);
                $(".needs-validation").removeClass("was-validated");
                $("#email").val("");
                $("#password").val("");
            } else {
                console.log("El usuario no existe");
                $("#email").val("");
                $("#password").val("");
                $("#msg_email").text("Email no registrado");
                $("#msg_contraseña").text("Contraseña errada");
                alert("Usuario no esta registrado");
            }

            mostrar();
            $("#resultado").append("<tr>");
            $("#resultado").append("<td>" + respuesta.id + "</td>");
            $("#resultado").append("<td>" + respuesta.email + "</td>");
            $("#resultado").append("<td>" + respuesta.password + "</td>");
            $("#resultado").append("<td>" + respuesta.name + "</td>");
            $("#resultado").append("</tr>");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Ha ocurrido un error");
        }
    });
}

function inicial() {
    $(".tabla_box").hide();
}

function mostrar() {
    $(".tabla_box").show(500);
}
