import { memoize } from 'underscore';

// This is used by the auth middleware so that plain HTTP requests can be tied to a logged in user
export const getUserFromToken = memoize(userToken => {
	const hashedToken = Accounts._hashLoginToken(userToken);
	return Meteor.users.findOne({'services.resume.loginTokens.hashedToken': hashedToken});
});

export const authParser = Meteor.bindEnvironment((req, res, next) => {
	const auth = req.headers.authorization ? req.headers.authorization.slice(7) : req.query.token;
	if (auth) req.user = getUserFromToken(auth);
	next();
});