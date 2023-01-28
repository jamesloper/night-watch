export const fetchText = async (method, opts) => {
	const response = await fetch(method, opts);
	const data = await response.text();
	if (response.status === 200) return data;
	throw data;
};

export const fetchJson = async (method, opts) => {
	const response = await fetch(method, opts);
	const data = await response.json();
	if (response.status === 200) return data;
	throw data;
};

export const checkAdmin = () => {
	const user = Meteor.user();
	if (!user) throw new Meteor.Error('admin', 'Admin is not logged in!');
	if (!user.isAdmin) throw new Meteor.Error('admin', 'Need to be admin, this incident has been logged');
	return user;
};
