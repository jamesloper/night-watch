const cache = {};

export const getUserFromToken = (userToken => {
	if (cache[userToken]) return cache[userToken];
	const hashedToken = Accounts._hashLoginToken(userToken);
	const user = Meteor.users.findOne({'services.resume.loginTokens.hashedToken': hashedToken});
	if (user) cache[userToken] = user;
	return user;
});

export const authParser = Meteor.bindEnvironment((req, res, next) => {
	const auth = req.headers.authorization ? req.headers.authorization.slice(7) : req.query.token;
	if (auth) req.user = getUserFromToken(auth);
	next();
});