import { Meteor } from 'meteor/meteor';
import { Cameras } from '../../db';
import { refreshWyzeCamsAsync } from '../imports/wyze';

// Checks user is logged in and reactively publishes the documents in the Cameras collection

Meteor.publish('Cameras', function() {
	if (!this.userId) return null;
	refreshWyzeCamsAsync();
	return Cameras.find();
});
