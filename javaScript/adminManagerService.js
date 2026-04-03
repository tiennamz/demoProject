


// khai báo 
let overlay=document.getElementById("overlay")
let formService=document.getElementById("popup-add-service")
let btnCancel=document.getElementById("btn-cancel")
let btnConfirmAddService=document.getElementById("btn-add-service")
let btnAddService=document.getElementById("btn-add-new-service")
let confirmDeleteService=document.getElementById("popup-delete-service")
let btnCancelDeleteService=document.getElementById("btn-cancel-delete-service")

const closeForm=()=>{
    overlay.classList.add("hidden")
    formService.classList.add("hidden")
    confirmDeleteService.classList.add("hidden")
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
})

btnCancelDeleteService.addEventListener("click",closeModalConfirmDelete)

overlay.addEventListener("click",closeForm)

btnAddService.addEventListener("click",(e)=>{
    e.preventDefault()
    openForm()
})