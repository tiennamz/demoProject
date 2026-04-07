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
let filterEmail=document.getElementById("filter-email")
let filterDate=document.getElementById("filter-date")
let linkElementSchedule=document.getElementById("link-manager-schedule")
let inputUpdClass=document.getElementById("class-schedule")
let inputUpdDate=document.getElementById("date-schedule")
let inputUpdTime=document.getElementById("time-schedule")
let btnConfirmUpdate=document.getElementById("confirm-edit")
let validateDate=document.getElementById("valid-date")
let validateClass=document.getElementById("valid-class")
let validateTime=document.getElementById("valid-time")
let btnConfirmDelete=document.getElementById("yesDelete")
let chartElement=document.getElementById("chart-schudule")
const ctx = document.getElementById('chart-schudule');




//  popup sửa 
const openPopupUpdate=()=>{
    formUpdateSchedule.classList.remove("hidden")
    overlay.classList.remove("hidden")
    
    
}

const closePopupUpdate=()=>{
    formUpdateSchedule.classList.add("hidden")
    overlay.classList.add("hidden")
    validateClass.innerText=""
    validateDate.innerText=""
    validateTime.innerText=""
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
    Swal.fire({
  icon: "error",
  title: "Đã hủy chỉnh sửa",
  timer:3000
    });
})

btnCancelDelete.addEventListener("click",(e)=>{
    e.preventDefault()
    closeModalConfirmDelete()
    Swal.fire({
  icon: "error",
  title: "Đã hủy xóa lịch",
  timer:3000
    });
})

const getDataSchedule=()=>{
    let data=localStorage.getItem("Schedules")
    if(data){
        listSchedules=JSON.parse(data)
    }
}
getDataSchedule()

const saveSchedule=()=>{
    localStorage.setItem("Schedules", JSON.stringify(listSchedules))
}

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

const addNewClassIntoFormUpdate=()=>{
    inputUpdClass.innerHTML=`<option value="">Chọn lớp học</option>`
    listClass.forEach((service)=>{
        inputUpdClass.innerHTML+=`<option value="${service.id}">${service.name}</option>`
    })
}
addNewClassIntoFormUpdate()

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

dataAdmin()

const renderDataSchedule=()=>{
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
                    <button onclick="updateSchedule('${user.id}')" class="edit-schedule" >Sửa</button>
                    <button onclick="deleteSchedule('${user.id}')" class="delete-schedule" >Xóa</button>
                </td>
            </tr>
        `
    })
}
const loadDataAdminAndRender=()=>{
    dataAdmin()
    renderDataSchedule()
}
loadDataAdminAndRender()

const filterSchedule=()=>{
    getDataSchedule()
    adminListSchedules=listSchedules.filter((schedule)=>{
        return schedule.status!=="cancel"
    })
    if(filterClass.value!=="all"){   
        adminListSchedules=adminListSchedules.filter((schedule)=>{
            return schedule.classId==filterClass.value 
        })
    }

    if(filterEmail.value!==""){
        let arrayIdIncludeEmailInput=listAccount.filter((acc)=>{
            return acc.email.toLowerCase().includes(filterEmail.value.toLowerCase().trim())
        }).map(acc=>acc.id)

        adminListSchedules=adminListSchedules.filter((schedule)=>{
            return arrayIdIncludeEmailInput.includes(schedule.userId)
        })
    }

    if(filterDate.value!==""){
        adminListSchedules=adminListSchedules.filter((schedule)=>{
            return schedule.date===filterDate.value
        })
    }
    renderDataSchedule()
}

filterClass.addEventListener("change",filterSchedule)
filterEmail.addEventListener("keyup",filterSchedule)
filterDate.addEventListener("change",filterSchedule)


// chart
let chartInstance = null
const renderChart=()=>{
    chartElement.innerHTML=""
    getDataClass()
    getDataSchedule()
    let arrayClassAndCount=listClass.map((service)=>{
        return {
            name: service.name,
            count: listSchedules.filter((schedule)=>{
                return schedule.classId==service.id && schedule.status!=="cancel"
            }).length
        }
    })

    if (chartInstance) {
        chartInstance.destroy()
    }

  chartInstance=new Chart(ctx, {
    type: 'bar',
    data: {
        labels: arrayClassAndCount.map(el=>el.name),
      datasets: [{
        label: 'Số lượng lịch học',
        data: arrayClassAndCount.map((el)=>el.count),
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
            beginAtZero: true
        }
      }
    }
  });
}
renderChart()


// U
const findIndexById=(id)=>{
    let indexSearch=listSchedules.findIndex((schedule)=>{
        return schedule.id===id
    })
    return indexSearch
}
let indexUpdate=-1
const updateSchedule=(id)=>{
    indexUpdate=findIndexById(id)
    openPopupUpdate()
    inputUpdClass.value=listSchedules[indexUpdate].classId
    inputUpdDate.value=listSchedules[indexUpdate].date
    inputUpdTime.value=listSchedules[indexUpdate].time
}
btnConfirmUpdate.addEventListener("click",(e)=>{
    e.preventDefault()
    let rawClass=inputUpdClass.value
    let rawDate=inputUpdDate.value
    let rawTime=inputUpdTime.value
    
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
        let currentUserId =listSchedules[indexUpdate].userId
        let isExisted=listSchedules.some((schudule,index)=>{
            return schudule.date===rawDate && schudule.time===rawTime  && schudule.userId ===currentUserId && index!==indexUpdate && schudule.status!=="cancel"
        })
        if(isExisted){
            validateDate.innerText="Bạn đã có lịch tập tại thời điểm này rồi "
            validateTime.innerText="Bạn đã có lịch tập tại thời điểm này rồi "
            isValid=false
        }
    }
    if(isValid){
        listSchedules[indexUpdate].classId=inputUpdClass.value
        listSchedules[indexUpdate].date=inputUpdDate.value
        listSchedules[indexUpdate].time=inputUpdTime.value
        saveSchedule()
        closePopupUpdate()
        loadDataAdminAndRender()
        renderStatisticalClass()
        renderChart()
        Swal.fire({
            title: "Oke rồi đấy!",
            icon: "success",
            text:"Đã sửa lịch người dùng thành công",
            timer: 3000
        });
}
})
let indexDelete=-1
const deleteSchedule=(id)=>{
    openModalConfirmDelete()
    indexDelete=findIndexById(id)
}
btnConfirmDelete.addEventListener("click",()=>{
    listSchedules[indexDelete].status="cancel"
    saveSchedule()
    loadDataAdminAndRender()
    renderStatisticalClass()
    closeModalConfirmDelete()
    renderChart()
    Swal.fire({
    title: "Oke rồi nhá",
    icon: "success",
    text: "Đã xóa lịch tập thành công"
    });  
})
