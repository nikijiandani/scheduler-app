import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Icon } from '../styles';
import Close from '../assets/close-24px.svg';
import { drivers } from '../drivers';

const Modal = ({ selectedDriver, closeModal, handleSubmit }) => {
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

	useEffect(() => {
		setDuration(
			moment(endTime, 'HH:mm:ss').diff(moment(startTime, 'HH:mm:ss'), 'minutes')
		);
	}, [startTime, endTime]);

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
				<Form
					onSubmit={(e) =>
						handleSubmit(e, {
							type: taskType,
							description: description,
							location: location,
							driver_id: selectedDriver,
							start_time: startTime,
							end_time: endTime,
						})
					}
				>
					<div>Driver: {`${driver.first_name} ${driver.last_name}`}</div>
					<div>
						<label>
							Date:
							<input
								type='date'
								value={moment(date).format('YYYY-MM-DD')}
								onChange={(e) => setDate(e.target.value)}
							/>
						</label>
						<span>(Week {moment(date).week()})</span>
					</div>
					<div>
						<label>
							Start:
							<input
								type='time'
								value={startTime}
								onChange={(e) => setStartTime(e.target.value)}
								required
							/>
						</label>
					</div>
					<div>
						<label>
							End:
							<input
								type='time'
								value={endTime}
								onChange={(e) => setEndTime(e.target.value)}
								min={startTime}
								max='23:59'
								required
							/>
						</label>
					</div>
					<div>
						Duration:
						{`${Math.floor(duration / 60)} ${duration === 1 ? 'hr' : 'hrs'}`}
						{`${duration % 60} ${duration % 60 === 1 ? 'min' : 'mins'}`}
					</div>
					<div>
						<label>
							Type of task:
							<select
								name='task types'
								id='task-select'
								value={taskType}
								onChange={(e) => setTaskType(e.target.value)}
							>
								<option value='PICK-UP'>Pick up</option>
								<option value='DROP-OFF'>Drop off</option>
								<option value='OTHER'>Other</option>
							</select>
						</label>
					</div>
					<div>
						<label>
							Description:
							<input
								type='text'
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</label>
					</div>
					<div>
						<label>
							Location:
							<input
								type='text'
								value={location}
								onChange={(e) => setLocation(e.target.value)}
							/>
						</label>
					</div>
					<button type='submit'>Save</button>
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
