$(document).ready(function () {
    mostrarUsuario();
    inicial();
});


function mostrarUsuario() {
    $.ajax({
        url: "http://localhost:8081/api/user/all",
        type: 'GET',
        datatype: "JSON",

        success: function (respuesta) {
            console.log(respuesta);
            let item = respuesta;
            for (i = 0; i < item.length; i++) {
                $("#resultado").append("<tr>");
                $("#resultado").append("<td>" + item[i].id + "</td>");
                $("#resultado").append("<td>" + item[i].email + "</td>");
                $("#resultado").append("<td>" + item[i].password + "</td>");
                $("#resultado").append("<td>" + item[i].name + "</td>");
                $("#resultado").append("</tr>");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Ha ocurrido un error");
        }
    });
}

function guardarUsuario() {
    let myData = {
        name: $("#username").val(),
        email: $("#useremail").val(),
        password: $("#password").val(),
    };
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        datatype: "JSON",
        url: "http://localhost:8081/api/user/new",
        data: JSON.stringify(myData),
        success: function (respuesta) {
            $("#resultado").empty();
            $("#username").val("");
            $("#useremail").val("");
            $("#password").val("");
            $("#passwordrepeat").val("");
            alert("¡Se ha registrado la informacion!");
            mostrarUsuario();
            // mostrar();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Ha ocurrido un error");
        }
    });
}

function existeEmail(email) {
    $.ajax({
        type: "GET",
        datatype: "JSON",
        url: "http://localhost:8081/api/user/" + email,
        success: function (respuesta) {
            if (respuesta) {
                console.log("Existe email", respuesta, email);
                alert("¡El email existe, intente con otro!");
                $("#username").val("");
                $("#useremail").val("");
                $("#password").val("");
                $("#passwordrepeat").val("");
                return true;
            } else {
                console.log("El email no existe");
                return false;
            }
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

function registrar(event) {
    try {
        event.preventDefault();
        const name = document.querySelector("#username");
        const email = document.querySelector("#useremail");
        const password = document.querySelector("#password");
        const password1 = document.querySelector("#passwordrepeat");
        //para quitar espacios en blancos
        const nameValue = name.value.toLowerCase().trim();
        const emailValue = email.value.toLowerCase().trim();
        const passwordValue = password.value.trim();
        const password1Value = password1.value.trim();

        console.log(`emailValue`, emailValue);
        console.log(`Comparar contraseñas`, passwordValue, password1Value);

        //Expresiones regulares
        const emailExpression = /\S+@\S+\.\S+/;

        const isEmailFormated = emailExpression.test(emailValue);
        console.log(`isEmailFormated`, isEmailFormated);

        if (nameValue != "" && passwordValue != "" && emailValue != "" &&
            comparar(passwordValue, password1Value)) {
            if (isEmailFormated) {
                if (!existeEmail(emailValue)) {
                }else{
                    guardarUsuario();
                    mostrar();                    
                }
            } else {
                alert("Formato de email invalido");
                console.log(`Formato de email invalido`)
            }
        } else {
            console.log(`Datos invalidos, revise que los campos esten bien digilenciados`)
        }

    } catch (error) {
        console.log(`error`, error);
    }
}

function comparar(pass1, pass2) {
    if (pass1 == pass2) {
        console.log("Las contraseñas son iguales");
        return true;
    } else {
        alert("¡Las contraseñas no son iguales!");
        console.log("Las contraseñas no son iguales");
        return false;
    }
}