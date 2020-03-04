module.exports = app => {
    const express = require('express');
    const jwt = require('jsonwebtoken');
    require('express-async-errors');
    const assert = require('http-assert')
    const AdminUser = require('../../models/AdminUser')
    //资源中间件
    const resourceMiddleware = require('../../Middleware/resource')
    //登录校验中间件
    const authMIddleware = require('../../Middleware/auth')
    const multer = require('multer')
    const uploads = multer({ dest: __dirname + '/../../uploads' })
    const router = express.Router({
        mergeParams: true
    });
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })
    //获取资源列表
    router.get('/', async (req, res) => {
        const queryOptions = {}
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(10);
        res.send(items)
    })

    router.get('/:id', async (req, res) => {
        const items = await req.Model.findById(req.params.id);
        res.send(items)
    })
    router.put('/:id', async (req, res) => {
        const items = await req.Model.findByIdAndUpdate(req.params.id, req.body);
        res.send(items)
    })
    router.delete('/:id', async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id);
        res.send({
            success: true
        })
    })

    app.use('/admin/api/rest/:resource', authMIddleware(), resourceMiddleware(), router);
    app.post('/admin/api/upload', uploads.single('file'), authMIddleware(), async (req, res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })

    app.post('/admin/api/login', async (req, res) => {
        const username = req.body.name;
        const password = req.body.password;
        const user = await AdminUser.findOne({ name: username }).select('+password')
        assert(user, 422, '用户不存在')
        // if (!user) {
        //     return res.status(422).send({
        //         message: '用户不存在'
        //     })
        // }
        const isValid = require('bcrypt').compareSync(password, user.password)
        assert(isValid, 422, '密码错误')
        // if (!isValid) {
        //     return res.status(422).send({
        //         message: '密码错误'
        //     })
        // }
        const token = jwt.sign({ id: user._id }, app.get('secret'))
        res.send({ token })
    })
    //错误处理
    app.use(async function (err, req, res, next) {
        console.log(err)
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })

}