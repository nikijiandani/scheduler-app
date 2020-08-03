import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { extendMoment } from 'moment-range';
import { Icon, Strong, Wrapper } from '../styles';
import Close from '../assets/close-24px.svg';
import { drivers } from '../drivers';
import {
	TaskFormContent,
	TaskView,
	ConflictedTaskView,
	DownloadScheduleForm,
} from './';
import { convertDateToHoursAndMinutes } from '../utils';

// Extend moment using the moment-range plugin
const momentPlus = extendMoment(moment);

// Component
const Modal = ({
	selectedDriver,
	tasks,
	closeModal,
	saveTask,
	handleOverwrite,
	selectedTask,
	setSelectedTask,
	handleTaskDelete,
	downloadView,
	setDownloadView,
	handleDownload,
}) => {
	const [date, setDate] = useState(
		selectedTask ? new Date(selectedTask.start_time) : Date.now()
	);
	const [startTime, setStartTime] = useState(
		selectedTask
			? convertDateToHoursAndMinutes(selectedTask.start_time)
			: '00:00'
	);
	const [endTime, setEndTime] = useState(
		selectedTask ? convertDateToHoursAndMinutes(selectedTask.end_time) : '01:00'
	);
	const [duration, setDuration] = useState(
		moment(selectedTask ? selectedTask.end_time : endTime, 'HH:mm:ss').diff(
			moment(selectedTask ? selectedTask.start_time : startTime, 'HH:mm:ss'),
			'minutes'
		)
	);
	const [taskType, setTaskType] = useState(
		selectedTask ? selectedTask.type : 'PICK-UP'
	);
	const [description, setDescription] = useState(
		selectedTask ? selectedTask.description : ''
	);
	const [location, setLocation] = useState(
		selectedTask ? selectedTask.location : ''
	);
	const [conflictedTasks, setConflictedTasks] = useState([]);
	const [editing, setEditing] = useState(false);
	const driver = drivers.find((driver) => driver.id === selectedDriver);

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
		let conflicts = tasks.filter((t) => {
			const taskRange = momentPlus.range(t.start_time, t.end_time);
			return range.overlaps(taskRange, { adjacent: false });
		});

		// if editing a task, filter out the task being edited
		if (selectedTask) {
			conflicts = conflicts.filter((t) => t.id !== selectedTask.id);
		}

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

	const handleSaveAndOverwrite = () => {
		const start = moment(moment(date).format('YYYY-MM-DD') + ' ' + startTime);
		const end = moment(moment(date).format('YYYY-MM-DD') + ' ' + endTime);

		handleOverwrite(conflictedTasks, {
			type: taskType,
			description: description,
			location: location,
			driver_id: selectedDriver,
			start_time: start,
			end_time: end,
		});
	};

	return (
		<Overlay>
			<Container>
				<Header>
					<h1>
						{downloadView
							? 'Download Schedule'
							: selectedTask && editing
							? 'Editing Task'
							: selectedTask
							? 'Task'
							: 'Create a new task'}
					</h1>
					<Icon
						src={Close}
						alt='close modal'
						tabIndex='0'
						onClick={() => {
							closeModal();
							setSelectedTask(null);
							setDownloadView(false);
						}}
					/>
				</Header>
				<hr />
				{downloadView ? (
					<>
						<Wrapper>
							<Strong>Driver:</Strong>
							<span>{`${driver.first_name} ${driver.last_name}`}</span>
						</Wrapper>
						<DownloadScheduleForm handleDownload={handleDownload} />
					</>
				) : selectedTask && !editing ? (
					<TaskView
						driver={driver}
						date={date}
						startTime={startTime}
						endTime={endTime}
						duration={duration}
						taskType={taskType}
						description={description}
						location={location}
						setEditing={setEditing}
						closeModal={closeModal}
						selectedTask={selectedTask}
						setSelectedTask={setSelectedTask}
						handleTaskDelete={handleTaskDelete}
					/>
				) : (
					<Form onSubmit={(e) => handleSubmit(e)}>
						{conflictedTasks.length === 0 ? (
							<TaskFormContent
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
							<ConflictedTaskView
								conflictedTasks={conflictedTasks}
								setConflictedTasks={setConflictedTasks}
								handleSaveAndOverwrite={handleSaveAndOverwrite}
								startTime={startTime}
								endTime={endTime}
								type={taskType}
							/>
						)}
					</Form>
				)}
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
	height: fit-content;
	position: absolute;
	top: 15%;
	left: 25%;
	padding: 1rem;
	background: #ffffff;
	border: 1px solid grey;
	border-radius: 5px;
	box-shadow: 1px 1px 1px #a0a0a0;

	button {
		margin-right: 1rem;
	}
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
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	div {
		padding: 0.5rem 0;
		text-align: left;
	}

	input,
	select {
		height: 2rem;
		padding: 0 1rem 0 0.5rem;
	}
`;

export default Modal;
