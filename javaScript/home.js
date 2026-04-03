
// khai báo
let currentUser=JSON.parse(localStorage.getItem("currentUser"))
let spanManagerAdmin=document.getElementById('span-manager-admin')
let spanHello=document.getElementById("span-hello")
let spanLogout=document.getElementById("span-logout")
let spanLogin=document.getElementById("span-login")
let nameUser=document.getElementById("name")
let btnAddShedule=document.querySelectorAll(".btn")


// ẩn hiện khi chưa gì đã đăng nhập
const showLink=()=>{
    if(currentUser==undefined){
        spanLogin.style.display="inline-block"
        spanManagerAdmin.style.display="none"
        spanHello.style.display="none"
        spanLogout.style.display="none"
        return
    }else{
        spanLogin.style.display="none"
        spanHello.style.display="inline-block"
        spanLogout.style.display="inline-block"
        nameUser.innerText=`${currentUser.fullname}`

        if(currentUser.role=="admin"){
            spanManagerAdmin.style.display="inline-block"
        }
    }
}
showLink()

spanLogout.addEventListener("click",()=>{
    localStorage.removeItem("currentUser")
})

// sang trang đăng nhập khi chưa đăng nhập
const navigateLogin=()=>{
    if(currentUser==undefined){
        btnAddShedule.forEach((btn)=>{
            btn.addEventListener("click",()=>{
                Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Bạn chưa đăng nhập!!! Đang chuyển đến trang đang nhập cho bạn",
            timer: 5000,
            timerProgressBar: true,
                }).then(()=>{
                    window.location.href="./login.html"
                })
            })
        })
        return
    }
}
navigateLogin()

