import moment from 'moment';

export const taskData = [
	{
		id: 1,
		type: 'PICK-UP',
		description: '',
		location: 'Pleasant Park',
		driver_id: 1,
		start_time: moment(),
		end_time: moment().add(1, 'hour'),
	},
	{
		id: 2,
		type: 'DROP-OFF',
		description: '',
		location: 'Catty Corner',
		driver_id: 2,
		start_time: moment(),
		end_time: moment().add(3, 'hours'),
	},
	{
		id: 3,
		type: 'OTHER',
		description: 'Coffee break',
		location: 'The Authority',
		driver_id: 3,
		start_time: moment().subtract(1, 'hour'),
		end_time: moment().add(4, 'hours'),
	},
	{
		id: 4,
		type: 'PICK-UP',
		description: '',
		location: 'Sweaty Sands',
		driver_id: 1,
		start_time: moment(),
		end_time: moment().add(1, 'hour'),
	},
];
