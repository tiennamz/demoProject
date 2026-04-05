let listClass=[
    {id: 1, name: "Gym", description:"Tập luyện với các thiết bị hiện đại", image:"../img/Image [w-full].png" },
    {id: 2, name: "Yoga", description:"Thư giãn và cân bằng tâm trí", image:"../img/yoga.png" },
    {id: 3, name: "Zumba", description:"Đốt cháy calories với những điệu nhảy sôi động", image:"../img/zumba.png" },
]
let listSchedules=[
    {id: `${Date.now()}`, userId:`Id2`, classId:1, date:`2026-04-01`, time:`7:00-9:00`, status:"pending", createdAt:"01/04/2026", updatedAt:"01/04/2026"},
    {id: `${Date.now()+1}`, userId:`Id1`, classId:1, date:`2026-04-01`, time:`7:00-9:00`, status:"pending", createdAt:"01/04/2026", updatedAt:"01/04/2026"},
    {id: `${Date.now()+2}`, userId:`Id2`, classId:3, date:`2026-04-01`, time:`7:00-9:00`, status:"pending", createdAt:"01/04/2026", updatedAt:"01/04/2026"},
    {id: `${Date.now()+3}`, userId:`Id1`, classId:1, date:`2026-04-01`, time:`7:00-9:00`, status:"pending", createdAt:"01/04/2026", updatedAt:"01/04/2026"},
]

// khai báo

listSchedules=JSON.parse(localStorage.getItem("Schedules")) || []
let currentUser=JSON.parse(localStorage.getItem("currentUser"))
let spanManagerAdmin=document.getElementById('span-manager-admin')
let spanHello=document.getElementById("span-hello")
let spanLogout=document.getElementById("span-logout")
let spanLogin=document.getElementById("span-login")
let nameUser=document.getElementById("name")
let btnAddShedule=document.querySelectorAll(".btn")
let containerService=document.getElementById("container")
let classInput=document.getElementById("class-schedule")
let dateInput=document.getElementById("date-schedule")
let timeInput=document.getElementById("time-schedule")
let validateDate=document.getElementById("valid-date")
let validateClass=document.getElementById("valid-class")
let validateTime=document.getElementById("valid-time")
let formAddSchedule = document.getElementsByClassName("form-add-schedule")[0]
let btnAddSchedule = document.getElementsByClassName("confirm-add")[0]
let btnCancel = document.getElementsByClassName("cancel")[0]
let overlay = document.getElementsByClassName("overlay")[0]


// ẩn hiện khi chưa gì đã đăng nhập
let ownSchedule
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
        ownSchedule=listSchedules.filter((schedule)=>{
        return currentUser.id===schedule.userId && schedule.status!=="cancel"
    })
    }
}
showLink()

spanLogout.addEventListener("click",()=>{
    localStorage.removeItem("currentUser")
})



const getDataClass=()=>{
    let data=localStorage.getItem("Class")
    if(data){
        listClass=JSON.parse(data)
    }
    listClass.sort((a,b)=>{
        return a.name.localeCompare(b.name,'VN-vi')
    })

}
getDataClass()

let renderDataService=()=>{
    getDataClass()
    containerService.innerHTML=""
    listClass.forEach((service)=>{
        containerService.innerHTML+=`
            <div class="item">
                <img class="img-booking" src="${service.image}">
                <div class="content">
                    <p class="name-of-class">${service.name}</p>
                    <p class="describe">${service.description}</p>
                </div>
                <button onclick="bookingClass(${service.id})" class="btn book" type="submit">Đặt lịch</button>
            </div>
        `
    })
}
renderDataService()

const createDate=()=>{
    let now=new Date()
    let date=`${now.getFullYear()}-${now.getMonth()+1 < 10 ? 0 : ""}${now.getMonth()+1}-${now.getDate()<10 ? 0 : ""}${now.getDate()}`
    return date
}

const resetForm=()=>{
    classInput.value=""
    timeInput.value=""
    dateInput.value=""
    validateDate.innerText=""
    validateClass.innerText=""
    validateTime.innerText=""
}

const openForm=()=> {
    formAddSchedule.classList.remove("hidden")
    overlay.classList.remove("hidden")
    resetForm()
}

const closeForm=()=> {
    formAddSchedule.classList.add("hidden")
    overlay.classList.add("hidden")
    resetForm()

}


btnCancel.addEventListener("click", (e) => {
    e.preventDefault()
    closeForm()
    
})

overlay.addEventListener("click", () => {
    closeForm()
})

let idClass
const bookingClass=(id)=>{
    // sang trang đăng nhập khi chưa đăng nhập
        if(currentUser==undefined){ 
                Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Bạn chưa đăng nhập!!! Đang chuyển đến trang đang nhập cho bạn",
            timer: 5000,
            timerProgressBar: true,
                }).then(()=>{
                    window.location.href="./login.html"
                })
    }
    openForm()
    classInput.value=id
    idClass=id
    
}

const addInputNameClass=()=>{
    getDataClass()
    classInput.innerHTML=`<option value="">Chọn lớp học</option>`
    listClass.forEach((service)=>{
        classInput.innerHTML+=`
            <option value="${service.id}">${service.name}</option>
        `
    })
}
addInputNameClass()

btnAddSchedule.addEventListener("click",(e)=>{
    e.preventDefault()
    const checkValidateForm=()=>{

    let rawDate=dateInput.value
    let rawTime=timeInput.value
    
    validateClass.innerText=""
    validateDate.innerText=""
    validateTime.innerText=""
    const isDatePast=()=>{
        let isPast=false
        let mns=+new Date(rawDate)
        if(mns-Date.now()<0){
            isPast=true
        }        
        return isPast
    }
    let isValid=true
    
    if(rawDate==""){
        validateDate.innerText="Ngày tập trống"
        isValid=false
    }else if(isDatePast()){
        validateDate.innerText="Ngày tập đã qua"
        isValid=false
    }
    if(rawTime==""){
        validateTime.innerText="Giờ tập trống"
        isValid=false
    }
    if(isValid==true){
        let isExisted=ownSchedule.some((schudule)=>{
            return schudule.date===rawDate && schudule.time===rawTime 
        })
        if(isExisted){
            validateDate.innerText="Bạn đã có lịch tập tại thời điểm này rồi "
            validateTime.innerText="Bạn đã có lịch tập tại thời điểm này rồi "
            isValid=false
        }
    }
        return isValid
}
    if(checkValidateForm()){
        let newSchedule={
            id:`${Date.now()}`,
            userId:`${currentUser.id}`,
            classId:idClass,
            date:`${dateInput.value}`,
            time:`${timeInput.value}`,
            status:"pending",
            createdAt:`${createDate()}`,
            updatedAt:`${createDate()}`
        }
        listSchedules.push(newSchedule)
        localStorage.setItem("Schedules",JSON.stringify(listSchedules))
        closeForm()
    }
})