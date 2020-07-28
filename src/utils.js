import moment from 'moment';

export const generateWeek = (week) => {
	// Generate the list of months in the current locale
	const daysOfTheWeek = moment.weekdays();

	return daysOfTheWeek.map((day) => moment().day(day).week(week));
};
