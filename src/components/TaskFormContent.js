import React from 'react';
import moment from 'moment';
import { convertDateToHoursAndMinutes } from '../utils';

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
			<div>Driver: {`${driver.first_name} ${driver.last_name}`}</div>
			<div>
				<label>
					Date:
					<input
						type='date'
						value={moment(date).format('YYYY-MM-DD')}
						onChange={(e) => setDate(e.target.value)}
					/>
				</label>
				<span>(Week {moment(date).week()})</span>
			</div>
			<div>
				<label>
					Start:
					<input
						type='time'
						value={startTime}
						onChange={(e) => setStartTime(e.target.value)}
						required
					/>
				</label>
			</div>
			<div>
				<label>
					End:
					<input
						type='time'
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
				</label>
			</div>
			<div>
				Duration:
				{`${Math.floor(duration / 60)} ${duration === 1 ? 'hr' : 'hrs'}`}
				{`${duration % 60} ${duration % 60 === 1 ? 'min' : 'mins'}`}
			</div>
			<div>
				<label>
					Type of task:
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
				</label>
			</div>
			<div>
				<label>
					Description:
					<input
						type='text'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</label>
			</div>
			<div>
				<label>
					Location:
					<input
						type='text'
						value={location}
						onChange={(e) => setLocation(e.target.value)}
					/>
				</label>
			</div>
			<button type='submit'>Save</button>
		</>
	);
};

export default TaskFormContent;
