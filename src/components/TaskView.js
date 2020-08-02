import React from 'react';
import moment from 'moment';

const TaskView = ({
	driver,
	date,
	startTime,
	endTime,
	duration,
	taskType,
	description,
	location,
}) => {
	return (
		<div>
			<div>Driver: {`${driver.first_name} ${driver.last_name}`}</div>
			<div>Date: {moment(date).format('YYYY-MM-DD')}</div>
			<div>Start: {startTime}</div>
			<div>End: {endTime}</div>
			<div>Duration: {duration}</div>
			<div>Type of task: {taskType}</div>
			<div>Description: {description}</div>
			<div>Location: {location}</div>
		</div>
	);
};

export default TaskView;
