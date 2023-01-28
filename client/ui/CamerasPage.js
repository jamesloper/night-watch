import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import Camera from './Camera';
import { Cameras } from '../../db';

const CamerasPage = () => {
	const {ready, cameras} = useTracker(() => {
		return {
			'ready': Meteor.subscribe('Cameras').ready(),
			'cameras': Cameras.find({}, {sort: {streamUrl: -1}}).fetch(),
		};
	}, []);

	if (!ready) return null;

	return (
		<div className="cameras">
			{cameras.map(camera => <Camera key={camera._id} camera={camera}/>)}
		</div>
	);
};

export default CamerasPage;