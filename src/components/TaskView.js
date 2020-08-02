import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { convertMinutesToHoursAndMinutes, stringFormat } from '../utils';
import EditIcon from '../assets/edit-24px.svg';
import DeleteIcon from '../assets/delete-24px.svg';

const TaskView = ({
	driver,
	date,
	startTime,
	endTime,
	duration,
	taskType,
	description,
	location,
	setEditing,
	closeModal,
	selectedTask,
	setSelectedTask,
	handleTaskDelete,
}) => {
	return (
		<Container>
			<div>
				<strong>Driver:</strong> {`${driver.first_name} ${driver.last_name}`}
			</div>
			<div>
				<strong> Date:</strong> {moment(date).format('YYYY-MM-DD')}
			</div>
			<div>
				<strong>Start: </strong>
				{startTime} hrs
			</div>
			<div>
				<strong>End: </strong>
				{endTime} hrs
			</div>
			<div>
				<strong>Duration:</strong> {convertMinutesToHoursAndMinutes(duration)}
			</div>
			<div>
				<strong>Type of task:</strong> {stringFormat(taskType)}
			</div>
			<div>
				<strong>Description:</strong> {description}
			</div>
			<div>
				<strong>Location: </strong>
				{location}
			</div>

			<Wrapper>
				<EditButton onClick={() => setEditing(true)}>
					<img src={EditIcon} alt='edit task' /> Edit
				</EditButton>

				<DeleteButton
					onClick={() => {
						closeModal();
						setSelectedTask(null);
						handleTaskDelete(selectedTask);
					}}
				>
					<img src={DeleteIcon} alt='delete task' />
					Delete
				</DeleteButton>
			</Wrapper>
		</Container>
	);
};

const Container = styled.div`
	text-align: left;
	line-height: 1.5rem;

	button {
		margin-right: 1rem;
	}
`;

const Wrapper = styled.div`
	margin-top: 2rem;
	display: flex;
`;

const EditButton = styled.button`
	background: #0000ff;

	:hover {
		background: #003366;
	}
`;
const DeleteButton = styled.button`
	background: #fe3907;

	:hover {
		background: #a80000;
	}
`;

export default TaskView;
