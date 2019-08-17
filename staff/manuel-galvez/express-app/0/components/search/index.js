const locale = require('./i18n')
const { path } = require('./config')

function Search(query, lang) {
    const { search } = locale[lang]
    return `<form action="${path}">
        <input type="text" name="q" value="${query || ''}">
        <button>${search}</button>
    </form>`
}

module.exports = Search