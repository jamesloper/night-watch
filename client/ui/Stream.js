import React, { useEffect, useRef } from 'react';
import HLS from 'hls.js';

const Stream = ({camera}) => {
	const el = useRef();
	const streamUrl = `/api/${camera._id}/index.m3u8`;

	useEffect(() => {
		if (!el.current) return;
		if (el.current.canPlayType('application/vnd.apple.mpegurl')) {
			el.current.src = streamUrl;
		} else {
			const hls = new HLS({'maxLiveSyncPlaybackRate': 1.5});
			hls.loadSource(streamUrl);
			hls.attachMedia(el.current);
			el.current.play();
		}
	}, [streamUrl]);

	return (
		<div className="video">
			<video
				ref={el}
				playsInline
				muted
				preload="auto"
				poster={`/api/${camera._id}/poster.jpg`}
			/>
		</div>
	);
};

export default Stream;