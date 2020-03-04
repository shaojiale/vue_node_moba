module.exports = options => {
    //资源中间件
    return async (req, res, next) => {
        const modelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../models/${modelName}`)
        next()
    }
}