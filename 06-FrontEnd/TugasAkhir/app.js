const inputBook = document.getElementById("inputBook");
const incompleteBookshelfList = document.getElementById(
  "incompleteBookshelfList",
);
const completeBookshelfList = document.getElementById("completeBookshelfList");
const searchBook = document.getElementById("searchBook");

function makeBookElement(book) {
  const bookItem = document.createElement("article");
  bookItem.classList.add("book_item");

  const bookTitle = document.createElement("h3");
  bookTitle.innerText = book.title;
  bookItem.appendChild(bookTitle);

  const bookAuthor = document.createElement("p");
  bookAuthor.innerText = "Penulis: " + book.author;
  bookItem.appendChild(bookAuthor);

  const bookYear = document.createElement("p");
  bookYear.innerText = "Tahun: " + book.year;
  bookItem.appendChild(bookYear);

  const action = document.createElement("div");
  action.classList.add("action");
  bookItem.appendChild(action);

  const moveButton = document.createElement("button");
  moveButton.classList.add(book.isComplete ? "green" : "green");
  moveButton.innerText = book.isComplete
    ? "Belum selesai di Baca"
    : "Selesai dibaca";
  moveButton.addEventListener("click", function () {
    book.isComplete = !book.isComplete;
    updateBookList();
  });
  action.appendChild(moveButton);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("red");
  deleteButton.innerText = "Hapus buku";
  deleteButton.addEventListener("click", function () {
    const index = books.findIndex((b) => b.id === book.id);
    books.splice(index, 1);
    updateBookList();
  });
  action.appendChild(deleteButton);

  const editButton = document.createElement("button");
  editButton.classList.add("blue");
  editButton.innerText = "Edit";
  editButton.addEventListener("click", function () {
    showEditForm(book);
  });
  action.appendChild(editButton);

  return bookItem;
}

function showEditForm(book) {
  const form = document.createElement("form");
  form.innerHTML = `
    <div class="input">
      <label for="editBookTitle">Judul</label>
      <input id="editBookTitle" type="text" value="${book.title}" required />
    </div>
    <div class="input">
      <label for="editBookAuthor">Penulis</label>
      <input id="editBookAuthor" type="text" value="${book.author}" required />
    </div>
    <div class="input">
      <label for="editBookYear">Tahun</label>
      <input id="editBookYear" type="number" value="${book.year}" required />
    </div>
    <button type="submit">Simpan</button>
  `;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const newTitle = document.getElementById("editBookTitle").value;
    const newAuthor = document.getElementById("editBookAuthor").value;
    const newYear = document.getElementById("editBookYear").value;

    book.title = newTitle;
    book.author = newAuthor;
    book.year = newYear;

    if (event) {
      showToast("data berhasil diubah");
    }

    updateBookList();
  });

  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.appendChild(form);

  document.body.appendChild(modal);
}

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("modal")) {
    event.target.remove();
  }
});

function updateBookList() {
  incompleteBookshelfList.innerHTML = "";
  completeBookshelfList.innerHTML = "";

  for (const book of books) {
    const bookElement = makeBookElement(book);
    if (book.isComplete) {
      completeBookshelfList.appendChild(bookElement);
    } else {
      incompleteBookshelfList.appendChild(bookElement);
    }
  }

  localStorage.setItem("books", JSON.stringify(books));
}

let books = JSON.parse(localStorage.getItem("books")) || [];

updateBookList();

inputBook.addEventListener("submit", function (event) {
  event.preventDefault();

  const bookTitle = document.getElementById("inputBookTitle").value;
  const bookAuthor = document.getElementById("inputBookAuthor").value;
  const bookYear = parseInt(document.getElementById("inputBookYear").value);
  const isComplete = document.getElementById("inputBookIsComplete").checked;

  const book = {
    id: +new Date(),
    title: bookTitle,
    author: bookAuthor,
    year: bookYear,
    isComplete: isComplete,
  };

  if (event) {
    showToast(`Buku ${book.title} telah ditambahkan ke rak buku`);
  }

  books.push(book);
  updateBookList();

  inputBook.reset();
});

const isComplete = document.getElementById("inputBookIsComplete");
const bookSubmitSpan = document
  .getElementById("bookSubmit")
  .querySelector("span");

isComplete.addEventListener("click", function () {
  if (isComplete.checked) {
    bookSubmitSpan.innerText = "Selesai dibaca";
  } else {
    bookSubmitSpan.innerText = "Belum selesai dibaca";
  }
});

searchBook.addEventListener("submit", function (event) {
  event.preventDefault();

  const searchBookTitle = document.getElementById("searchBookTitle").value;

  const filteredBooks = searchBookTitle
    ? books.filter((book) =>
        book.title.toLowerCase().includes(searchBookTitle.toLowerCase()),
      )
    : books;

  incompleteBookshelfList.innerHTML = "";
  completeBookshelfList.innerHTML = "";

  for (const book of filteredBooks) {
    const bookElement = makeBookElement(book);
    if (book.isComplete) {
      completeBookshelfList.appendChild(bookElement);
    } else {
      incompleteBookshelfList.appendChild(bookElement);
    }
  }
});

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.style.opacity = 1;

  setTimeout(() => {
    toast.style.opacity = 0;
  }, 2000);
}
