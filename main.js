// The data
const shoppingList = []

// Bookmarks to DOM nodes we'll need
const textbox = document.getElementById("new-textbox")
const list = document.querySelector("#list")

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

    // Create a new list item
    const newLi = document.createElement("li")
    newLi.className = "my-3 d-flex align-items-center"

    // Put the text and buttons into the li
    newLi.innerHTML = `
        <button id="complete-button" class="border-0 bg-white">${newItem.complete ? "✅" : "⬜"}</button>
        <span>${newItem.text}</span>
        <button id="delete-button" class="btn btn-sm btn-light ms-3">&times;</button>
    `

    // Add heart button event listener
    newLi.querySelector("#complete-button").addEventListener("click", () => {
        // Update the data
        newItem.complete = !newItem.complete

        // Update the HTML
        newLi.querySelector("#complete-button").innerHTML = newItem.complete ? "✅" : "⬜"
    })

    // Add delete button event listener
    newLi.querySelector("#delete-button").addEventListener("click", () => {
        // Remove it from the data
        const deleteIndex = shoppingList.findIndex(item => item.id === newItem.id)
        shoppingList.splice(deleteIndex, 1)

        // Remove it from the HTML
        newLi.remove()
    })

    // Move it into the page
    list.appendChild(newLi)

    // Clear the textbox
    textbox.value = ""
}


// Clear Completed button event handler
function handleClearCompletedClick() {
    // Update the data
    shoppingList = shoppingList.filter(item => !item.completed)
    
    // TODO: Update the HTML
    // ?????
}

// Little helper function for generating ids
let nextId = 10
function generateUniqueID() {
    return nextId++
}