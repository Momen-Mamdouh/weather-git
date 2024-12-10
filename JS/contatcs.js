let contactsSendBtn = document.querySelector('.submit-contacts-btn');

let contactDataObject;
let contactsData = [];
let subscribedEmails = [];

//*========================Fn Getting InputsData and add it in object==================== > 

function gettingContactsData(){
    // Fn Getting InputsData and add it in object
    contactDataObject = {
        nameContact: document.querySelector('.name-input').value,
        emailContact: document.querySelector('.email-input').value,
        companyContact: document.querySelector('.company-input').value,
        websiteContact: document.querySelector('.website-input').value,
        feedback: document.querySelector('.comment-input').value,
    }
}
//*========================Fn Getting InputsData and add it in object==================== > 

//*========================Fn Getting subsribeInput data==================== > 




//*========================Click-Event Getting InputsData and save and clear inputs==================== > 

contactsSendBtn.addEventListener('click', ()=>{
    // Click-Event Getting InputsData and save and clear inputs
    gettingContactsData();
    if(contactDataObject.nameContact != "" && contactDataObject.emailContact != "" && 
        contactDataObject.companyContact != "" && contactDataObject.websiteContact != ""){
            contactsData.push(contactDataObject);
            localStorage.setItem("ContactData", JSON.stringify(contactsData))
            contactDataObject = {};
            location.href = "./contacts.html"
        }
    else{
        alert("Don't Send empty Contacts data")
    }
    
})
console.log(localStorage.getItem("ContactData"));

//*========================Click-Event Getting InputsData and save and clear inputs==================== > 

//*========================Fn Getting subsribeInput data==================== > 
let subsribeInput = document.querySelector('.subscribe-input');
function saveSubsribedEmail(){
    if(subsribeInput.value != ""){
        subscribedEmails.push(subsribeInput.value);
        localStorage.setItem("Subscribded Emails", JSON.stringify(subscribedEmails))
        subsribeInput.value = "";
        
    }
    else{
        alert("Please type vaild Email")
    }
}

document.querySelector('.subscribe-btn').addEventListener("click", ()=>{
    saveSubsribedEmail()
})
//*========================Fn Getting subsribeInput data==================== > 


//*========================Event to go home HTML=====================> 
document.querySelector('.home').addEventListener("click", (e)=>{
    location.href = "./index.html" 
});

document.querySelector('#home').addEventListener("click", (e)=>{
    location.href = "./index.html"   
});
//*========================Event to go home HTML=====================> 

