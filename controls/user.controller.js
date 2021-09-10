



const { emailAction, statusEnum } = require('../config');
const { User } = require('../database');
const { emailService, pasService, s3Service } = require('../services');
const { userNormalize } = require('../utils/user.util');


module.exports = {
    createUser: async (req, res, next) => {
        try {

            const ToSendEmail = req.body.email;
            const ReqUserName = req.body.name;

            await emailService.sendMail(
                ToSendEmail, emailAction.REGISTRATION,
                { userName: [ReqUserName] }
            );

            const { password } = req.body;

            const hashPass = await pasService.hash(password);

            const user = await User.create({
                ...req.body,
                password: hashPass
            });
            const { _id } = user;

            const { avatar } = req.files;

            if (avatar) {
                const upLoadFile = await s3Service.upload(avatar, 'user', _id.toString());

                await User.findByIdAndUpdate(user._id, { avatar: upLoadFile.Location }, { new: true });
            }
            res.status(statusEnum.CREATE).json({
                message:
                    'New user is create'
            });
        } catch (err) {
            next(err);
        }
    },
    deleteUserById: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            const userDelete = await User.findByIdAndDelete(user_id).
                select('-__v -role -password');

            res.status(statusEnum.OK).json(userDelete);
        } catch (err) {
            next(err);
        }
    },
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find({}).select('-__v -role -password');

            res.json(users);
        } catch (err) {
            res.status(statusEnum.BAD_REQUEST).json(err.message);
        }
    },
    getUserById: (req, res, next) => {
        try {
            const userNorm = userNormalize(req.user);
            res.json(userNorm);
        } catch (err) {
            next(err);
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const { ...data } = req.body;

            await User.findByIdAndUpdate(user_id, data);

            res.status(statusEnum.CREATE).json({
                message:
                    'The data was update'
            });

        } catch (err) {
            next(err);
        }
    }
}
