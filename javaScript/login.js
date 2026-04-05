let listAccount=[
    {id: `Id1`, email: "abc@gmail.com", password:"admin123", fullname:"TienNam", phone:" 09354873264", role:"admin", createAt:"31/3/2026"},
    {id: `Id2`, email: "tiennamz@gmail.com", password:"tiennamz@gmail.com", fullname:"Tien Nam", phone:" 09354873264", role:"user", createAt:"31/3/2026"}
]

// khai báo
let emailInput=document.getElementById("email-inp")
let passwordInput=document.getElementById("inp-password")
let emailValid=document.getElementById("valid-email")
let passwordValid=document.getElementById("valid-password")
let btnLogin=document.getElementById("btn-login")

const getData=()=>{
    let data=localStorage.getItem("users")
    if(data){
        listAccount=JSON.parse(data)
    }
}

const loginAccount=()=>{
    getData()
    let rawEmail=emailInput.value.trim()
    let isEmail=true
    let rawPassword=passwordInput.value.trim()
    let isPassword=true


// ktra tài khoản có tồn tại k
    let isAccount=true
    let indexAccount=listAccount.findIndex((account)=>{
        return account.email===rawEmail
    })

    if(indexAccount===-1){
        passwordValid.innerText="Tài khoản không tồn tại"
        emailValid.innerText="Tài khoản không tồn tại"
        isAccount=false
    }else if(listAccount[indexAccount].password!==rawPassword){
        emailValid.innerText=""
        passwordValid.innerText="Mật khẩu không đúng"
        isAccount=false
    }

    if(isAccount===true){
        Swal.fire({
    title: 'Thành công!',
    text: 'Đăng ký tài khoản thành công. Hệ thống sẽ chuyển đến trang tiếp theo',
    icon: 'success',
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Chuyển trang ngay'
}).then(() => {
    localStorage.setItem("currentUser", JSON.stringify(listAccount[indexAccount]))
    if(listAccount[indexAccount].role==="user"){
        window.location.href="./home.html"  
    }else if(listAccount[indexAccount].role==="admin"){
        window.location.href="./adminManagerSchedule.html"
    }
});
    }


    const  hasEmail=(str)=> {
    // Regex: tìm ký tự không nằm trong khoảng a-z, A-Z, 0-9
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(str);
    }

    if(rawEmail==""){
        emailValid.innerText="Email không được trống"
        isEmail=false
    }else if(!hasEmail(rawEmail)){
        emailValid.innerText="Email không đúng định dạng"
        isEmail=false
    }

    // mật khẩu
    
    if(rawPassword==""){
        passwordValid.innerText="Mật khẩu không được trống"
        isPassword=false
    }else if(rawPassword.length<8){
        passwordValid.innerText="Mật khẩu không được dưới 8 ký tự"
        isPassword=false
    }

    
    
}
btnLogin.addEventListener("click",(e)=>{
    e.preventDefault()
    loginAccount()
})