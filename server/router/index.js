import { Router } from 'express';

const router = new Router();

router.get('/', (req, res) => {
	res.send("It's work!");
});

router.post('/registration', (req, res) => {
	console.log(req.body);
	res.json({ message: 'ok' });
});
router.post('/login');
router.post('/logout');
router.post('/activate/:link');
router.post('/refresh');
router.get('/users');

export default router;
