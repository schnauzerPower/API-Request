class HTMLBank {
    
    getGalleryHTML(results) {
        let html = ''
        let cardId = 0; //An ID will be assigned to each rendered card. This is meant to make it easier to get the correct information in the modal.
        let html2 = `
            <form action="#" method="get">
                <input type="search" id="search-input" class="search-input" placeholder="Search...">
                <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
            </form>
        `;
        document.querySelector('.search-container').innerHTML = html2;
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
    }
    
    getInitialModalHTML(results, index) {
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
    
    getUpdatedModalHTML(results, index) {
        let html = `<img class="modal-img" src=${results[index].picture.thumbnail} alt="profile picture">
                    <h3 id="name" class="modal-name cap">${results[index].name.first} ${results[index].name.last}</h3>
                    <p class="modal-text">${results[index].email}</p>
                    <p class="modal-text cap">${results[index].location.city}</p>
                    <hr>
                    <p class="modal-text">${results[index].phone}</p>
                    <p class="modal-text">${results[index].location.street}</p>
                    <p class="modal-text">Birthday: ${formatBirthday(results[index].dob.date)}</p>
                    `;
        return html;
    }
    
    
    
}