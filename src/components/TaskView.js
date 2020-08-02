import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { convertMinutesToHoursAndMinutes, stringFormat } from '../utils';
import EditIcon from '../assets/edit-24px.svg';
import DeleteIcon from '../assets/delete-24px.svg';
import { EditButton, Wrapper } from '../styles';

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
				<Strong>Driver:</Strong>{' '}
				<span>{`${driver.first_name} ${driver.last_name}`}</span>
			</div>
			<div>
				<Strong> Date:</Strong> <span>{moment(date).format('YYYY-MM-DD')}</span>
			</div>
			<div>
				<Strong>Start: </Strong>
				<span>{startTime} hrs</span>
			</div>
			<div>
				<Strong>End: </Strong>
				<span>{endTime} hrs</span>
			</div>
			<div>
				<Strong>Duration:</Strong>
				<span>{convertMinutesToHoursAndMinutes(duration)}</span>
			</div>
			<div>
				<Strong>Type of task:</Strong> <span>{stringFormat(taskType)}</span>
			</div>
			<div>
				<Strong>Description:</Strong> <span>{description}</span>
			</div>
			<div>
				<Strong>Location: </Strong>
				<span>{location}</span>
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

	div {
		display: flex;
	}
`;

const DeleteButton = styled.button`
	background: #fe3907;

	:hover {
		background: #a80000;
	}
`;

const Strong = styled.strong`
	width: 8rem;
	display: inline-block;
`;

export default TaskView;
