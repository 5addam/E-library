const title = document.getElementById('txt-title');
const author = document.getElementById('txt-author');
const numPages = document.getElementById('txt-numPages');
const form = document.getElementsByTagName('form')[0];
const container = document.getElementById('books-container');
let btn_delete;
let btn_status;


let library = [
    new Book('After the Prophet', 'Lesley Hazleton', 256, 'read'),
    new Book('No God but God', ' Reza Aslan', 250, 'read'),
];

function Book(title,author,numPages,status){
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.status = status;
}

Book.prototype = {
    constructor: Book,
    bookInfo: function(){ return `Book: ${this.title} \n Written by: ${this.author}\n No. of Pages: ${this.numPages} \n Status: ${this.status}`},
};

// adds new book to the library[]
addBook =  (book) => library.push(book);

// display all books
function displayBooks(){
    container.innerHTML = "";
    for(let i=0;i<library.length;i++){
    let card = document.createElement('div');
    let header = document.createElement('div');
    let header_title = document.createElement('h2');
    let card_body = document.createElement('div');
    let card_body_author = document.createElement('h5');
    let card_body_numPages = document.createElement('p');
    let card_footer = document.createElement('div');
    let footer_status_txt = document.createElement('button');
    let footer_btn = document.createElement('button');

    card.className = 'card';
    header.className = 'card-header text-center';
    header_title.textContent = library[i].title;
    card_body.className = 'card-body text-center';
    card_body_author.className = 'card-title';
    card_body_author.textContent = library[i].author;
    card_body_numPages.className = 'card-text font-italic';
    card_body_numPages.textContent = library[i].numPages + ' pages';
    card_footer.className = 'card-footer';
    card_footer.id = 'card-footer';
    footer_status_txt.className = 'btn btn-primary';
    footer_status_txt.id = 'btn_status';
    footer_status_txt.textContent = library[i].status;
    footer_status_txt.dataset.index = i;
    footer_btn.className = 'btn btn-primary btn-danger';
    footer_btn.id = 'btn-delete';
    footer_btn.dataset.index = i;
    footer_btn.textContent = 'Delete';
    
    header.appendChild(header_title);
    card_body.appendChild(card_body_author);
    card_body.appendChild(card_body_numPages);
    card_footer.appendChild(footer_status_txt);
    card_footer.appendChild(footer_btn);

    card.appendChild(header);
    card.appendChild(card_body);
    card.appendChild(card_footer);

    container.appendChild(card);

}

// delete book object on click
btn_delete = document.querySelectorAll('#btn-delete');
for(let i=0;i<btn_delete.length;i++){
    btn_delete[i].addEventListener('click', e =>{
        library.splice(Number(e.target.dataset.index),1);
        displayBooks()

    });
}

// change the status of book on click
btn_status = document.querySelectorAll('#btn_status');
for(let i=0;i<btn_status.length;i++){
    btn_status[i].addEventListener('click', e =>{
        library[e.target.dataset.index].status === 'read' ?
        library[e.target.dataset.index].status = 'unread':
        library[e.target.dataset.index].status = 'read';
        // alert(library[e.target.dataset.index].status);
        displayBooks()
    });
}
}

form.addEventListener('submit', function(){
    let status = document.querySelector("input[name='gridRadios']:checked").value;
    addBook(new Book(title.value,author.value,numPages.value,status));
    displayBooks();
    console.table(library);
});

displayBooks();