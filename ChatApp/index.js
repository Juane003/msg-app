const $ = (element) => document.getElementById(element);

const chatbox = $('chatbox');
const inputMsg = $('blue-block');
const buttonContact = document.querySelectorAll('.contact-btn');
const addBtn = $('add-btn');
const addForm = $('add-friends');
const closeBtn = $('close-btn');
const addConfirmation = $('add-confirmation');

buttonContact.forEach(e => {e.addEventListener('click', chatboxVisibility)});

addBtn.addEventListener('click', event =>{
    addForm.style.display = 'flex';
});

closeBtn.addEventListener('click', event =>{
    addForm.style.display = 'none';
});

addConfirmation.addEventListener('click', createContact);

function chatboxVisibility(){
    let chatboxQuery = document.querySelector('.chatbox-text');
    let boxStyle = getComputedStyle(chatboxQuery);
    let visibility = boxStyle.visibility;
    
    if(visibility === 'hidden'){
        chatbox.style.visibility = 'visible';
        inputMsg.style.visibility = 'visible';
    }
    else{
        chatbox.style.visibility = 'hidden';
        inputMsg.style.visibility = 'hidden';
    }

}
function createContact(){
    const mainContainer = document.getElementsByClassName('tb-columns');
    const lastElement = mainContainer[mainContainer.length - 1];

    const newContact = document.createElement('div');
    const newButton = document.createElement('button');
    const newImg = document.createElement('img');
    const newSpan = document.createElement('span');
    const newName = document.createTextNode('M1xwell');

    newContact.classList.add('tb-columns');
    newButton.classList.add('contact-btn');
    newImg.classList.add('pfp');
    newSpan.classList.add('contact-style');

    newContact.appendChild(newButton);
    newButton.appendChild(newImg);
    newButton.appendChild(newSpan);
    newSpan.appendChild(newName);

    lastElement.insertBefore(newContact, null);

    const newImgSrc = document.getElementsByClassName('pfp');
    const lastImg = newImgSrc[newImgSrc.length -1];
    lastImg.src = 'src/padre.jpg';

    renderNewButton(newButton, chatboxVisibility);
}

function renderNewButton(button, events){
    if(addForm.style.display === 'flex'){
        button.addEventListener('click', e => {
            addForm.style.display = 'none';
        });
    }
    return button.addEventListener('click', events);
}