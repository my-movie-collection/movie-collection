function errorHandler(err, req, res, next) {
  console.log(err, 'masuk siniiii');
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstrainError'){
    console.log('masuk sini');
    const errors = err.errors.map(e => e.message)
    return res.status(400).json(errors)
  } else if (err.status == 400){
    return res.status(400).json(err.msg)
  } else if (err.status == 404){
    return res.status(404).json({message: 'data not found'})
  } else {
    res.status(500).json(err)
  }
}

module.exports = errorHandler