class App extends React.Component {
    constructor() {
        super()

        let credentials

        const { id, token } = sessionStorage

        id && token && (credentials = { id, token })

        this.state = {
            view: 'landing',
            error: undefined,
            printItem: undefined,
            credentials,
            query: undefined,
            user: undefined,
            categories: [],
            jokes: [],
            random: [],

        }

        this.handleGoToRegister = this.handleGoToRegister.bind(this)
        this.handleGoToLogin = this.handleGoToLogin.bind(this)
        this.handleGoToLanding = this.handleGoToLanding.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        // ===
        this.handleSearchCategories = this.handleSearchCategories.bind(this)
        this.handleRandomButton = this.handleRandomButton.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
        this.handleToggleFavorite = this.handleToggleFavorite.bind(this)
    }

    // ===
    componentWillMount() {
        const { state: { credentials } } = this

        if (credentials) {
            const { id , token } = credentials
        }

        try {
            logic.retrieveUser(id, token)
                .then(user => this.setState({ user }))
                .catch(({ message }) => this.setState({ error: message }))
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    // componentWillReceiveProps(props){
    //     const { credentials } = props
    //     !credentials && this.setState({ user: undefined })
    // }

    componentDidMount() {
        logic.getCategories()
            .then(data => {
                this.setState({ categories: data })
            })
    }

    handleSearch(query) {
        const { state: { credentials } } = this
        let id, token

        credentials && (id = credentials.id, token = credentials.token)

        logic.searchJokes(id, token, query)
            .then(joke => {
                this.setState({ jokes: joke, query: query })
                this.setState({ printItem: 'printSearch' })
            })

            .catch(({ message }) => this.setState({ error: message }))
    }
    //--------------------------------------------------------
    handleSearchCategories(category) {
        const { state: { credentials } } = this
        let id, token
        credentials && (id = credentials.id, token = credentials.token)

        logic.searchJokes(id, token, category)
            .then(joke => {
                this.setState({ jokes: joke, query: category })
                this.setState({ printItem: 'printCategory' })
            })
            .catch(({ message }) => this.setState({ error: message }))
    }
    //-------------------------------------------------------
    handleRandomButton() {
        logic.getRandomJoke()
            .then(joke => {
                this.setState({ random: joke })
                this.setState({ printItem: 'printRandom' })
            })
            .catch(({ message }) => this.setState({ error: message }))
    }


    handleStartSynth(value) {
        logic.synth(value)
    }

    // ===

    handleGoToRegister() {
        this.setState({ view: 'register' })
        this.setState({ error: undefined })
    }

    handleGoToLogin() {
        this.setState({ view: 'login' })
        this.setState({ error: undefined })
    }

    handleGoToLanding() {
        this.setState({ view: 'landing' })
        this.setState({ error: undefined })
    }

    handleRegister(name, surname, username, password, repassword) {
        try {
            logic.registerUser(name, surname, username, password, repassword)
                .then(this.setState({ view: 'register-success' }))
                .catch(({ message }) => this.setState({ error: message }))
        }
        catch ({ message }) {
            this.setState({ error: message })
        }
    }

    handleLogin(username, password) {
        try {
            logic.authenticateUser(username, password)
                .then(credentials => {
                    sessionStorage.id = credentials.id
                    sessionStorage.token = credentials.token
                    this.setState({ view: 'landing', credentials })

                    const { id, token } = credentials

                    try {
                        logic.retrieveUser(id, token)
                            .then(user => this.setState({ user }))
                            .catch(({ message }) => this.setState({ message }))
                    } catch ({ message }) {
                        this.setState({ error: message })
                    }

                })
                .catch(({ message }) => this.setState({ error: message }))
        }
        catch ({ message }) { this.setState({ error: message }) }
    }


    handleLogout() {
        delete sessionStorage.id
        delete sessionStorage.token

        this.setState({ credentials: undefined, user: undefined })
    }

    handleToggleFavorite(jokeId) {

        const { state: { credentials, query }, handleSearch } = this
        let id, token
        credentials && (id = credentials.id, token = credentials.token)
        credentials ? logic.toggleFavoriteItem(id, token, jokeId)
            .then(() => handleSearch(query))
            .catch(({ message }) => this.setState({ error: message }))
            : this.setState({ view: 'login' })
    }

    render() {
        const {
            state: { view, error, categories, user, jokes, printItem, random },
            handleGoToRegister,
            handleGoToLogin,
            handleGoToLanding,
            handleRegister,
            handleLogin,
            handleLogout,
            handleToggleFavorite,
            handleSearch,
            handleSearchCategories,
            handleRandomButton,
            handleStartSynth
        } = this

        return <>
            <div className="wrapper">
                <Header onGoToRegister={handleGoToRegister} onGoToLogin={handleGoToLogin} onLogout={handleLogout} onChangeView={view} user={user}/>
                <Search onSearch={handleSearch} />
                {view === 'login' && <Login onGoToLanding={handleGoToLanding} onLogin={handleLogin} error={error} />}
                {view === 'register' && <Register onGoToLanding={handleGoToLanding} onRegister={handleRegister} error={error} />}
                {view === 'register-success' && <RegisterSuccess onGoToLanding={handleGoToLanding} onGoToLogin={handleGoToLogin} />}

                {view === "landing" && <main className="main-container">

                    {<button className="random-button" onClick={event => {
                        event.preventDefault()
                        handleRandomButton()
                    }}>Random Chuck</button>}

                    <Categories categories={categories} searchCategory={handleSearchCategories} />

                    {printItem === 'printSearch' && <RetrieveCategories arrayJokes={jokes} startSynth={handleStartSynth} onToggle={handleToggleFavorite} error = { error} />}

                    {printItem === 'printCategory' && <RetrieveCategories user={user} arrayJokes={jokes} startSynth={handleStartSynth} onToggle={handleToggleFavorite} />}

                    {printItem === 'printRandom' && <RetrieveRandom arrayRandom={random} startSynth={handleStartSynth} ontoggle={handleToggleFavorite} />}
                </main>}


            </div>
        </>
    }

}