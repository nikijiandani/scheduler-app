import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { extendMoment } from 'moment-range';
import styled from 'styled-components';
import ArrowLeft from './assets/keyboard_arrow_left-24px.svg';
import ArrowRight from './assets/keyboard_arrow_right-24px.svg';
import { drivers } from './drivers';
import { taskData } from './task-data';
import { Calendar, Modal } from './components';
import { generateWeek } from './utils';
import './App.css';
import { Icon } from './styles';
import { v4 as uuidv4 } from 'uuid';

// Extend moment using the moment-range plugin
const momentPlus = extendMoment(moment);

function App() {
	const [selectedWeek, setSelectedWeek] = useState(moment(Date.now()).week());
	const [days, setDays] = useState([]);
	const [selectedDriver, setSelectedDriver] = useState(drivers[0].id);
	const [tasks, setTasks] = useState(taskData);
	const [selectedDriverTasks, setSelectedDriverTasks] = useState(
		taskData.filter((t) => t.driver_id === selectedDriver)
	);
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
					(range.contains(t.start_time) || range.contains(t.end_time))
			)
		);
	}, [selectedWeek, selectedDriver, tasks]);

	const handleTaskSubmit = (task) => {
		task.id = uuidv4();
		setTasks([...tasks, task]);
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

	return (
		<div className='App'>
			<Header>
				<div>
					<label htmlFor='driver-select'>Driver:</label>
					<select
						name='drivers'
						id='driver-select'
						onChange={(e) => setSelectedDriver(parseInt(e.target.value, 10))}
						value={selectedDriver.id}
					>
						{drivers.map((driver) => (
							<option value={driver.id} key={driver.id}>
								{`${driver.first_name} ${driver.last_name}`}
							</option>
						))}
					</select>
				</div>
				<WeekWrapper>
					<Icon
						src={ArrowLeft}
						alt='previous week'
						onClick={() =>
							setSelectedWeek(
								moment(Date.now())
									.week(selectedWeek - 1)
									.week()
							)
						}
					/>
					{`Week ${selectedWeek}`}
					<Icon
						src={ArrowRight}
						alt='next week'
						onClick={() =>
							setSelectedWeek(
								moment(Date.now())
									.week(selectedWeek + 1)
									.week()
							)
						}
					/>
				</WeekWrapper>
				<Today onClick={() => setSelectedWeek(moment(Date.now()).week())}>
					Today
				</Today>
				<NewTaskButton onClick={() => setShowTaskModal(true)}>
					Add New Task
				</NewTaskButton>
				{showTaskModal && (
					<Modal
						selectedDriver={selectedDriver}
						closeModal={() => setShowTaskModal(false)}
						saveTask={handleTaskSubmit}
						tasks={selectedDriverTasks}
						handleOverwrite={handleOverwrite}
						selectedTask={selectedTask}
						setSelectedTask={setSelectedTask}
					/>
				)}
				<div>
					Download schedule
					<select name='day intervals' id='day-interval-select'>
						<option value='2'>2 days</option>
						<option value='4'>4 days</option>
						<option value='7'>7 days</option>
						<option value='14'>14 days</option>
						<option value='28'>28 days</option>
					</select>
				</div>
			</Header>
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

const Header = styled.header`
	display: flex;
	justify-content: space-between;
	padding: 1rem;
	height: 20%;
`;

const Main = styled.main`
	height: calc(100vh - 4rem);
	position: relative;
	overflow: auto;
`;

const WeekWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	min-width: 8rem;
`;

const Today = styled.button`
	cursor: pointer;
`;

const NewTaskButton = styled.button`
	cursor: pointer;
`;

export default App;
