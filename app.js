const modalContainer = document.createElement('div');
modalContainer.classList.add('modal-container');


fetch('https://randomuser.me/api/?results=12')
    .then(response => response.json())
    .then(data => generateGallery(data.results))


const gallery = document.getElementById('gallery');

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

function createModal(results) {
    gallery.addEventListener('click', (event) => {
        const index = getEventTargetId(event.target);
        if(index !== undefined) {
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
                </div>
            `;
                modalContainer.innerHTML = html;
                document.body.appendChild(modalContainer);
                const xBtn = document.getElementById('modal-close-btn');
                xBtn.addEventListener('click', () => {
                    document.body.removeChild(modalContainer);
                }) 
        } 
          
    });
    
}

function generateGallery(results) {
    let html = ''
    let cardId = 0;
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
    