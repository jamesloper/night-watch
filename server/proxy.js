import express from 'express';
import http from 'node:http';
import { pipeline } from 'node:stream';
import { Cameras } from '../db';
import { authParser } from './imports/middleware';
import { fetchText } from './imports/util';

export const app = express();
app.set('json spaces', 2);
app.set('trust proxy', true);

app.use(authParser, (req, res, next) => {
	// console.log(req.method, req.originalUrl, '(', req.user ? req.user.username : 'Anon', ')');
	next();
});

const getCamera = (id) => {
	return Cameras.findOne({'_id': id}, {fields: {_raw: 0}});
};

app.use('/:id/index.m3u8', async (req, res, next) => {
	const camera = getCamera(req.params.id);
	if (!camera) return next(`Invalid camera ID (${req.params.id})`);
	try {
		const hls = await fetchText(`${camera.streamUrl}index.m3u8`);
		res.end(hls);
	} catch (err) {
		next(err);
	}
});

app.use('/:id/stream.m3u8', async (req, res, next) => {
	const camera = getCamera(req.params.id);
	if (!camera) return next(`Invalid camera ID (${req.params.id})`);
	try {
		const hls = await fetchText(`${camera.streamUrl}stream.m3u8`);
		res.end(hls);
	} catch (err) {
		next(err);
	}
});

app.use('/:id/:segment.ts', async (req, res, next) => {
	const {id, segment} = req.params;
	const camera = getCamera(id);
	if (!camera) return next(`Invalid camera ID (${id})`);

	http.get(`${camera.streamUrl}${segment}.ts`, (stream) => {
		if (stream.statusCode === 200) {
			pipeline(stream, res, (err) => {
				if (err) console.log('Pipeline Error (Stream -> Client)', err);
			});
		} else {
			res.end();
		}
	});
});

WebApp.connectHandlers.use('/api', app);