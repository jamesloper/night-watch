import { fetchJson } from './util';
import { Random } from 'meteor/random';
import { Cameras } from '../../db';

const baseUrl = 'http://174.138.49.27:5000';

export const refreshWyzeCamsAsync = async () => {
	const date = new Date();
	const data = await fetchJson(`${baseUrl}/api`);

	const cams = Object.keys(data.cameras).map(id => {
		const raw = data.cameras[id];
		const doc = {
			'_id': raw.mac,
			'_raw': raw,
			'name': raw.nickname,
		};
		if (raw.enabled) Object.assign(doc, {
			'streamUrl': raw.hls_url,
			'posterUrl': `${baseUrl}/${raw.snapshot_url}?${Random.id()}`,
		});

		return doc;
	});

	if (cams.length === 0) return;
	const bulk = Cameras.rawCollection().initializeUnorderedBulkOp();
	cams.forEach(camera => {
		bulk.find({'_id': camera._id}).upsert().update({
			$set: camera,
			$setOnInsert: {'addedOn': date},
		});
	});
	bulk.execute();
};
