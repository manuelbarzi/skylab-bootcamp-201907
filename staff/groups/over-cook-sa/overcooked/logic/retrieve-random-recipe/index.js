logic.retrieveRandomRecipe = function () {

    return call('https://www.themealdb.com/api/json/v1/1/random.php', 'get', undefined, undefined)
        .then(response => {
            const { meals } = response
            return meals[0]          
        })        
}





