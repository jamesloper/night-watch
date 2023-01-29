import { checkAdmin } from '../imports/util';
import { check } from 'meteor/check';
import { Random } from 'meteor/random';

// Configuration for meteor framework
Accounts.config({'forbidClientAccountCreation': true});

// When a user is created, append some fields
Accounts.onCreateUser(function(options, user) {
	Object.assign(user, {
		'discordName': options.discordName,
	});
	return user;
});

Meteor.methods({
	// Creates an account and returns a randomly generated password
	'CreateAccount': function(d) {
		checkAdmin(); // Makes sure only an admin can create accounts to keep it private
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