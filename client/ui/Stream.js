import React, { useEffect, useRef } from 'react';
import HLS from 'hls.js';

const Stream = ({url}) => {
	const el = useRef();

	useEffect(() => {
		if (!el.current) return;
		if (el.current.canPlayType('application/vnd.apple.mpegurl')) {
			el.current.src = url;
		} else {
			const hls = new HLS({
				'maxLiveSyncPlaybackRate': 1.5,
			});
			hls.loadSource(url);
			hls.attachMedia(el.current);
			el.current.play();
		}
	}, [url]);

	return (
		<div className="video">
			<video
				ref={el}
				playsInline
				muted
				preload="auto"
			/>
		</div>
	);
};

export default Stream;