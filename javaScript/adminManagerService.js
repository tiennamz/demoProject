let listClass=[
    {id: 1, name: "Gym", description:"Tập luyện với các thiết bị hiện đại", image:"../img/Image [w-full].png" },
    {id: 2, name: "Yoga", description:"Thư giãn và cân bằng tâm trí", image:"../img/yoga.png" },
    {id: 3, name: "Zumba", description:"Đốt cháy calories với những điệu nhảy sôi động", image:"../img/zumba.png" },
]


// khai báo 
let overlay=document.getElementById("overlay")
let formService=document.getElementById("popup-add-service")
let btnCancel=document.getElementById("btn-cancel")
let btnConfirmAddService=document.getElementById("btn-add-service")
let btnAddService=document.getElementById("btn-add-new-service")
let confirmDeleteService=document.getElementById("popup-delete-service")
let btnCancelDeleteService=document.getElementById("btn-cancel-delete-service")
let classTbodyElement=document.getElementById("list-class")
let nameClassInput=document.getElementById("input-name-of-service")
let describeClassInput=document.getElementById("input-describe-service")
let imgClassInput=document.getElementById("input-img-service")
let nameValidate=document.getElementById("validate-name")
let describeValidate=document.getElementById("validate-describe")
let imgValidate=document.getElementById("validate-img")
let titleForm=document.getElementById("title-form")
let btnConfirmEdit=document.getElementById("btn-confirm-edit-service")
let btnConfirmDeleteService=document.getElementById("btn-confirm-delete-service")





// reset form
const resetForm=()=>{
    nameClassInput.value=""
    describeClassInput.value=""
    imgClassInput.value=""
    nameValidate.innerText=""
    describeValidate.innerText=""
    imgValidate.innerText=""
}




// popup
const closeForm=()=>{
    overlay.classList.add("hidden")
    formService.classList.add("hidden")
    confirmDeleteService.classList.add("hidden")
    titleForm.innerText="Thêm dịch vụ mới"
    btnConfirmEdit.style.display="none"
    btnConfirmAddService.style.display="inline-block"

}

const openForm=()=>{
    overlay.classList.remove("hidden")
    formService.classList.remove("hidden")
    
}

const closeModalConfirmDelete=()=>{
    confirmDeleteService.classList.add("hidden")
    overlay.classList.add("hidden")
}

const openModalConfirmDelete=()=>{
    confirmDeleteService.classList.remove("hidden")
    overlay.classList.remove("hidden")

}


btnCancel.addEventListener("click",(e)=>{
    e.preventDefault()
    closeForm()
    resetForm()
    Swal.fire({
  title: "Cancel!",
  icon: "error",
  text:"Đã hủy sửa dịch vụ",
  timer:3000
});
})

btnCancelDeleteService.addEventListener("click",()=>{
    closeModalConfirmDelete()
    Swal.fire({
  title: "Cancel!",
  icon: "error",
  text:"Đã hủy xóa dịch vụ",
  timer:3000
});
})

overlay.addEventListener("click",()=>{
    closeModalConfirmDelete()
    closeForm()
    resetForm()
})

btnAddService.addEventListener("click",(e)=>{
    e.preventDefault()
    openForm()
})





// CRUD
const getDataClass=()=>{
    let data=localStorage.getItem("Class")
    if(data){
        listClass=JSON.parse(data)
    }
}

const saveDataClass=()=>{
    localStorage.setItem("Class",JSON.stringify(listClass))
}

const renderDataClass=()=>{
    getDataClass()
    classTbodyElement.innerHTML=""
    listClass.forEach((service)=>{
        classTbodyElement.innerHTML+=`
        <tr>
            <td>${service.name}</td>
            <td class="describe">${service.description}</td>
            <td><img class="img-service" src="${service.image}" alt=""></td>
            <td>
                <button onclick="updateService(${service.id})" class="btn btn-edit-service">Sửa</button> 
                <button onclick="deleteService(${service.id})" class="btn btn-delete-service">Xóa</button>
            </td>
        </tr>
        `
    })
}
renderDataClass()


