let listSchedules=[
    {id: `${Date.now()}`, userId:`Id2`, classId:1, date:`2026-04-01`, time:`7:00-9:00`, status:"pending", createdAt:"01/04/2026", updatedAt:"01/04/2026"},
    {id: `${Date.now()+1}`, userId:`Id1`, classId:1, date:`2026-04-01`, time:`7:00-9:00`, status:"pending", createdAt:"01/04/2026", updatedAt:"01/04/2026"},
    {id: `${Date.now()+2}`, userId:`Id2`, classId:3, date:`2026-04-01`, time:`7:00-9:00`, status:"pending", createdAt:"01/04/2026", updatedAt:"01/04/2026"},
    {id: `${Date.now()+3}`, userId:`Id1`, classId:1, date:`2026-04-01`, time:`7:00-9:00`, status:"pending", createdAt:"01/04/2026", updatedAt:"01/04/2026"},
]

let currentUser = JSON.parse(localStorage.getItem("currentUser"))
let btnAddSchedule = document.getElementsByClassName("add-schedule")[0]
let formAddSchedule = document.getElementsByClassName("form-add-schedule")[0]
let overlay = document.getElementsByClassName("overlay")[0]
let btnCancel = document.getElementsByClassName("cancel")[0]
let scheduleElement=document.getElementById("list-schedule")
let classInput=document.getElementById("class-schedule")
let dateInput=document.getElementById("date-schedule")
let timeInput=document.getElementById("time-schedule")
let confirmAddSchedule=document.getElementById("confirm-add")
let validateDate=document.getElementById("valid-date")
let validateClass=document.getElementById("valid-class")
let validateTime=document.getElementById("valid-time")
let spanLogin=document.getElementById("span-login")
let tittleForm=document.getElementById("title-form")
let confirmUpdateSchedule=document.getElementById("confirm-edit")
let modalDelete=document.getElementById("modal-box")
let btnCancelDeleteModal=document.getElementById("closeDeleteModal")
let confirmDelete=document.getElementById("yesDelete")
let paginationElement=document.getElementById("pagination")

// hàm tạo ngày
const createDate=()=>{
    let now=new Date()
    let date=`${now.getFullYear()}-${now.getMonth()+1 < 10 ? 0 : ""}${now.getMonth()+1}-${now.getDate() < 10 ? 0 : ""}${now.getDate()}`
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
    validateClass.innerText=""
    validateDate.innerText=""
    validateTime.innerText=""
}

const closeForm=()=> {
    formAddSchedule.classList.add("hidden")
    overlay.classList.add("hidden")
    resetForm()
    tittleForm.innerText="Thêm lịch mới"
    confirmAddSchedule.style.display="inline-block"
    confirmUpdateSchedule.style.display="none"
}

const openModalDelete=()=>{
    modalDelete.classList.remove("hidden")
    overlay.classList.remove("hidden")

}

const closeModalDelete=()=>{
    modalDelete.classList.add("hidden")
    overlay.classList.add("hidden")

}


btnAddSchedule.addEventListener("click", (e) => {
    e.preventDefault()
    openForm()
})

btnCancel.addEventListener("click", (e) => {
    e.preventDefault()
    closeForm()
    
})

btnCancelDeleteModal.addEventListener("click",closeModalDelete)

overlay.addEventListener("click", () => {
    closeForm()
    closeModalDelete()
})

const getDataSchedule=()=>{
    let dataSchedule=localStorage.getItem("Schedules")
    if(dataSchedule){
        listSchedules=JSON.parse(dataSchedule)
    }
}
getDataSchedule()

const saveSchedule=()=>{
    localStorage.setItem("Schedules", JSON.stringify(listSchedules))
}

let ownSchedule

console.log(currentUser);

const render=()=>{
    getDataSchedule()
    if(currentUser==null){
        Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Bạn chưa đăng nhập, hãy đăng nhập để xem lịch tập của bạn",
        });
        return
    }
    
    ownSchedule=listSchedules.filter((schedule)=>{
        return currentUser.id===schedule.userId && schedule.status!=="cancel"
    })
    if(ownSchedule.length==0){
        scheduleElement.innerHTML=`<tr><td colspan="6" style="text-align:center">Danh sách lịch tập trống</td></tr>`
        Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Danh sách lịch tập trống",
});
return
}

