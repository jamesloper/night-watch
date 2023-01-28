import React from 'react';
import { c } from '../imports/util';

const iOS = /iPad|iPhone|iPod/.test(navigator.platform);

const iconMap = {
	'os:back': iOS ? 'arrow_back_ios' : 'arrow_back',
	'os:share': iOS ? 'ios_share' : 'share',
	'os:close': iOS ? 'keyboard_arrow_down' : 'close',
};

export const Icon = ({icon, className, color, title, size, onClick}) => (
	<i className={c('material-icons', className)}
	   style={{color, fontSize: size}}
	   title={title}
	   onClick={onClick}
	   children={iconMap[icon] || icon}
	/>
);

export const Input = ({placeholder, value, type, onChangeText}) => (
	<input placeholder={placeholder} value={value} onChange={e => onChangeText(e.target.value)} type={type}/>
);

export const Button = ({icon, title, disabled, onClick, loading}) => (
	<button onClick={onClick} disabled={disabled || loading}>
		{icon && <Icon icon={icon}/>}
		{title}
	</button>
);