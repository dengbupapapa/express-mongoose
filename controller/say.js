import mongoose from 'mongoose';
const SayModel = mongoose.model('Say');

class Say {

    constructor() {

    }

    async insert(req, res, next) {

        let body = req.body;
        let say = body.say;
        let date = new Date();

        SayModel.create({
            content: say,
            date: date,
            user: req.session.userKey
        }, (err, result) => {
            console.log(result);
            if (err) return res.send({
                succes: false,
                message: '提交失败',
                err: err
            });

            res.send({
                succes: true,
                message: '提交成功'
            });
        });
    }

    async find(req, res, next) {
        SayModel.find({
            user: req.session.userKey
        }, {
            _id: 0,
            __v: 0
        }, (err, result) => {
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

    async findRef(req, res, next) {
        SayModel.find({
                user: req.session.userKey
            }, {
                _id: 0,
                __v: 0
            })
            .populate('user', {
                _id: 0,
                __v: 0
            })
            // .cursor()
            // .on('data', function(doc) {
            //     console.log(doc);
            // })
            // .on('end', function() {
            //     console.log('Done!');
            // })
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

/*
作者 文章
老师 学生 课程
*/

export default new Say();