scheduleElement.innerHTML=""
ownSchedule.forEach((schedule)=>{
    let nameClass
    if(schedule.classId==1){
        nameClass="Gym"
    }else if(schedule.classId==2){
        nameClass="Yoga"
    }else if(schedule.classId==3){
        nameClass="Zumba"
    }
    
    scheduleElement.innerHTML+=
        `
            <tr>
                <td>${nameClass}</td>
                <td>${schedule.date}</td>
                <td>${schedule.time}</td>
                <td>${currentUser.fullname}</td>
                <td>${currentUser.email}</td>
                <td>
                    <button class="edit-schedule" onclick="updateSchedule('${schedule.id}')">Sửa</button>
                    <button class="delete-schedule" onclick="deleteSchudule('${schedule.id}')">Xóa</button>
                </td>
            </tr>
        `
    })
}
render()


if(currentUser==null){
    btnAddSchedule.style.display="none"
    spanLogin.style.display="inline-block"
}else{
    spanLogin.style.display="none"
    
}

// check validate

const checkValidateForm=()=>{

    let rawClass=classInput.value
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
    if(rawClass==""){
        validateClass.innerText="Lớp học trống"
    isValid=false
    }
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

confirmAddSchedule.addEventListener("click",(e)=>{
    if(currentUser == null) {
        return
    }
    e.preventDefault()
    if(checkValidateForm()){
        
        let newSchudule={
            id: `${Date.now()}`,
            userId:`${currentUser.id}`,
            classId:+classInput.value,
            date:`${dateInput.value}`,
            time:`${timeInput.value}`,
            status:"pending",
            createdAt:`${createDate()}`,
            updatedAt:`${createDate()}`
        }
        listSchedules.push(newSchudule)
        saveSchedule()
        resetForm()
        closeForm()
        render()

        Swal.fire({
      title: "Oke rồi he!",
      icon: "success",
      timer: 3000,
      text: "Đặt lịch mới thành công",
    });
    }
})

// tìm index theo id
const findIndexById=(idSearch)=>{
    let indexSearch=listSchedules.findIndex((schedule)=>{
        return schedule.id==idSearch
    })
    return indexSearch
}
let indexEdit=-1
const updateSchedule=(id)=>{
    let index=findIndexById(id)
    indexEdit=index
    openForm()
    classInput.value=listSchedules[indexEdit].classId
    timeInput.value=listSchedules[indexEdit].time
    dateInput.value=listSchedules[indexEdit].date
    tittleForm.innerText="Chỉnh sửa lịch"
    confirmAddSchedule.style.display="none"
    confirmUpdateSchedule.style.display="inline-block"
}
confirmUpdateSchedule.addEventListener("click",(e)=>{
    e.preventDefault()

    if(checkValidateForm()){
        listSchedules[indexEdit].classId=classInput.value
        listSchedules[indexEdit].time=timeInput.value
        listSchedules[indexEdit].date=dateInput.value
        listSchedules[indexEdit].createdAt=`${createDate()}`
        tittleForm.innerText="Thêm lịch mới"
        confirmAddSchedule.style.display="inline-block"
        confirmUpdateSchedule.style.display="none"
        saveSchedule()
        closeForm()
        resetForm()
        render()
        Swal.fire({
      title: "Oke rồi he!",
      icon: "success",
      timer: 3000,
      text: "Đổi lịch mới thành công",
    });
    }
})

let indexDelete=-1
const deleteSchudule=(id)=>{
    let index=findIndexById(id)
    indexDelete=index
    openModalDelete()
}

confirmDelete.addEventListener("click",()=>{
    listSchedules[indexDelete].status="cancel"
    listSchedules[indexDelete].createdAt=`${createDate()}`
    saveSchedule()
    render()
    closeModalDelete()
    Swal.fire({
        title: "Hủy lịch thành công!",
        icon: "success",
        timer:3000
    });
})


