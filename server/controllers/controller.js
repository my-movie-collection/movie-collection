const axios = require('axios')

class Controller{
  static quote(req, res){
    axios.get('http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en')
    .then(quotes => {
      if(quotes.data.quoteText && quotes.data.quoteAuthor) {
        let dataQuotes = {
          quotes: quotes.data.quoteText,
          author: `-${quotes.data.quoteAuthor}`
        }
        res.json(dataQuotes)
      }
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = Controller