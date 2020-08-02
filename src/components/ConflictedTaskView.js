import React from 'react';
import styled from 'styled-components';
import { EditButton, Wrapper } from '../styles';
import ErrorIcon from '../assets/error-24px.svg';

const ConflictedTaskView = ({
	conflictedTasks,
	setConflictedTasks,
	startTime,
	endTime,
	handleSaveAndOverwrite,
}) => {
	return (
		<>
			<Error>
				<img src={ErrorIcon} alt='task conflicts exist' /> Conflict
			</Error>
			<div>
				New Task:
				<div>
					{startTime} - {endTime}
				</div>
			</div>
			<div>
				Existing Task/s:
				<ul>
					{conflictedTasks.map((task) => (
						<li key={task.id}>
							{task.type} - {task.start_time.format('HH:mm')} -{' '}
							{task.end_time.format('HH:mm')}
						</li>
					))}
				</ul>
			</div>
			<Wrapper>
				<OverwriteButton type='button' onClick={handleSaveAndOverwrite}>
					Save & Overwrite
				</OverwriteButton>
				<EditButton type='button' onClick={() => setConflictedTasks([])}>
					Edit current task
				</EditButton>
			</Wrapper>
		</>
	);
};

const OverwriteButton = styled.button`
	background: #59a80f;

	:hover {
		background: #1a8922;
	}
`;

const Error = styled.div`
	display: flex;
	align-items: center;

	img {
		margin-right: 0.5rem;
	}
`;

export default ConflictedTaskView;
