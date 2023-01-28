export const callMethod = (methodName, opts = {}) => {
	if (opts.confirm) {
		const ok = confirm(opts.confirm);
		if (!ok) return;
	}
	if (opts.onLoading) opts.onLoading(true);
	Meteor.call(methodName, opts.data, (err, res) => {
		if (opts.onLoading) opts.onLoading(false);
		if (err) return console.warn(err.reason);
		if (opts.onSuccess) opts.onSuccess(res);
	});
};

export const c = (...rest) => rest.filter(Boolean).join(' ');