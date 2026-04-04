let listSchedules=[]

// khai báo
let tbodyListSchedule=document.getElementById("list-schedule")
let listAccount=JSON.parse(localStorage.getItem("users"))
let formUpdateSchedule=document.getElementById("form-add-schedule")
let overlay=document.getElementById("overlay")
let btnCancelUpdate=document.getElementById("cancel-update")
let modalConfirmDelete=document.getElementById("modal-box")
let btnCancelDelete=document.getElementById("closeDeleteModal")





//  popup sửa 
const openPopupUpdate=()=>{
    formUpdateSchedule.classList.remove("hidden")
    overlay.classList.remove("hidden")
}

const closePopupUpdate=()=>{
    formUpdateSchedule.classList.add("hidden")
    overlay.classList.add("hidden")
}

// popup confirm xóa
const openModalConfirmDelete=()=>{
    modalConfirmDelete.classList.remove("hidden")
    overlay.classList.remove("hidden")

}

const closeModalConfirmDelete=()=>{
    modalConfirmDelete.classList.add("hidden")
    overlay.classList.add("hidden")
}

// window.addEventListener("dblclick",openModalConfirmDelete)

overlay.addEventListener("click",()=>{
    closeModalConfirmDelete()
    closePopupUpdate()
})

btnCancelUpdate.addEventListener("click",(e)=>{
    e.preventDefault()
    closePopupUpdate()
})

btnCancelDelete
.addEventListener("click",(e)=>{
    e.preventDefault()
    closeModalConfirmDelete()
})



const getDataSchedule=()=>{
    let data=localStorage.getItem("Schedules")
    if(data){
        listSchedules=JSON.parse(data)
    }
}



 
const renderDataSchedule=()=>{
    getDataSchedule()    
    if(listSchedules.length===0){
        tbodyListSchedule.innerHTML=`<tr><td colspan="6" style="text-align: center;">Chưa có ai đặt lịch tập</td></tr>`
        return
    }
    tbodyListSchedule.innerHTML=""
    listSchedules.forEach((user)=>{
                let nameClass
            if(user.classId==1){
                nameClass="Gym"
            }else if(user.classId==2){
                nameClass="Yoga"
            }else if(user.classId==3){
                nameClass="Zumba"
            }
            let nameUser
            let emailUser
            listAccount.forEach((acc)=>{
                if(user.userId==acc.id){
                    nameUser=acc.fullname 
                    emailUser=acc.email
                }

            })
        tbodyListSchedule.innerHTML+=`
            <tr>
                <td>${nameClass}</td>
                <td>${user.date}</td>
                <td>${user.time}</td>
                <td>${nameUser}</td>
                <td>${emailUser}</td>
                <td>
                    <button class="edit-schedule" >Sửa</button>
                    <button class="delete-schedule" >Xóa</button>
                </td>
            </tr>
        `
    })
}
renderDataSchedule()

