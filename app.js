const modalContainer = document.createElement('div');
modalContainer.classList.add('modal-container');
const gallery = document.getElementById('gallery');
let htmlBank = new HTMLBank();

fetch('https://randomuser.me/api/?results=12')
    .then(response => response.json())
    .then(data => generateGallery(data.results))


function generateGallery(results) {
    htmlBank.getGalleryHTML(results);
    
    const submitButton = document.getElementById("search-submit");
    const searchBar = document.getElementById("search-input");
    const cards = document.getElementsByClassName('card');
    const names = document.getElementsByClassName('card-name');
    
    submitButton.addEventListener('click', () => {
        const searchBarValue = new RegExp('^' + searchBar.value.toLowerCase());
        for(let x = 0; x<cards.length; x++) {
            searchBarValue.test(names[x].textContent) ? cards[x].style.display = 'flex' : cards[x].style.display = 'none'; 
        }
        searchBar.value = '';
    })
    
    createModal(results);
}


function createModal(results) {
    gallery.addEventListener('click', (event) => {
        let index = getEventTargetId(event.target); //Locate id of card, which corresponds to index number in the results array
        if(index !== undefined) {
            modalContainer.innerHTML = htmlBank.getInitialModalHTML(results, index); //HTML is stored in separate function to remove clutter here.
            document.body.appendChild(modalContainer);
            
            //Creat X button functionality
            const xBtn = document.getElementById('modal-close-btn');  
            xBtn.addEventListener('click', () => { 
                document.body.removeChild(modalContainer);
            }) 
            
            //Create functionality for 'next' and 'previous' button 
            const buttonContainer = document.querySelector('.modal-btn-container');
            const infoContainer = document.querySelector('.modal-info-container');
            buttonContainer.addEventListener('click', (event) => {
                
                if(event.target.id === 'modal-next') {
                    index === results.length - 1 ? index = 0 : index++;
                    infoContainer.innerHTML = htmlBank.getUpdatedModalHTML(results, index); 
                }
                else if(event.target.id === 'modal-prev') {
                    index === 0 ? index = results.length - 1 : index--;
                    infoContainer.innerHTML = htmlBank.getUpdatedModalHTML(results, index); 
                }
            })
        } 
          
    });
    
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
    