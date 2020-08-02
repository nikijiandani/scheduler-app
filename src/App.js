import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { extendMoment } from 'moment-range';
import styled from 'styled-components';
import { drivers } from './drivers';
import { taskData } from './task-data';
import { Calendar, Header } from './components';
import { generateWeek } from './utils';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

// Extend moment using the moment-range plugin
const momentPlus = extendMoment(moment);

function App() {
	const [selectedWeek, setSelectedWeek] = useState(moment(Date.now()).week());
	const [days, setDays] = useState([]);
	const [selectedDriver, setSelectedDriver] = useState(drivers[0].id);
	const [tasks, setTasks] = useState(taskData);
	const [selectedDriverTasks, setSelectedDriverTasks] = useState([]);
	const [showTaskModal, setShowTaskModal] = useState(false);
	const [selectedTask, setSelectedTask] = useState(null);

	useEffect(() => {
		setDays(generateWeek(selectedWeek));

		const start = moment().day('Sunday').week(selectedWeek).startOf('day');
		const end = moment().day('Saturday').week(selectedWeek).endOf('day');

		//create a moment range for the selected week
		const range = momentPlus.range(start, end);

		// filter tasks by driver for selected week
		setSelectedDriverTasks(
			tasks.filter(
				(t) =>
					t.driver_id === selectedDriver &&
					range.contains(t.start_time) &&
					range.contains(t.end_time)
			)
		);
	}, [selectedWeek, selectedDriver, tasks]);

	const handleTaskSubmit = (task) => {
		// if editing existing task, update existing task
		if (selectedTask) {
			task.id = selectedTask.id;
			setTasks([...tasks.filter((t) => t.id !== selectedTask.id), task]);
			setSelectedTask(null);
		} else {
			task.id = uuidv4();
			setTasks([...tasks, task]);
		}
	};

	const handleOverwrite = (conflictedTasks, newTask) => {
		const conflictedTaskIds = conflictedTasks.map((t) => t.id);
		const tasksWithNoConflicts = tasks.filter(
			(t) => !conflictedTaskIds.includes(t.id)
		);
		newTask.id = uuidv4();
		setTasks([...tasksWithNoConflicts, newTask]);
		setShowTaskModal(false);
	};

	const handleTaskDelete = (task) => {
		setTasks([...tasks.filter((t) => t.id !== task.id)]);
	};

	return (
		<div className='App'>
			<Header
				selectedDriver={selectedDriver}
				setSelectedDriver={setSelectedDriver}
				selectedWeek={selectedWeek}
				setSelectedWeek={setSelectedWeek}
				selectedTask={selectedTask}
				setSelectedTask={setSelectedTask}
				showTaskModal={showTaskModal}
				setShowTaskModal={setShowTaskModal}
				selectedDriverTasks={selectedDriverTasks}
				handleTaskSubmit={handleTaskSubmit}
				handleOverwrite={handleOverwrite}
				handleTaskDelete={handleTaskDelete}
			/>
			<Main>
				<Calendar
					days={days}
					tasks={selectedDriverTasks}
					setShowTaskModal={setShowTaskModal}
					setSelectedTask={setSelectedTask}
				/>
			</Main>
		</div>
	);
}

const Main = styled.main`
	height: calc(100vh - 4rem);
	position: relative;
	overflow: auto;
`;

export default App;
