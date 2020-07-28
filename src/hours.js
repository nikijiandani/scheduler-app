import moment from 'moment';

const generateHours = () => {
	const arr = [];

	new Array(24).fill().forEach((item, i) => {
		arr.push(moment({ hour: i }).format('h:mm A'));
	});

	return arr;
};

export const hours = generateHours();
