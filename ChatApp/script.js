const $ = (element) => document.getElementById(element);

const chatbox = $('chatbox');
const inputMsg = $('blue-block');
const table = $('tb-wrapper');
const addBtn = $('add-btn');
const addForm = $('add-friends');
const closeBtn = $('close-btn');
const addConfirmation = $('add-confirmation');
const contactName = $('contact-name');
const contactInput = $('new-contact-name');

const btnArr = [];
const contactList = [];
let buttonContactList = [];    
const storagedBtns = localStorage.getItem('contacts');
buttonContactList = JSON.parse(storagedBtns || '[]');

const newArr = []

const mainContainer = document.getElementsByClassName('tb-columns');
const lastElement = mainContainer[mainContainer.length - 1];

if(buttonContactList){
    lastElement.innerHTML = buttonContactList.join('');
}

// DECLARED VARIABLES HERE BECAUSE localStorage ALREADY LOADED;
const contactClass = document.querySelectorAll('.contact-btn');
const contactSpan = document.querySelectorAll('.contact-style');

let oldNames = []
contactSpan.forEach(e =>{oldNames.push(e.innerText)})

//SAVED BUTTONS EVENTS
contactClass.forEach(e => {
    e.addEventListener('click', () =>{
        chatbox.style.visibility = 'visible';
        inputMsg.style.visibility = 'visible';
    })
});

contactClass.forEach(e =>{
    e.addEventListener('click', () => {
        addForm.style.display = 'none';
    })
})

contactClass.forEach((e, i) =>{
    e.addEventListener('click', () => {
        contactName.innerText = contactSpan[i].innerText;
        });
    })

contactClass.forEach(button => {
    button.addEventListener('click', () => {
        contactClass.forEach(button => button.classList.remove('active'))
        btnArr.forEach(button => button.classList.remove('active'));
        button.classList.add('active');
    });
});

//STATIC BUTTONS EVENTS
addBtn.addEventListener('click', event =>{
    addForm.style.display = 'flex';
});

closeBtn.addEventListener('click', event =>{
    addForm.style.display = 'none';
});

addConfirmation.addEventListener('click', () =>{
    if(validateInput(contactInput, oldNames) === false){
            addForm.style.display = 'flex';
    }
    else{
        addForm.style.display = 'none';
        saveName();
    }
});

//NAME TO CONTACT NAME H2 TAG
function saveName(){
    let names = contactInput.value;
    contactList.push(names);
    createContact(names);
}

function createContact(contact){
    const newButton = document.createElement('button');
    const newImg = document.createElement('img');
    const newSpan = document.createElement('span');
    const newName = document.createTextNode(contact);

    newButton.classList.add('contact-btn');
    newImg.classList.add('pfp');
    newSpan.classList.add('contact-style');

    newButton.appendChild(newImg);
    newButton.appendChild(newSpan);
    newSpan.appendChild(newName);

    lastElement.insertBefore(newButton, null);

    const newImgSrc = document.getElementsByClassName('pfp');
    const lastImg = newImgSrc[newImgSrc.length -1];
    lastImg.src = 'src/padre.jpg';

    btnArr.push(newButton);

    buttonContactList.push(newButton.outerHTML);
    localStorage.setItem('contacts', JSON.stringify(buttonContactList));

    //Created Button Events
    newButton.addEventListener('click', () =>{
        addForm.style.display = 'none';
    });

    newButton.addEventListener('click', () =>{
        chatbox.style.visibility = 'visible';
        inputMsg.style.visibility = 'visible';
    });
    
    newButton.addEventListener('click', () =>{
        contactName.innerText = newSpan.innerText;
    });

    btnArr.forEach(button => {
        button.addEventListener('click', () => {
            btnArr.forEach(button => button.classList.remove('active'));
            contactClass.forEach(button => button.classList.remove('active'))
            button.classList.add('active');
            });
      });
}

//Input Validation
function validateInput(input, oldContactArray){
    const validationMsg = $('validation-msg');
    let valid = true;
    let newExist = newArr.includes(input.value);
    let exist = oldContactArray.includes(input.value)

    if(!input.value){
        validationMsg.style.visibility = 'visible';
        valid = false;
    }else if(exist || newExist){
        validationMsg.innerText = "Already Exists"
        validationMsg.style.visibility = 'visible';
        valid = false;
    }

    if(!newExist){
        newArr.push(input.value);
    }

    return valid
}
