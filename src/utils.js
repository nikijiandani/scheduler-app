import moment from 'moment';

export const generateWeek = (week) => {
	// Generate the list of months in the current locale
	const daysOfTheWeek = moment.weekdays();

	return daysOfTheWeek.map((day) => moment().day(day).week(week));
};

export const getDay = (day) => {
	switch (day) {
		case 'Sunday':
			return 1;
		case 'Monday':
			return 2;
		case 'Tuesday':
			return 3;
		case 'Wednesday':
			return 4;
		case 'Thursday':
			return 5;
		case 'Friday':
			return 6;
		case 'Saturday':
			return 7;
		default:
			return 1;
	}
};

export const convertDateToHoursAndMinutes = (date) => {
	const hours = new Date(date).getHours();
	const mins = new Date(date).getMinutes();

	return `${hours < 10 ? `0${hours}` : hours}:${mins < 10 ? `0${mins}` : mins}`;
};

export const convertMinutesToHoursAndMinutes = (duration) => {
	return `${Math.floor(duration / 60)} ${duration === 1 ? 'hr' : 'hrs'} ${
		duration % 60
	} ${duration % 60 === 1 ? 'min' : 'mins'}`;
};

// Formats the first letter of every word in the string to uppercase except 'and' and '&'
export function stringFormat(str) {
	const arr = str.toLowerCase().split('-');
	const result = arr
		.map((item) => {
			if (item !== 'and' && item !== '&') {
				return item[0].toUpperCase() + item.slice(1, item.length);
			}
			return item;
		})
		.join(' ');
	return result;
}
