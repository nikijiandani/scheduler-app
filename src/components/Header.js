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
	handleTaskDelete,
}) => {
	return (
		<Container>
			<Wrapper>
				<label htmlFor='driver-select'>
					Driver:
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
				</label>
				<label htmlFor='day-interval-select'>
					Download schedule
					<select name='day intervals' id='day-interval-select'>
						<option value='2'>2 days</option>
						<option value='4'>4 days</option>
						<option value='7'>7 days</option>
						<option value='14'>14 days</option>
						<option value='28'>28 days</option>
					</select>
				</label>
			</Wrapper>
			<Wrapper>
				<WeekContainer>
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
				</WeekContainer>
				<Today onClick={() => setSelectedWeek(moment(Date.now()).week())}>
					Today
				</Today>
			</Wrapper>
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
					handleTaskDelete={handleTaskDelete}
				/>
			)}
		</Container>
	);
};

const Container = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem;
	height: 20%;

	button {
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		height: 2.625rem;
		padding: 0 1rem;
		font-size: 1rem;
		border: none;
		font-weight: 600;
		border-radius: 4px;
		color: #ffffff;

		img {
			margin-right: 0.5rem;
			width: 1.25rem;
		}
	}
`;

const Wrapper = styled.div`
	min-width: 8rem;
	text-align: left;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	button {
		height: 2rem;
	}
`;

const WeekContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 0.5rem;
`;

const Today = styled.button`
	cursor: pointer;
	background: #606060;

	:hover {
		background: #3e4147;
	}
`;

const NewTaskButton = styled.button`
  cursor: pointer;
	background: #0000ff;

	:hover {
		background: #003366;
`;

export default Header;
