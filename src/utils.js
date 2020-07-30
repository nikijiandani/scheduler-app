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
