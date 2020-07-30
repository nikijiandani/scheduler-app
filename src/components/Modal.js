import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Icon } from '../styles';
import Close from '../assets/close-24px.svg';
import { drivers } from '../drivers';
import { extendMoment } from 'moment-range';
import { NewTaskFormContent } from './';

const momentPlus = extendMoment(moment);

const Modal = ({
	selectedDriver,
	tasks,
	closeModal,
	saveTask,
	handleOverwrite,
}) => {
	const [date, setDate] = useState(Date.now());
	const [startTime, setStartTime] = useState('00:00');
	const [endTime, setEndTime] = useState('01:00');
	const [duration, setDuration] = useState(
		moment(endTime, 'HH:mm:ss').diff(moment(startTime, 'HH:mm:ss'), 'minutes')
	);
	const [taskType, setTaskType] = useState('PICK-UP');
	const [description, setDescription] = useState('');
	const [location, setLocation] = useState('');
	const [driver, setDriver] = useState(
		drivers.find((driver) => driver.id === selectedDriver)
	);
	const [conflictedTasks, setConflictedTasks] = useState([]);

	useEffect(() => {
		setDuration(
			moment(endTime, 'HH:mm:ss').diff(moment(startTime, 'HH:mm:ss'), 'minutes')
		);
	}, [startTime, endTime]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const start = moment(moment(date).format('YYYY-MM-DD') + ' ' + startTime);
		const end = moment(moment(date).format('YYYY-MM-DD') + ' ' + endTime);

		//create a moment range
		const range = momentPlus.range(start, end);

		// check if task conflicts with existing tasks
		const conflicts = tasks.filter(
			(t) => range.contains(t.start_time) || range.contains(t.end_time)
		);

		if (conflicts.length === 0) {
			saveTask({
				type: taskType,
				description: description,
				location: location,
				driver_id: selectedDriver,
				start_time: start,
				end_time: end,
			});
			closeModal();
		} else {
			//handle task conflict
			setConflictedTasks(conflicts);
		}
	};

	return (
		<Overlay>
			<Container>
				<Header>
					<h1>Create a new task</h1>
					<Icon
						src={Close}
						alt='close modal'
						tabIndex='0'
						onClick={() => closeModal()}
					/>
				</Header>
				<Form onSubmit={(e) => handleSubmit(e)}>
					{conflictedTasks.length === 0 ? (
						<NewTaskFormContent
							driver={driver}
							date={date}
							setDate={setDate}
							startTime={startTime}
							setStartTime={setStartTime}
							endTime={endTime}
							setEndTime={setEndTime}
							duration={duration}
							taskType={taskType}
							setTaskType={setTaskType}
							description={description}
							setDescription={setDescription}
							location={location}
							setLocation={setLocation}
						/>
					) : (
						<>
							<div>! Conflict</div>
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
							<button
								type='button'
								onClick={() =>
									handleOverwrite(conflictedTasks, {
										type: taskType,
										description: description,
										location: location,
										driver_id: selectedDriver,
										start_time: startTime,
										end_time: endTime,
									})
								}
							>
								Save & Overwrite
							</button>
							<button type='button' onClick={() => setConflictedTasks([])}>
								Edit current task
							</button>
						</>
					)}
				</Form>
			</Container>
		</Overlay>
	);
};

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.6);
	z-index: 2;
`;

const Container = styled.div`
	width: 50%;
	height: 50%;
	position: absolute;
	top: 25%;
	left: 25%;
	padding: 1rem;
	background: #ffffff;
	border: 1px solid grey;
	border-radius: 5px;
	box-shadow: 1px 1px 1px #a0a0a0;
`;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	h1 {
		font-size: 1.75rem;
		margin: 0;
	}
`;

const Form = styled.form`
	/* border: 1px solid #000; */
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	div {
		padding: 0.5rem 0;
	}
`;

export default Modal;
