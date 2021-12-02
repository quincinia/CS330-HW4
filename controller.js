const PORT = 3000
const url = `http://localhost:${PORT}/contacts`
class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view

        // View needs a reference to the controller
        this.view.setController(this)

        // Attach handler to submit button
        let controller = this
        this.view.contactForm.addEventListener('submit', (event) => {
            event.preventDefault()
            controller.submitForm()
        })
        // this.view.renderContacts(this.model.getContacts())
    }

    async submitForm() {
        // Grab form data
        // There's probably a better way to do this
        let formData = {
            name: document.querySelector('[name=name]').value,
            email: document.querySelector('[name=email]').value,
            phone: document.querySelector('[name=phone]').value,
            description: document.querySelector('[name=description]').value,
        }
        console.log(formData)
        // Determine whether to create or edit
        if (this.model.editIndex === -1) {
            await this.createContact(formData)
        } else {
            await this.updateContact(this.model.editIndex, formData)
        }

        // Reset form
        this.view.clearForm()
        this.model.editIndex = -1

        // Rerender view
        this.view.renderContacts(this.model.getContacts())
    }

    async createContact(data) {
        let response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify(data),
        })
        // Send alert on success or fail?

        // Check response.ok?
        let result = await response.json()
        this.model.addContact(result)
    }

    async updateContact(index, data) {
        // Normally check for undefined
        let id = this.model.getContact(index).id
        let response = await fetch(url + '/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify(data),
        })
        // Alert on success or fail?

        // Check response.ok?
        let result = await response.json()
        this.model.setContact(index, result)
    }

    async deleteContact(index) {
        // Normally check for undefined
        let id = this.model.getContact(index).id
        let response = await fetch(url + '/' + id, {
            method: 'DELETE',
        })

        this.model.deleteContact(index)

        // Rerender view
        this.view.renderContacts(this.model.getContacts())
    }

    editHandler(index) {
        this.model.editIndex = index

        // Not checking for undefined
        this.view.populateForm(this.model.getContact(index))
    }

    setContacts(contacts) {
        this.model.setContacts(contacts)
        this.view.renderContacts(this.model.getContacts())
    }
}
