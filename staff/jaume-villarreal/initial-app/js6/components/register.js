// /**
//  * Register abstraction.
//  * 
//  * @param {HTMLElement} container 
//  */

class Register extends SubmitBack{
    constructor(container){
        super(container)
    }

    onSubmitRegister(expression){
        const form = this.container.getElementsByTagName('form')[0]
        form.addEventListener('submit' , function(event){
            event.preventDefault()

            const name = event.target.name.value
            const surname = event.target.surname.value
            const email = event.target.email.value
            const password = event.target.password.value

            expression(name , surname , email , password)
        })
    }
}