$(document).ready(function () {
    mostrarUsuario();
    inicial();
    $(".btn").click(function (event) {
        $(".needs-validation").addClass("was-validated");
    });

});

function mostrarUsuario() {
    $.ajax({
        url: "http://129.158.37.103:8081/api/user/all",
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
        url: "http://129.158.37.103:8081/api/user/new",
        data: JSON.stringify(myData),
        success: function (respuesta) {
            $("#resultado").empty();
            $("#username").val("");
            $("#useremail").val("");
            $("#password").val("");
            $("#passwordrepeat").val("");
            alert("¡Cuenta creada de forma correcta!");
            $(".needs-validation").removeClass("was-validated");
            mostrarUsuario();
            // mostrar();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("No fue posible crear la cuenta");
        }
    });
}

function existeEmail(email) {
    $.ajax({
        type: "GET",
        datatype: "JSON",
        url: "http://129.158.37.103:8081/api/user/" + email,
        success: function (respuesta) {
            if (respuesta) {
                console.log("Existe email", respuesta, email);
                $("#useremail").val("");
                $("#msg_correo").text("El email existe, intente con otro");
                return true;
            } else {
                console.log("El email no existe");
                guardarUsuario();
                mostrar(); 
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

        if (nameValue != "" && passwordValue != "" && emailValue != "") {
                if(comparar(passwordValue, password1Value)){
                    if (isEmailFormated) {
                        existeEmail(emailValue);
                    } else {
                        // alert("Formato de email invalido");
                        console.log(`Formato de email invalido`);
                        $("#msg_correo").text("Formato de email invalido");
                    }
                }
        } else {
            console.log(`Campos vacios`)
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
        // alert("¡Las contraseñas no son iguales!");
        $("#passwordrepeat").val("");
        $("#password").val("");
        $("#msg_contraseña").text("Las contraseñas no son iguales, por favor vuelva a digitarla");
        $("#msg_contraseña1").text("Las contraseñas no son iguales, por favor vuelva a digitarla");
        console.log("Las contraseñas no son iguales");
        return false;
    }
}