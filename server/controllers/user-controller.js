import userService from '../service/user-service.js';

class UserController {
	async registration(req, res, next) {
		try {
			userService(req.body.email, req.body.password, next);
			res.send('123');
		} catch (e) {}
	}
	async login(req, res, next) {
		try {
		} catch (e) {}
	}
	async logout(req, res, next) {
		try {
		} catch (e) {}
	}
	async activate(req, res, next) {
		try {
		} catch (e) {}
	}
	async refresh(req, res, next) {
		try {
		} catch (e) {}
	}
	async getUsers(req, res, next) {
		try {
			res.json({
				message: 'is work',
			});
		} catch (e) {}
	}
}

export default new UserController();
