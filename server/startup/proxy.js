import express from 'express';
import http from 'node:http';
import { memoize } from 'underscore';
import { pipeline } from 'node:stream';
import { Cameras } from '../../db';
import { authParser } from '../imports/middleware';
import { fetchText } from '../imports/util';

export const app = express();
app.set('json spaces', 2);
app.set('trust proxy', true);

app.use(authParser, (req, res, next) => {
	// console.log(req.method, req.originalUrl, '(', req.user ? req.user.username : 'Anon', ')');
	next();
});

const getCamera = memoize(id => {
	return Cameras.findOne({'_id': id}, {fields: {streamUrl: 1, posterUrl: 1}});
});

app.use('/:id/index.m3u8', async (req, res, next) => {
	const camera = getCamera(req.params.id);
	if (!camera) return next(`Invalid camera ID`);

	try {
		const hls = await fetchText(`${camera.streamUrl}index.m3u8`);
		res.end(hls);
	} catch (err) {
		next(err);
	}
});

app.use('/:id/stream.m3u8', async (req, res, next) => {
	const camera = getCamera(req.params.id);
	if (!camera) return next(`Invalid camera ID`);

	try {
		const hls = await fetchText(`${camera.streamUrl}stream.m3u8`);
		res.end(hls);
	} catch (err) {
		next(err);
	}
});

app.use('/:id/:segment.ts', async (req, res, next) => {
	const camera = getCamera(req.params.id);
	if (!camera) return next(`Invalid camera ID`);

	http.get(`${camera.streamUrl}${req.params.segment}.ts`, (stream) => {
		if (stream.statusCode === 200) {
			pipeline(stream, res, (err) => {
				if (err) console.log('ts -> client pipeline error:', err);
			});
		} else {
			res.end();
		}
	});
});

app.get('/:id/poster.jpg', async (req, res, next) => {
	const camera = getCamera(req.params.id);
	if (!camera) return next(`Invalid camera ID`);

	http.get(camera.posterUrl, (stream) => {
		if (stream.statusCode === 200) {
			pipeline(stream, res, (err) => {
				if (err) console.log('poster -> client pipeline error:', err);
			});
		} else {
			res.end();
		}
	});
});

WebApp.connectHandlers.use('/api', app); // Start listening for requests to all these routes