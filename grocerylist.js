// The data
let shoppingList = [
    { id: 0, text: "milk", complete: false },
    { id: 1, text: "flour", complete: true }
]

// Bookmarks to DOM nodes we'll need
const textbox = document.getElementById("new-textbox")
const list = document.querySelector("#list")

// BUTLER FUNCTION
// Rendering for the whole list
function renderList() {
    list.innerHTML = ""
    shoppingList.forEach(item => renderListItem(item))
}
renderList()

// Rendering for the list item
function renderListItem(listItem) {
    const newLi = document.createElement("li")
    newLi.className = "my-3 d-flex align-items-center"
    newLi.id = "item-" + listItem.id

    // Put the text and buttons into the li
    newLi.innerHTML = `
        <input id="complete-checkbox" type="checkbox" ${listItem.complete ? "checked" : ""}/>
        <span class="${listItem.complete ? "text-decoration-line-through" : ""}">${listItem.text}</span>
        <button id="delete-button" class="btn btn-sm btn-light ms-3">
            &times;
        </button>
    `

    // Add heart button event listener
    newLi.querySelector("#complete-checkbox").addEventListener("change", () => {
        // Update the data
        listItem.complete = !listItem.complete

        // Update the HTML
        renderList()
    })

    // Add delete button event listener
    newLi.querySelector("#delete-button").addEventListener("click", () => {
        // Remove it from the data
        const deleteIndex = shoppingList.findIndex(item => item.id === listItem.id)
        shoppingList.splice(deleteIndex, 1)

        // Remove it from the HTML
        renderList()
    })

    // Move it into the page
    list.appendChild(newLi)
}

// Add button event handler
function handleAddClick(event) {
    // Prevent the page from refreshing
    event.preventDefault()

    // Save the new item to the data
    const newItem = {
        id: generateUniqueID(),
        text: textbox.value,
        complete: false
    }
    shoppingList.push(newItem)

    renderList()

    // Clear the textbox
    textbox.value = ""
}


// Clear Completed button event handler
function handleClearClick() {
    // Update the data
    shoppingList = shoppingList.filter(item => !item.complete)

    renderList()

}

function handleMarkClick() {
    shoppingList.forEach(item => {
        // Update the data
        item.complete = true
    })

    renderList()
}

// Little helper function for generating ids
let nextId = 10
function generateUniqueID() {
    return nextId++
}