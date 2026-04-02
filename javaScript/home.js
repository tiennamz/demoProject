
// khai báo
let currentUser=JSON.parse(localStorage.getItem("currentUser"))
let spanManagerAdmin=document.getElementById('span-manager-admin')
let spanHello=document.getElementById("span-hello")
let spanLogout=document.getElementById("span-logout")
let spanLogin=document.getElementById("span-login")
let nameUser=document.getElementById("name")

if(currentUser==undefined){
    spanLogin.style.display="inline-block"
    spanManagerAdmin.style.display="none"
    spanHello.style.display="none"
    spanLogout.style.display="none"
}else{
    spanLogin.style.display="none"
    spanHello.style.display="inline-block"
    spanLogout.style.display="inline-block"
    nameUser.innerText=`${currentUser.fullname}`
}

if(currentUser.role=="admin"){
    spanManagerAdmin.style.display="inline-block"
}

spanLogout.addEventListener("click",()=>{
    localStorage.removeItem("currentUser")
})