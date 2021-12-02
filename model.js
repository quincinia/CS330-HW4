// Basically just holds our array of contacts
// Controller will initialize our Model
class Model {
    constructor(contacts) {
        this.contacts = contacts

        // Other properties needed for functionality
        
        // Keep track of the currently edited item
        // -1 means no item is being edited
        this.editIndex = -1
    }

    getContact(index) {
        if (index < 0 || index >= this.contacts.length) 
            return undefined

        return this.contacts[index]
    }

    setContact(index, value) {
        if (index < 0 || index >= this.contacts.length) 
            return 
        this.contacts[index] = value
    }

    addContact(value) {
        this.contacts.push(value)
    }

    deleteContact(index) {
        if (index < 0 || index >= this.contacts.length) 
            return 
        this.contacts.splice(index, 1)
    }

    getContacts() {
        return this.contacts
    }
    
    setContacts(contacts) {
        this.contacts = contacts;
    }
    // other functions needed for the form
}
