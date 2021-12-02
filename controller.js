const PORT = 3000
const url = `http://localhost:${PORT}/contacts`
class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view

        this.view.renderContacts(this.model.getContacts())
    }

    submitForm() {
        // Grab form data
        // There's probably a better way to do this
        let formData = {
            name: document.querySelector('[name=name]').getAttribute('value'),
            email: document.querySelector('[name=email]').getAttribute('value'),
            phone: document.querySelector('[name=phone]').getAttribute('value'),
            description: document.querySelector('[name=description]').getAttribute('value')
        }

        // Determine whether to create or edit
        if (this.model.editIndex === -1) {
            createContact(formData)
        } else {
            updateContact(this.model.editIndex, formData)
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
            body: JSON.stringify(data)
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
            body: JSON.stringify(data)
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
            method: 'DELETE'
        })

        this.model.deleteContact(index)

        // Rerender view
        this.view.renderContacts(this.model.getContacts())
    }
}