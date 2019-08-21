const modalContainer = document.createElement('div');
modalContainer.classList.add('modal-container');
const gallery = document.getElementById('gallery');


fetch('https://randomuser.me/api/?results=12')
    .then(response => response.json())
    .then(data => generateGallery(data.results))


function createModal(results) {
    gallery.addEventListener('click', (event) => {
        let index = getEventTargetId(event.target); //Locate id of card, which corresponds to index number in the results array
        if(index !== undefined) {
            modalContainer.innerHTML = getModalHTML(results, index); //HTML is stored in separate function to remove clutter here.
            document.body.appendChild(modalContainer);
            
            //Creat X button functionality
            const xBtn = document.getElementById('modal-close-btn');  
            xBtn.addEventListener('click', () => { 
                document.body.removeChild(modalContainer);
            }) 
            
            //Create functionality for 'next' and 'previous' button  ****THIS ONLY WORKS ONCE. I'VE FIGURED OUT IT HAS SOMETHING TO DO WITH REPLACING THE INNER HTML.
            const buttonContainer = document.querySelector('.modal-btn-container');
            buttonContainer.addEventListener('click', (event) => {
                if(event.target.id === 'modal-next') {
                    index++;
                    modalContainer.innerHTML = getModalHTML(results, index);
                }
                else if(event.target.id === 'modal-prev') {
                    index--;
                    modalContainer.innerHTML = getModalHTML(results, index);
                }
            })
        } 
          
    });
    
}

function generateGallery(results) {
    let html = ''
    let cardId = 0; //An ID will be assigned to each rendered card. This is meant to make it easier to get the correct information in the modal.
    for(let result of results) {
        html += `
            <div class="card" id=${cardId}> 
                <div class="card-img-container">
                    <img class="card-img" src=${result.picture.thumbnail} alt="profile picture">
                </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${result.name.first} ${result.name.last}</h3>
                        <p class="card-text">${result.email}</p>
                        <p class="card-text cap">${result.location.city}, ${result.location.state}</p>
                    </div>
                </div>
        `; 
        cardId++;
    }
    
    gallery.innerHTML = html; 
    createModal(results);
}

//Store the Modal HTML here to clear clutter in createModal function
function getModalHTML(results, index) {
    let html = `
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src=${results[index].picture.thumbnail} alt="profile picture">
                         <h3 id="name" class="modal-name cap">${results[index].name.first} ${results[index].name.last}</h3>
                        <p class="modal-text">${results[index].email}</p>
                         <p class="modal-text cap">${results[index].location.city}</p>
                        <hr>
                        <p class="modal-text">${results[index].phone}</p>
                        <p class="modal-text">${results[index].location.street}</p>
                        <p class="modal-text">Birthday: ${formatBirthday(results[index].dob.date)}</p>
                     </div>
                     <div class="modal-btn-container">
                        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                        <button type="button" id="modal-next" class="modal-next btn">Next</button>
                     </div>
                </div>`;
    return html
}

function getEventTargetId(element) {
    const id = parseInt(element.id);
    const parentId = parseInt(element.parentNode.id);
    const grandparentId = parseInt(element.parentNode.parentNode.id);
    
    if(!isNaN(id)) {
        return id;
    }
    else if(!isNaN(parentId)) {
        return parentId;
    }
    else if(!isNaN(grandparentId)) {
        return grandparentId;
    }
    else {
        return undefined;
    }
}

function formatBirthday(dob) {
    const unFormattedBirthday = dob.slice(0, 10);
    const formattedBirthday = unFormattedBirthday.replace(/(\d{4})-(\d{2})-(\d{2})/, '$2/$3/$1' );
    return formattedBirthday;
}
    