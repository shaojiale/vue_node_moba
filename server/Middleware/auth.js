module.exports = options => {
    require('express-async-errors');
    const jwt = require('jsonwebtoken');
    const assert = require('http-assert')
    const AdminUser = require('../models/AdminUser')
    return async (req, res, next) => {
        //登录校验中间件
        const token = String(req.headers.authorization || '').split(' ').pop()
        console.log(token)
        assert(token, 401, '请先登录')
        const { id } = jwt.verify(token, req.app.get('secret'))
        console.log("id")
        assert(id, 401, '请先登录')
        req.user = await AdminUser.findById(id)
        console.log("user")
        assert(req.user, 401, '请先登录')
        await next()
    }
}