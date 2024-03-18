import UserModel from '../models/user-model.js';
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import mailService from './mail-service.js';

class UserService {
	async registration(email, password) {
		const doc = await UserModel.findOne({ email });
		console.log(doc);
		if (doc) {
			throw new Error('Email is busy!');
		}
		const passwordHash = await bcrypt.hash(password, 4);
		const activationLink = v4();
		const user = await UserModel.create({ email, password: passwordHash, activationLink });
		await mailService.sendActivationMail(email, activationLink);
	}
}

export default new UserService();
