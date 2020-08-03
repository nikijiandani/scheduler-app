import React, { useState } from 'react';
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
	showModal,
	setShowModal,
	selectedDriverTasks,
	handleTaskSubmit,
	handleOverwrite,
	handleTaskDelete,
	handleDownload,
}) => {
	const [downloadView, setDownloadView] = useState(false);

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
				<DownloadButton
					onClick={() => {
						setDownloadView(true);
						setShowModal(true);
					}}
				>
					Download Schedule
				</DownloadButton>
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
			<NewTaskButton onClick={() => setShowModal(true)}>
				Add New Task
			</NewTaskButton>
			{showModal && (
				<Modal
					selectedDriver={selectedDriver}
					closeModal={() => setShowModal(false)}
					saveTask={handleTaskSubmit}
					tasks={selectedDriverTasks}
					handleOverwrite={handleOverwrite}
					selectedTask={selectedTask}
					setSelectedTask={setSelectedTask}
					handleTaskDelete={handleTaskDelete}
					downloadView={downloadView}
					setDownloadView={setDownloadView}
					handleDownload={handleDownload}
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

	select {
		height: 2rem;
		padding: 0 1rem 0 0.5rem;
	}

	label {
		margin-bottom: 0.5rem;
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

const DownloadButton = styled.button`
	background: #ad234b;

	:hover {
		background: #99173c;
	}
`;

export default Header;
