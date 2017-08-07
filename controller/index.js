import mongoose from 'mongoose';
const UserModel = mongoose.model('User');

class User {

    constructor() {

    }

    async register(req, res, next) { //注册

        let body = req.body;

        await UserModel.create({
            userName: body.userName,
            password: body.password
        }, (err, result) => {
            console.log(result);
            if (err) return res.send({
                succes: false,
                message: '注册失败',
                err: err
            });

            res.redirect('/login');

        });

    }

    async login(req, res, next) { //登陆

        let body = req.body;

        await UserModel.find({
            userName: body.userName,
            password: body.password
        }, (err, result) => {
            // console.log(result);
            if (err || !result.length) return res.send({
                succes: false,
                message: '登录失败',
                err: err
            });

            req.session.userKey = result[0]._id;
            res.redirect('/index');

        })
    }

    async loginCheck(req, res, next) { //验证是否登陆
        await UserModel.find({
            _id: req.session.userKey
        }, (err, result) => {

            if (err || !result.length) return res.redirect('/login');
            next();

        })

    }

    async deleteUser(req, res, next) {
        await UserModel.deleteOne({
            _id: req.session.userKey
        }, (err, result) => {
            // console.log(result);
            if (err) return res.send({
                succes: false,
                message: '删除用户失败',
                err: err
            });

            req.session.destroy();
            res.send({
                succes: true,
                message: '删除用户成功'
            });

        })
    }

    async findRef(req, res, next) {
        await UserModel.find({
                _id: req.session.userKey
            })
            .populate('say')
            .exec(function(err, result) {
                console.log(result);
                if (err) return res.send({
                    succes: false,
                    message: '查询失败',
                    err: err
                });

                res.send({
                    succes: true,
                    message: '查询成功',
                    messageBody: result
                });
            });
    }

}

export default new User();