import moment from 'moment';
import { extendMoment } from 'moment-range';

// Extend moment using the moment-range plugin
const momentPlus = extendMoment(moment);

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
export const stringFormat = (str) => {
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
};

export const generateCSVContent = (selectedDivision, tasks, selectedDriver) => {
	const rows = [['Time-Frame', 'Pickup', 'Drop-off', 'Other']];

	// start at the beginning of the year
	let dayOfYear = 1;

	while (dayOfYear < 365) {
		const row = new Array(4);
		row[0] = `Day ${dayOfYear} - Day ${
			dayOfYear + parseInt(selectedDivision, 10)
		}`;
		// calculate pickup, dropoff and other for selected driver
		const result = {
			pickup: 0,
			dropoff: 0,
			other: 0,
		};
		//filter current selected drivers tasks
		const driverTasks = tasks.filter((t) => t.driver_id === selectedDriver);

		// create a date range for the current row
		const range = momentPlus.range(
			moment().dayOfYear(dayOfYear),
			moment().dayOfYear(dayOfYear + parseInt(selectedDivision, 10))
		);

		for (const t of driverTasks) {
			// create a range for the current task
			const taskRange = momentPlus.range(t.start_time, t.end_time);

			// check if task falls under the current row range
			if (range.overlaps(taskRange, { adjacent: false })) {
				t.type === 'PICK-UP'
					? result.pickup++
					: t.type === 'DROP-OFF'
					? result.dropoff++
					: result.other++;
			}
		}

		row[1] = result.pickup;
		row[2] = result.dropoff;
		row[3] = result.other;
		rows.push(row);
		dayOfYear = dayOfYear + parseInt(selectedDivision, 10);
	}

	// Join rows and return CSV based on selected task division
	return `data:text/csv;charset=utf-8,${rows
		.map((e) => e.join(','))
		.join('\n')}`;
};
