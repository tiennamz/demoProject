let listAccount=[
    {id: `Id1`, email: "abc@gmail.com", password:"admin123", fullname:"TienNam", phone:" 09354873264", role:"admin", createAt:"31/3/2026"},
    {id: `Id2`, email: "tiennamz@gmail.com", password:"tiennamz@gmail.com", fullname:"Tien Nam", phone:" 09354873264", role:"user", createAt:"31/3/2026"}
]
// khai báo
let fullnameInput=document.getElementById("fullname")
let emailInput=document.getElementById("email")
let passwordInput=document.getElementById("password")
let rePasswordInput=document.getElementById("re-password")
let fullnameValidate=document.getElementById("valid-fullname")
let emailValidate=document.getElementById("valid-email")
let passwordValidate=document.getElementById("valid-password")
let rePasswordValidate=document.getElementById("valid-re-password")
let btnRegister=document.getElementById("btn-register")



const getData=()=>{
    let data=localStorage.getItem("users")
    if(data){
        listAccount=JSON.parse(data)
    }
}

const saveData=()=>{
    localStorage.setItem("users",JSON.stringify(listAccount))
}

// reset input trong form
const resetForm=()=>{
    fullnameInput.value=""
    emailInput.value=""
    passwordInput.value=""
    rePasswordInput.value=""
    fullnameValidate.innerText=""
    emailValidate.innerText=""
    passwordValidate.innerText=""
    rePasswordValidate.innerText=""
}

let isRegister=false

const registerAccount=()=>{
    getData()
    // tên
    let rawName=fullnameInput.value.trim()
    let isName=true
    if(rawName==""){
        fullnameValidate.innerText="Họ và tên không được trống"
        isName=false
    }

    // email
    let rawEmail=emailInput.value.trim()
    let isEmail=true
    const  hasEmail=(str)=> {
    // Regex: tìm ký tự không nằm trong khoảng a-z, A-Z, 0-9
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(str);
    }
    // ktra email tồn tại
    const isExistedEmail=(newEmail)=>{
        let isExisted=listAccount.some((account=>{
            return account.email===newEmail
        }))
        return isExisted
    }
    if(rawEmail==""){
        emailValidate.innerText="Email không được trống"
        isEmail=false
    }else if(!hasEmail(rawEmail)){
        emailValidate.innerText="Email không đúng định dạng"
        isEmail=false
    }else if(isExistedEmail(rawEmail)){
        emailValidate.innerText="Email đã tồn tại"
        isEmail=false
    }

    // mật khẩu
    let rawPassword=passwordInput.value.trim()
    let isPassword=true
    if(rawPassword==""){
        passwordValidate.innerText="Mật khẩu không được trống"
        isPassword=false
    }else if(rawPassword.length<8){
        passwordValidate.innerText="Mật khẩu không được dưới 8 ký tự"
        isPassword=false
    }

    // nhập lại mk
    let rawRePassword=rePasswordInput.value.trim()
    let isRePassword=true
    if(rawRePassword==""){
        rePasswordValidate.innerText="Mật khẩu không được trống"
        isRePassword=false
    }else if(rawRePassword!==rawPassword){
        rePasswordValidate.innerText="Mật khẩu nhập lại không đúng"
        isRePassword=false
    }


    // hàm tạo ngày
    const createDate=()=>{
        let now=new Date()
        let date=`${now.getDate()}/${now.getMonth()+1}/${now.getFullYear()}`
        return date
    }

    if(isName==true && isEmail==true && isPassword==true && isRePassword==true){
        let newAccount={
            id:`${Date.now()}`,
            email: rawEmail,
            createAt: `${createDate()}`,
            fullname:rawName,
            phone:"012345678",
            role:"user",
            password:rawPassword
        }
        listAccount.push(newAccount)
        resetForm()
        saveData()
        window.location.href="./login.html"

    }
}

rePasswordInput.addEventListener("keydown",(e)=>{
    // e.preventDefault()
    if(e.key=="Enter"){
        registerAccount()
    }
})
btnRegister.addEventListener("click",(e)=>{
    e.preventDefault()
    fullnameValidate.innerText=""
    emailValidate.innerText=""
    passwordValidate.innerText=""
    rePasswordValidate.innerText=""
    registerAccount()
})

