const { User } = require('../models');
const { verify, sign } = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const userDatas = await User.findAll();
            return res.status(200).json({ data: userDatas, message: 'ok' });
        } catch (err) {
            return res.status(500).json({ data: null, message: 'Internal Server Error' });
        }
    },

    getUserFromId: async (req, res) => {
        try {
            const targetId = req.params.id;
            const targetUser = await User.findOne({ where: { id: targetId } });
            if (!targetUser) return res.status(400).json({ data: null, message: 'Bad Request' });
            const targetUserInfo = targetUser.dataValues;
            delete targetUserInfo.password;
            return res.status(200).json({ data: targetUserInfo, message: 'ok' });

        } catch (err) {
            return res.status(500).json({ data: null, message: 'Internal Server Error' });
        }
    },

    getAuthVerify: async (req, res) => {
        try {
            const accessToken = req.get('Authorization');
            const authUserInfo = verify(accessToken, process.env.ACCESS_SECRET, (err, result) => {
                if (err) {
                    return null;
                }
                else return result;
            });
            if(!authUserInfo) return res.status(401).json({data:null, message:'Unauthorized'});
            return res.status(200).json({data:authUserInfo, message:'ok'});
        } catch (err) {
            return res.status(500).json({ data: null, message: 'Internal Server Error' });
        }
    },

    postLogin: async (req, res) => {
        try {
            const { email, password } = req.body;
            const targetUser = await User.findOne({ where: { email: email, password: password } });
            if (!targetUser) return res.status(400).json({ data: null, message: 'wrong email or password' });
            const targetUserInfo = targetUser.dataValues;
            const accessToken = sign(targetUserInfo, process.env.ACCESS_SECRET, { expiresIn: '24h' });
            delete targetUserInfo.password;            
            return res.status(200).json({ data: { userInfo: targetUserInfo, accessToken: accessToken }, message: 'ok' });
        } catch (err) {
            return res.status(500).json({ data: null, message: 'Internal Server Error' })
        }
    },
    
    postSignup: async (req, res) => {
        try {
            console.log(req.body);
            
            const { email, password, username, mobile, gender } = req.body;
            
            if (!email || !password || !username || !mobile || typeof(gender) !== 'number') return res.status(422).json({ data: null, message: 'need to fill all inputs' });
            if (await User.findOne({ where: { email: email } })) return res.status(409).json({ data: null, message: 'email exist' });
            let newUser = await User.create({ email, password, username, mobile, gender });
            console.log(newUser);
            return res.status(200).json({ data: null, message: 'signup complete' });
        } catch (err) {
            return res.status(500).json({ data: null, message: 'Internal Server Error' })
        }
    }
}