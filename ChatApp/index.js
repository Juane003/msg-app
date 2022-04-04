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
let btnArr = [];
//let contactList = [];

addBtn.addEventListener('click', event =>{
    addForm.style.display = 'flex';
});

closeBtn.addEventListener('click', event =>{
    addForm.style.display = 'none';
});

addConfirmation.addEventListener('click', () =>{
    if(validateInput(contactInput) === false){
        addConfirmation.addEventListener('click', event =>{
            addForm.style.display = 'flex';
        });
    }
    else{
        addConfirmation.addEventListener('click', event =>{
            addForm.style.display = 'none';
        });
        saveName();
    }
});

function saveName(){
    let names = contactInput.value;
    //contactList.push(names);
    createContact(names);
}

function createContact(contact){
    const mainContainer = document.getElementsByClassName('tb-columns');
    const lastElement = mainContainer[mainContainer.length - 1];

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

    addEvents(newButton, btnArr, newSpan);
}

function addEvents(button, array, newContactName){
    button.addEventListener('click', function(){addFormDisplay(button)});

    button.addEventListener('click', chatboxVisibility);
    
    button.addEventListener('click', (e =>{
        contactName.innerText = newContactName.innerText;
    }));

    stayPressed(array);
}

//Input Validation

function validateInput(input){
    const validationMsg = $('validation-msg');
    let valid = true

    if(!input.value){
        validationMsg.style.visibility = 'visible';
        valid = false;
    }
    return valid;
}

//EVENTS FUNCTIONS

function chatboxVisibility(){
    // const chatboxQuery = document.querySelector('.chatbox-text');
    // const boxStyle = getComputedStyle(chatboxQuery);
    // const visibility = boxStyle.visibility;
    
    //if(visibility === 'hidden'){
        chatbox.style.visibility = 'visible';
        inputMsg.style.visibility = 'visible';
    //}
    // else{
    //     chatbox.style.visibility = 'hidden';
    //     inputMsg.style.visibility = 'hidden';
    // }
}

function addFormDisplay(button){
    if(addForm.style.display === 'flex'){
        button.addEventListener('click', e => {
            addForm.style.display = 'none';
        });
    }
}

function stayPressed(buttons){
    buttons.forEach(button => {
        button.addEventListener('click', () => {
          buttons.forEach(button => button.classList.remove('active'));
          button.classList.add('active');
          });
      });
}
