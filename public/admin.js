async function main() {
  let response = await fetch("http://localhost:3001/listBooks");

  let books = await response.json();

  books.forEach(renderBook);
}

function renderBook(book) {
  let root = document.querySelector("#root");

  let card = document.createElement("div");
  card.classList.add("card", "mb-3");

  let cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  card.appendChild(cardBody);

  let cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title");
  cardTitle.textContent = book.title;
  cardBody.appendChild(cardTitle);

  let formGroup = document.createElement("div");
  formGroup.classList.add("form-group", "mb-0");
  cardBody.appendChild(formGroup);

  let quantityLabel = document.createElement("label");
  quantityLabel.classList.add("mb-0");
  quantityLabel.textContent = "Quantity";
  formGroup.appendChild(quantityLabel);

  let quantityInput = document.createElement("input");
  quantityInput.classList.add("form-control", "mb-3");
  quantityInput.value = book.quantity;
  formGroup.appendChild(quantityInput);

  let saveButton = document.createElement("button");
  saveButton.classList.add("btn", "btn-primary", "btn-sm");
  saveButton.textContent = "Save";
  cardBody.appendChild(saveButton);

  saveButton.addEventListener("click", () => {
    fetch("http://localhost:3001/updateBook", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: book.id,
        quantity: quantityInput.value,
      }),
    });
  });

  root.appendChild(card);
}

main();
