import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import Login from './Login';
import CamerasPage from './CamerasPage';

export const App = () => {
	const userId = useTracker(Meteor.userId);
	if (!userId) return <Login/>;
	return (
		<div>
			{/*<h1>Night Watch</h1>*/}
			<CamerasPage/>
		</div>
	);
};
