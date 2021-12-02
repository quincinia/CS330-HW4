// Mainly for updating the visual components, button actions will be sent straight to the controller
class View {
    constructor() {
        // Grabbing our elements
        this.contactsList = document.querySelector('ol')
        this.contactForm = document.querySelector('form')
    }
    
    renderContacts(contacts) {
        // Clear current list
        this.contactsList.replaceChildren()

        // Render new list
        for (let contact in contacts) {
            // Generate html from contact info
            let listItem = document.createElement('li')
            listItem.innerHTML = `
                <div class="info-container">
                    <p>Name: ${contact.name}</p>
                    <p>Email: <a href="#">${contact.email}</a></p>
                    <p>Phone: ${contact.phone}</p>
                    <p>Description: ${contact.description}</p>
                </div>
                <div class="button edit">Edit</div>
                <div class="button delete">Delete</div>
            `

            // Attach new element to list
            this.contactsList.append(listItem);
        }
    }

    populateForm(contact) {
        // Can prob do this in a loop
        document.querySelector('[name=name]').setAttribute('value', contact.name);
        document.querySelector('[name=email]').setAttribute('value', contact.email);
        document.querySelector('[name=phone]').setAttribute('value', contact.phone);
        document.querySelector('[name=description]').setAttribute('value', contact.description);
    }

    clearForm() {
        populateForm({name: '', email: '', phone: '', description: '', })
    }
}