btnConfirmAddService.addEventListener("click",(e)=>{
    e.preventDefault()
    // tên class
    let isValid=true
    let rawName=nameClassInput.value.trim()
    const isExistedNameOfClass=()=>{
        let isExisted=listClass.some((service)=>{
            return service.name.toLowerCase()===rawName.toLowerCase()
        })
        return isExisted

    }
    if(!rawName){
        nameValidate.innerText="Tên lớp đang trống"
        isValid=false
    }else if(isExistedNameOfClass()){
        nameValidate.innerText="Tên lớp đã tồn tại"
        isValid=false
    }

    // describe
    let rawDescribe=describeClassInput.value.trim()
    if(rawDescribe==""){
        describeValidate.innerText="Mô tả bị trống"
        isValid=false
    }
    
    // describe
    let rawImage=imgClassInput.value.trim()
    if(rawImage==""){
        imgValidate.innerText="Ảnh bị trống"
        isValid=false
    }

    if(isValid){
        let newService={
            id: Date.now(),
            name: rawName[0].toUpperCase()+rawName.slice(1),
            description: rawDescribe,
            image: rawImage
        }
        listClass.push(newService)
        saveDataClass()
        resetForm()
        closeForm()
        Swal.fire({
            title: "Thành công!",
            icon: "success",
            text:"Đã thêm 1 dịch vụ khác thành công",
            timer:3000,
        });
        renderDataClass()
    }
})

const findIndexById=(id)=>{
    let indexSearch=listClass.findIndex((el)=>{
        return el.id===id
    })
    return indexSearch
}
let indexUpdate=-1
const updateService=(id)=>{
    indexUpdate=findIndexById(id)
    openForm()
    nameClassInput.value=listClass[indexUpdate].name
    describeClassInput.value=listClass[indexUpdate].description
    imgClassInput.value=listClass[indexUpdate].image
    titleForm.innerText="Cập nhật dịch vụ"
    btnConfirmEdit.style.display="inline-block"
    btnConfirmAddService.style.display="none"
}
btnConfirmEdit.addEventListener("click",(e)=>{
    e.preventDefault()
    let isValid=true
    let rawName=nameClassInput.value.trim()
    const isExistedNameOfClass=()=>{
        let isExisted=listClass.some((service, index)=>{
            return service.name.toLowerCase()===rawName.toLowerCase() && index!== indexUpdate
        })
        return isExisted

    }
    if(!rawName){
        nameValidate.innerText="Tên lớp đang trống"
        isValid=false
    }else if(isExistedNameOfClass()){
        nameValidate.innerText="Tên lớp đã tồn tại"
        isValid=false
    }

    // describe
    let rawDescribe=describeClassInput.value.trim()
    if(rawDescribe==""){
        describeValidate.innerText="Mô tả bị trống"
        isValid=false
    }
    
    // describe
    let rawImage=imgClassInput.value.trim()
    if(rawImage==""){
        imgValidate.innerText="Ảnh bị trống"
        isValid=false
    }
    if(isValid){
        listClass[indexUpdate].name=rawName
        listClass[indexUpdate].description=rawDescribe
        listClass[indexUpdate].image=rawImage
        saveDataClass()
        closeForm()
        resetForm()
        Swal.fire({
            title: "Thành công!",
            icon: "success",
            text:"Đã cập nhật dịch vụ thành công",
            timer:3000,
        });
        renderDataClass()
    }
})


let indexDelete=-1
const deleteService=(id)=>{
    indexDelete=findIndexById(id)
    openModalConfirmDelete()
}
btnConfirmDeleteService.addEventListener("click",()=>{
    listClass.splice(indexDelete,1)
    saveDataClass()
    Swal.fire({
            title: "Thành công!",
            icon: "success",
            text:"Đã xóa dịch vụ thành công",
            timer:3000,
    });
    closeModalConfirmDelete()
    renderDataClass()
})