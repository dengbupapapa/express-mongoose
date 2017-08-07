'use strict';
import express from 'express';
import db from './mongodb/db.js';
import bodyParser from 'body-parser';
import logger from 'morgan';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import cookieParser from 'cookie-parser'
import configLite from 'config-lite';
import './model/index.js';
import router from './router/index.js';
import middlewares from './middlewares/index.js';

const config = configLite(__dirname);
const app = express();
const MongoStore = connectMongo(session);

app.use(cookieParser());

app.use(session({
    name: config.session.name,
    secret: config.session.secret,
    resave: true,
    saveUninitialized: false,
    cookie: config.session.cookie,
    store: new MongoStore({
        // url: config.url
        url: 'mongodb://localhost:27017/session',
        // autoRemove: 'native'
        // host: 'mongodb://localhost', //数据库的地址，本机的话就是127.0.0.1，也可以是网络主机
        // port: 27017, //数据库的端口号
        // db: 'session' //数据库的名称。
    })
}))

app.use(logger('dev'));

app.disable('x-powered-by'); //禁用x-powered-by
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('./WEB-INF', {
    index: false
}));

app.use(middlewares);
app.use(router);

app.use((err, req, res, next) => { //errer middleware
    console.log(err);
    res.send(err);
});

export default app;