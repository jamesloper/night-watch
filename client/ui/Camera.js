import React from 'react';
import Stream from './Stream';
import { Icon } from './index';

const Camera = ({camera}) => {
	const renderBody = () => {
		if (camera.streamUrl) return (
			<Stream url={`/api/${camera._id}/index.m3u8`} posterUrl={`/api/${camera._id}/poster.jpg`}/>
		);
		return (
			<div className="camera-disabled">
				<Icon icon="cloud_off"/>
			</div>
		);
	};

	return (
		<div className="camera">
			<div className="camera-top">
				<div className="camera-name" children={camera.name}/>
			</div>
			{renderBody()}
		</div>
	);
};

export default Camera;