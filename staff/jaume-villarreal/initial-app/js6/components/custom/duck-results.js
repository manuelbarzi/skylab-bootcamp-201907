// /**
//  * Ducks abstraction.
//  * 
//  * @param {HTMLElement} container 
//  */

class DuckResults extends Results{
    constructor(container){
        super(container)
    }

    paintItem(li , duck){   
        const favButton = document.createElement('button')
        favButton.innerText = 'Favorite'
        favButton.classList.add('favorite')
        li.appendChild(favButton)

        favButton.addEventListener('click' , event => {
            event.preventDefault()

            const favorite = home.results.container.querySelector('.favorite')
            favorite.onClickFavorite(duck)
        })

        const h3 = document.createElement('h3')
        h3.innerText = duck.title
        li.appendChild(h3)

        const img = document.createElement('img')
        img.src = duck.imageUrl
        li.appendChild(img)

        img.addEventListener('click' , event => {
            event.preventDefault()
            this.onClickItem(duck.id)
        })
    }

    onClickItem(id){
        console.log(id)
    }

    onClickFavorite(duck){
        console.log(duck.id)
    }

} 