import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import {
	convertDateToHoursAndMinutes,
	convertMinutesToHoursAndMinutes,
} from '../utils';

const TaskFormContent = ({
	driver,
	date,
	setDate,
	startTime,
	setStartTime,
	endTime,
	setEndTime,
	duration,
	taskType,
	setTaskType,
	description,
	setDescription,
	location,
	setLocation,
}) => {
	return (
		<>
			<div>
				<Label>Driver:</Label> {`${driver.first_name} ${driver.last_name}`}
			</div>
			<div>
				<Label htmlFor='date'>Date:</Label>
				<input
					type='date'
					id='date'
					value={moment(date).format('YYYY-MM-DD')}
					onChange={(e) => setDate(e.target.value)}
				/>
				<span>(Week {moment(date).week()})</span>
			</div>
			<div>
				<Label htmlFor='start-time'>Start:</Label>
				<input
					type='time'
					id='start-time'
					value={startTime}
					onChange={(e) => setStartTime(e.target.value)}
					required
				/>
			</div>
			<div>
				<Label htmlFor='end-time'>End:</Label>
				<input
					type='time'
					id='end-time'
					value={endTime}
					onChange={(e) => setEndTime(e.target.value)}
					min={convertDateToHoursAndMinutes(
						moment(moment(date).format('YYYY-MM-DD') + ' ' + startTime).add(
							1,
							'hour'
						)
					)}
					max='23:59'
					required
				/>
			</div>
			<div>
				<Label>Duration:</Label>
				{convertMinutesToHoursAndMinutes(duration)}
			</div>
			<div>
				<Label htmlFor='task-select'>Type of task:</Label>
				<select
					name='task types'
					id='task-select'
					value={taskType}
					onChange={(e) => setTaskType(e.target.value)}
				>
					<option value='PICK-UP'>Pick up</option>
					<option value='DROP-OFF'>Drop off</option>
					<option value='OTHER'>Other</option>
				</select>
			</div>
			<div>
				<Label htmlFor='location'>Location:</Label>
				<input
					type='text'
					id='location'
					value={location}
					onChange={(e) => setLocation(e.target.value)}
				/>
			</div>
			<div>
				<Label htmlFor='description'>Description:</Label>
				<textarea
					value={description}
					id='description'
					onChange={(e) => setDescription(e.target.value)}
				/>
			</div>
			<SaveButton type='submit'>Save</SaveButton>
		</>
	);
};

const SaveButton = styled.button`
	background: #0000ff;
	margin-top: 2rem;

	:hover {
		background: #003366;
	}
`;

const Label = styled.label`
	width: 8rem;
	display: inline-block;
`;

export default TaskFormContent;
