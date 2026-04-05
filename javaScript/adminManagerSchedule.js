let listSchedules=[
    {id: `${Date.now()}`, userId:`Id2`, classId:1, date:`2026-04-01`, time:`7:00-9:00`, status:"pending", createdAt:"01/04/2026", updatedAt:"01/04/2026"},
    {id: `${Date.now()+1}`, userId:`Id1`, classId:1, date:`2026-04-01`, time:`7:00-9:00`, status:"pending", createdAt:"01/04/2026", updatedAt:"01/04/2026"},
    {id: `${Date.now()+2}`, userId:`Id2`, classId:3, date:`2026-04-01`, time:`7:00-9:00`, status:"pending", createdAt:"01/04/2026", updatedAt:"01/04/2026"},
    {id: `${Date.now()+3}`, userId:`Id1`, classId:1, date:`2026-04-01`, time:`7:00-9:00`, status:"pending", createdAt:"01/04/2026", updatedAt:"01/04/2026"},
]
// localStorage.setItem("Schedules",JSON.stringify(listSchedules))
let listClass=[
    {id: 1, name: "Gym", description:"Tập luyện với các thiết bị hiện đại", image:"../img/Image [w-full].png" },
    {id: 2, name: "Yoga", description:"Thư giãn và cân bằng tâm trí", image:"../img/yoga.png" },
    {id: 3, name: "Zumba", description:"Đốt cháy calories với những điệu nhảy sôi động", image:"../img/zumba.png" },
]

// khai báo
let tbodyListSchedule=document.getElementById("list-schedule")
let listAccount=JSON.parse(localStorage.getItem("users"))
let formUpdateSchedule=document.getElementById("form-add-schedule")
let overlay=document.getElementById("overlay")
let btnCancelUpdate=document.getElementById("cancel-update")
let modalConfirmDelete=document.getElementById("modal-box")
let btnCancelDelete=document.getElementById("closeDeleteModal")
let selectFilterNameClass=document.getElementById("filter-class")
let totalClass=document.getElementById("num-of-schedule")
let filterClass=document.getElementById("filter-class")
let linkElementSchedule=document.getElementById("link-manager-schedule")

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
getDataSchedule()
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



const addNewClassIntoFilter=()=>{
    getDataClass()
    filterClass.innerHTML=`<option value="all">Tất cả</option>`
    listClass.forEach((service)=>{
        filterClass.innerHTML+=`<option value="${service.id}">${service.name}</option>`
    })
}
addNewClassIntoFilter()

const checkHref=()=>{
    if(linkElementSchedule.href==="http://127.0.0.1:5501/html/adminManagerSchedule.html"){
        linkElementSchedule.classList.add("link-current")
    }
    
}
checkHref()



const renderStatisticalClass=()=>{
    getDataSchedule()
    totalClass.innerHTML=""
    listClass.forEach((service)=>{
        totalClass.innerHTML+=`
            <div class="schedule">
                <p class="name-of-schedule">Tổng số lịch ${service.name}</p>
                <p class="count-gym count-schedule">${listSchedules.reduce((acc,cur)=>cur.classId==service.id && cur.status!="cancel" ? acc+1 : acc ,0)}</p>
             </div>
        `
    })

}
renderStatisticalClass()
    




let adminListSchedules
const dataAdmin=()=>{
    getDataSchedule() 
    adminListSchedules=listSchedules.filter((schedule)=>{
        return schedule.status!=="cancel"
    })   

}


const renderDataSchedule=()=>{
    dataAdmin()
    if(adminListSchedules.length===0){
        tbodyListSchedule.innerHTML=`<tr><td colspan="6" style="text-align: center;">Chưa có ai đặt lịch tập</td></tr>`
        return
    }

    tbodyListSchedule.innerHTML=""
    adminListSchedules.forEach((user)=>{
            let nameClass
            listClass.forEach((service)=>{
                if(user.classId==service.id){
                    nameClass=service.name
                }

            })
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

// filter shedule


