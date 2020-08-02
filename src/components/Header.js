import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import ArrowLeft from '../assets/keyboard_arrow_left-24px.svg';
import ArrowRight from '../assets/keyboard_arrow_right-24px.svg';
import { Modal } from './';
import { drivers } from '../drivers';
import { Icon } from '../styles';

const Header = ({
	selectedDriver,
	setSelectedDriver,
	selectedWeek,
	setSelectedWeek,
	selectedTask,
	setSelectedTask,
	showTaskModal,
	setShowTaskModal,
	selectedDriverTasks,
	handleTaskSubmit,
	handleOverwrite,
}) => {
	return (
		<Container>
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
		</Container>
	);
};

const Container = styled.header`
	display: flex;
	justify-content: space-between;
	padding: 1rem;
	height: 20%;
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

export default Header;
