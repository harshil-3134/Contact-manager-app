// Array to store contacts
let contacts = [];

// Function to render a contact
function renderContact(contact) {
    const list = document.querySelector(".Contact_list");

    // If contact is marked for deletion, remove it from the DOM
    if (contact.deleted) {
        const item = document.querySelector(`[data-key='${contact.id}']`);
        if (item) item.remove();
        return;
    }

    // Create a new contact item and append to the list
    const node = document.createElement("article");
    node.setAttribute("class", "person");
    node.setAttribute("data-key", contact.id);

    node.innerHTML = `
    <img src="${contact.imageurl}" alt="Contact Image">
    <div class="contactdetail">
        <h1>${contact.name}</h1>
        <p>${contact.email}</p>
        <p>${contact.contactnumber}</p>
    </div>
    <button class="delete-contact js-delete-contact">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
        </svg>
    </button>
    `;

    list.appendChild(node);
}

// Function to add a contact
function addContact(event) {
    event.preventDefault();

    const name = document.getElementById("fullName").value;
    const email = document.getElementById("myEmail").value;
    const imageurl = document.getElementById("imgurl").value;
    const contactnumber = document.getElementById("myTel").value;

    if (!name || !email || !imageurl || !contactnumber) {
        alert("All fields are required.");
        return;
    }

    const contactObject = {
        name,
        email,
        imageurl,
        contactnumber,
        id: Date.now(),
    };

    // Save to contacts array
    contacts.push(contactObject);

    // Save to localStorage
    localStorage.setItem("contacts", JSON.stringify(contacts));

    // Render the contact
    renderContact(contactObject);

    // Reset the form
    document.querySelector(".js-form").reset();
}

// Function to delete a contact
function deleteContact(key) {
    // Find contact by ID
    const contactIndex = contacts.findIndex(contact => contact.id === Number(key));
    if (contactIndex !== -1) {
        // Remove from the array
        contacts.splice(contactIndex, 1);

        // Save updated contacts array to localStorage
        localStorage.setItem("contacts", JSON.stringify(contacts));

        // Re-render the list
        renderContacts();
    }
}

// Function to re-render all contacts
function renderContacts() {
    const list = document.querySelector(".Contact_list");
    list.innerHTML = ""; // Clear existing list

    contacts.forEach(contact => renderContact(contact));
}

// Event listener for form submission
document.querySelector(".js-form").addEventListener("submit", addContact);

// Event listener for delete buttons in the contact list
document.querySelector(".Contact_list").addEventListener("click", (event) => {
    // Check if delete button is clicked
    if (event.target.closest(".js-delete-contact")) {
        const itemKey = event.target.closest("[data-key]").dataset.key;
        deleteContact(itemKey);
    }
});

// Load contacts from localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
    const storedContacts = localStorage.getItem("contacts");
    if (storedContacts) {
        contacts = JSON.parse(storedContacts);
        renderContacts();
    }
});
