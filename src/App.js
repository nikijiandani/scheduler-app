import React, { useState, useEffect } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import ArrowLeft from './assets/keyboard_arrow_left-24px.svg';
import ArrowRight from './assets/keyboard_arrow_right-24px.svg';
import { drivers } from './drivers';
import { Calendar } from './components';
import { generateWeek } from './utils';
import './App.css';

function App() {
	const [currentWeek, setCurrentWeek] = useState(moment(Date.now()).week());
	const [days, setDays] = useState([]);

	useEffect(() => {
		setDays(generateWeek(currentWeek));
	}, [currentWeek]);

	return (
		<div className='App'>
			<Header>
				<div>
					<label htmlFor='driver-select'>Driver:</label>
					<select name='drivers' id='driver-select'>
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
							setCurrentWeek(
								moment(Date.now())
									.week(currentWeek - 1)
									.week()
							)
						}
					/>
					{`Week ${currentWeek}`}
					<Icon
						src={ArrowRight}
						alt='next week'
						onClick={() =>
							setCurrentWeek(
								moment(Date.now())
									.week(currentWeek + 1)
									.week()
							)
						}
					/>
				</WeekWrapper>
				<Today onClick={() => setCurrentWeek(moment(Date.now()).week())}>
					Today
				</Today>
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
				<Calendar days={days} />
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

const Icon = styled.img`
	cursor: pointer;

	:hover {
		background: #e5e5e5;
		border-radius: 50%;
	}
`;

const Today = styled.button`
	cursor: pointer;
`;

export default App;
