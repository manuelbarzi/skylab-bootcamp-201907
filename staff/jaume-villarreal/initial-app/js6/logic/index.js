/**
 * Business Logic
 */

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const logic = {
    register: (name, surname, email, password) => {
        let errors = '';

        if (!name.trim()) {
            errors += 'Name is empty or blank.';
        }

        if (!surname.trim()) {
            if (errors) errors += '\n';

            errors += 'Surname is empty or blank.';
        }

        if (!email.trim()) {
            if (errors) errors += '\n';

            errors += 'E-mail is empty or blank.';
        } else if (!EMAIL_REGEX.test(email)) {
            if (errors) errors += '\n';

            errors += 'E-mail is not valid.';
        }

        if (!password.trim()) {
            if (errors) errors += '\n';

            errors += 'Password is empty or blank.\n';
        }

        if (errors)
            throw new Error(errors);
        else {
            const user = users.find(user => user.email === email);

            if (user) throw new Error('E-mail is already registered.');

            users.push({
                name: name,
                surname: surname,
                email: email,
                password: password,
                favorites: []
            });
        }
    },

    login: (email, password) => {
        let errors = '';

        if (!email.trim()) {
            errors += 'E-mail is empty or blank.';
        } else if (!EMAIL_REGEX.test(email)) {
            errors += 'E-mail is not valid.';
        }

        if (!password.trim()) {
            if (errors) errors += '\n';

            errors += 'Password is empty or blank.\n';
        }

        if (errors) throw new Error(errors);

        var user = users.find(user => user.email === email && user.password === password);

        if (!user) throw new Error('Wrong credentials.');
    },

    searchDucks: function (query, expression) {
        // if(!arguments.length) throw new Error('expected 0 arguments')

        if(arguments[0] === undefined) throw new TypeError('expected query in argument[0]')
        
        if(arguments.length === 1) throw new TypeError('expected expression in arguments[1]')

        if(!(arguments[1] instanceof Function)) throw new TypeError('undefined is not a function')
        
        call('http://duckling-api.herokuapp.com/api/search?q=' + query, expression);
    },

    retrieveDuck: function (id, expression) {
        // TODO validate id, expression
        if(!arguments.length) throw new Error('expected 0 arguments')
        
        if(arguments.length === 1) throw new TypeError('expected expression in arguments[1]')

        if(!(arguments[1] instanceof Function)) throw new TypeError('undefined is not a function')
        
        call('http://duckling-api.herokuapp.com/api/ducks/' + id, expression);
    }
};