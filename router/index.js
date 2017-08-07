import express from 'express';
import UserController from '../controller/index.js';
import SayController from '../controller/say.js';
import path from 'path'
const router = express.Router();

router.post('/find', UserController.login); //登陆

// router.post('/findRef', UserController.findRef); //用户相关查询

router.post('/insert', UserController.register); //注册

router.post('/delete/userId', UserController.deleteUser) //删除当前用户

router.post('/insert/nonsense', SayController.insert); //写入说说

router.post('/find/nonsense', SayController.find); //查询历史说说
router.post('/findRef/nonsense', SayController.findRef); //查询历史说说

router.get('/', (req, res, next) => { //首页
    res.redirect('/index');
});

router.get('/index', (req, res, next) => { //首页
    res.sendFile(path.resolve(__dirname, '../WEB-INF/index.html'))
});
router.get('/login', (req, res, next) => { //登陆
    res.sendFile(path.resolve(__dirname, '../WEB-INF/login.html'))
});
router.get('/logout', (req, res, next) => { //登出
    req.session.destroy();
    res.sendFile(path.resolve(__dirname, '../WEB-INF/login.html'))
});
router.get('/register', (req, res, next) => { //注册
    res.sendFile(path.resolve(__dirname, '../WEB-INF/register.html'))
});

export default router;