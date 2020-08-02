import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

export const taskData = [
	{
		id: uuidv4(),
		type: 'PICK-UP',
		description: 'Picking up a shipment',
		location: 'Pleasant Park',
		driver_id: 1,
		start_time: moment(new Date('2020-8-01')),
		end_time: moment(new Date('2020-8-01')).add(1, 'hour'),
	},
	{
		id: uuidv4(),
		type: 'DROP-OFF',
		description: 'Dropping off some items',
		location: 'Catty Corner',
		driver_id: 2,
		start_time: moment(new Date('2020-8-02')),
		end_time: moment(new Date('2020-8-02')).add(3, 'hours'),
	},
	{
		id: uuidv4(),
		type: 'OTHER',
		description: 'Coffee break',
		location: 'The Authority',
		driver_id: 3,
		start_time: moment(new Date('2020-8-02')).add(6, 'hours'),
		end_time: moment(new Date('2020-8-02')).add(8, 'hours'),
	},
	{
		id: uuidv4(),
		type: 'PICK-UP',
		description: 'Picking up some boxes',
		location: 'Sweaty Sands',
		driver_id: 1,
		start_time: moment(new Date('2020-8-02')).add(6, 'hours'),
		end_time: moment(new Date('2020-8-02')).add(10, 'hours'),
	},
];
