const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
	/* app.get('/', function(req, res, next) {
		res.send(['waterbottle', 'phone', 'paper']);
	}); */
	app.get('/', requireAuth, function(req, res) {
		res.send({ hi: 'there' });
	});
	app.get('/packs', requireAuth, function(req, res) {
		res.send([
			{
				id: 1,
				courierNumber: '1234',
				description: 'Zapatos',
				from: 'Zappos.com',
				status: 'En transito',
				charges: 250
			},
			{
				id: 2,
				courierNumber: 'hsfdg6',
				description: 'Ropa',
				from: 'hollisterco.com',
				status: 'Listo en counter',
				charges: 76
			},
			{
				id: 3,
				courierNumber: 'juyytfds5',
				description: 'Drone',
				from: 'Amazon.com',
				status: 'Recibido',
				charges: 89
			}
		]);
	});
	app.post('/signin', requireSignin, Authentication.signin);
	app.post('/signup', Authentication.signup);
}