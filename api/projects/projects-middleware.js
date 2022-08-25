// add middlewares here related to projects
const handleErrors = (err, req, res) => {
    const status = res.statusCode === 200 ? 500 : res.statusCode
    res.status(status).json({message: err.message})
    }
    
    module.exports = handleErrors;