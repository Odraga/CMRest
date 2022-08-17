const btn_login = document.querySelector("#btn_login")
const txt_username = document.querySelector("#txt_username")
const txt_password = document.querySelector("#txt_password")

const msg_err = document.querySelector("#msg_err")

const intentos = 2
var fail = 0

btn_login.addEventListener("click", function(){
    if(fail > intentos){
        window.location.replace("https://odraga.github.io/TensaiProgrammerWeb/")
    }
    else if(isNullOrEmpty(txt_username.value) ||  isNullOrEmpty(txt_password.value)){
        alert("No puede haber campos vacios . . .")
        //msg_err.innerHTML = "No puede haber campos vacios . . ."
        fail++
    }
    else{
        if (txt_username.value == "SD-20-30015"){
            if (txt_password.value == "1234"){

                let tables = [{"table":"Table 1", "status":false}, 
                                {"table":"Table 2", "status":false}, 
                                {"table":"Table 3", "status":false}, 
                                {"table":"Table 4", "status":false}, 
                                {"table":"Table 5", "status":false},
                                {"table":"Table 6", "status":false},
                                {"table":"Table 7", "status":false},
                                {"table":"Table 8", "status":false},
                                {"table":"Table 9", "status":false},
                                {"table":"Table 10", "status":false}]
                
                sessionStorage.setItem("num_orders", 0)
                localStorage.setItem("tables",JSON.stringify(tables))

                window.location.href = "templates/menu.html";
            }
            else{
                alert("Por favor verifique el el usuario y contraseña sean correctos . . .")
                //msg_err.innerHTML = 
                fail++
            }
        }
        else{
            alert("Por favor verifique el el usuario y contraseña sean correctos . . .")
            //msg_err.innerHTML = "Por favor verifique el el usuario y contraseña sean correctos . . ."
            fail++
        }
    }

    console.log(fail)
});

function isNullOrEmpty(value) {
    return (!value || value == undefined || value == "" || value.trim().length == 0);
}