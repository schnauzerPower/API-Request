const modalContainer = document.createElement('div');
modalContainer.classList.add('modal-container');
const gallery = document.getElementById('gallery');
const cards = document.getElementsByClassName('card');
const names = document.getElementsByClassName('card-name');
const noResults = document.createElement('h3');
noResults.textContent = 'Your search did not produce any results.';
noResults.style.color = 'red';
document.body.append(noResults);
noResults.style.display = 'none';
let hiddenCount = 0;
let htmlBank = new HTMLBank();

//Get information from API
fetch('https://randomuser.me/api/?results=12')
    .then(response => response.json())
    .then(data => generateGallery(data.results))

//Generate the gallery and the search bar functionality
function generateGallery(results) {
    htmlBank.getGalleryHTML(results);
    const searchBar = document.getElementById("search-input");
   
    //Create search functionality that works when user clicks the button
    const submitButton = document.getElementById("search-submit");
    submitButton.addEventListener('click', () => {
        const searchBarValue = new RegExp('^' + searchBar.value.toLowerCase());
        filterResults(searchBarValue); 
        searchBar.value = '';
    })
    //Create search functionality that works when user hits enter
    searchBar.addEventListener('keydown', function(event) {
        if(event.keyCode === 13) {
            event.preventDefault();
            const searchBarValue = new RegExp('^' + searchBar.value.toLowerCase());
            filterResults(searchBarValue); 
            searchBar.value = '';
        }
    })
    
    createModal(results);
}

//Generate the modal functionality as well as the 'next' and 'previous' buttons to scroll through address book in modal view
function createModal(results) {
    gallery.addEventListener('click', (event) => {
        let index = getEventTargetId(event.target); //Locate id of card, which corresponds to index number in the results array
        if(index !== undefined) {
            modalContainer.innerHTML = htmlBank.getInitialModalHTML(results, index); 
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

//Filer results based on search display special message if no results are found
function filterResults(searchBarValue) {
   
    for(let x = 0; x<cards.length; x++) {
        if(searchBarValue.test(names[x].textContent)) {
            if(getComputedStyle(cards[x], null).display === 'none') {
                cards[x].style.display = 'flex';
                hiddenCount--;
            }
        }
        else {
            if(getComputedStyle(cards[x], null).display === 'flex') {
               cards[x].style.display = 'none';
               hiddenCount++; 
            }
        }
            
        if(hiddenCount === cards.length) {
            noResults.style.display = 'block';
        }
        else {
            noResults.style.display = 'none';
        }
     }
}

//Get card id to be able to match the modal employee with clicked employee
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

//Format birth date correctly in modal
function formatBirthday(dob) {
    const unFormattedBirthday = dob.slice(0, 10);
    const formattedBirthday = unFormattedBirthday.replace(/(\d{4})-(\d{2})-(\d{2})/, '$2/$3/$1' );
    return formattedBirthday;
}
    