export class HelloWorld {
    constructor() {
        this.message = 'Hello world !'

        this.displayMessage()
    }

    displayMessage() {
        setTimeout( () => {
            alert(this.message)
        }, 1000)
    }
}