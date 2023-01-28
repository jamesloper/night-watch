import { checkAdmin } from './imports/util';
import { check } from 'meteor/check';
import { Random } from 'meteor/random';

Accounts.config({'forbidClientAccountCreation': true});

Accounts.onCreateUser(function(options, user) {
	Object.assign(user, {
		'discordName': options.discordName,
	});
	return user;
});

Meteor.methods({
	'CreateAccount': function(d) {
		checkAdmin();
		check(d, {email: String, discordName: String});

		const password = Random.id();
		Accounts.createUser({
			'email': d.email,
			'discordName': d.discordName,
			'password': password,
		});
		return password;
	},
});