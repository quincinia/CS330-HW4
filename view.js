// Mainly for updating the visual components, button actions will be sent straight to the controller
class View {
    constructor() {
        // Grabbing our elements
        this.contactsList = document.querySelector('ol')
        this.contactForm = document.querySelector('form')
    }

    setController(controller) {
        this.controller = controller
    }

    renderContacts(contacts) {
        // Clear current list
        this.contactsList.replaceChildren()

        // Render new list
        let view = this
        contacts.forEach((contact, index) => {
            let listItem = document.createElement('li')

            // Display contact info
            let contactInfo = document.createElement('div')
            contactInfo.className = 'info-container'
            contactInfo.innerHTML = `
                <p>Name: ${contact.name}</p>   
                <p>Email: <a href="#">${contact.email}</a></p>
                <p>Phone: ${contact.phone}</p>
                <p>Description: ${contact.description}</p>
            `

            // Create edit button
            let editButton = document.createElement('div')
            editButton.className = 'button edit'
            editButton.innerText = 'Edit'
            editButton.addEventListener('click', () =>
                view.controller.editHandler(index)
            )

            // Create delete button
            let deleteButton = document.createElement('div')
            deleteButton.className = 'button delete'
            deleteButton.innerText = 'Delete'
            deleteButton.addEventListener('click', () =>
                view.controller.deleteContact(index)
            )

            // Add all components to the new list item
            listItem.append(contactInfo, editButton, deleteButton)

            // Attach new element to the list
            view.contactsList.append(listItem)
        })
        // for (let contact in contacts) {
        //     // Generate html from contact info
        //     let listItem = document.createElement('li')
        //     listItem.innerHTML = `
        //         <div class="info-container">
        //             <p>Name: ${contact.name}</p>
        //             <p>Email: <a href="#">${contact.email}</a></p>
        //             <p>Phone: ${contact.phone}</p>
        //             <p>Description: ${contact.description}</p>
        //         </div>
        //         <div class="button edit">Edit</div>
        //         <div class="button delete">Delete</div>
        //     `

        //     // Attach new element to list
        //     this.contactsList.append(listItem)
        // }
    }

    populateForm(contact) {
        // Can prob do this in a loop
        document
            .querySelector('[name=name]')
            .value = contact.name
        document
            .querySelector('[name=email]')
            .value = contact.email
        document
            .querySelector('[name=phone]')
            .value = contact.phone
        document
            .querySelector('[name=description]')
            .value = contact.description
    }

    clearForm() {
        this.populateForm({ name: '', email: '', phone: '', description: '' })
    }

    // Debugging functions, not used
    get formAttrData() {
        let fields = this.contactForm.children
        return {
            name: fields[0].value,
            email: fields[1].value,
            phone: fields[2].value,
            description: fields[3].value
        }
    }

    get formPropData() {
        let fields = this.contactForm.children
        return {
            name: fields[0].getAttribute('value'),
            email: fields[1].getAttribute('value'),
            phone: fields[2].getAttribute('value'),
            description: fields[3].getAttribute('value')
        }
    }
}
