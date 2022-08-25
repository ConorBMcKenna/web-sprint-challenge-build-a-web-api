// add middlewares here related to actions
const handleErrors = (err, req, res, next) => {
    console.log("Error HANDLER", res.statusCode)
const status = res.statusCode === 200 ? 500 : res.statusCode
res.status(status); 
res.json({message: err.message})
}

module.exports = handleErrors;