function Search(props) {
 
    return <form className='search' onSubmit = {event =>{
        event.preventDefault()
        const { target: { query: { value: query }, combo: { value: combo } } } = event
        debugger
        if(combo === '1') props.onSearchName(query)
        
        if(combo === '2') props.onSearchIngredient(query)
        
    }}>
        <select name="combo">
            <option value="1">by name</option>
            <option value="2">by ingredient</option>
        </select>
        <input type="text" id="mySearch" name="query" />
        <button>Search</button>
    </form>
}