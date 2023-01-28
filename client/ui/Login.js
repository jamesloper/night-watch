import React, { useState } from 'react';
import { Button, Input } from './index';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const submit = () => Meteor.loginWithPassword(email, password, (err) => {
		if (err) console.warn(err);
	});

	return (
		<div className="login">
			<div className="login-form">
				<Input
					placeholder="Email"
					onChangeText={setEmail}
					value={email}
					type="email"
				/>
				<Input
					placeholder="Password"
					onChangeText={setPassword}
					value={password}
					type="password"
				/>
				<Button title="Login" onClick={submit}/>
			</div>
		</div>
	);
};

export default Login;
