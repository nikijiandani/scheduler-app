import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { hours } from '../hours';
import { getDay } from '../utils';

const Calendar = ({ days, tasks }) => {
	const [dayWidth, setDayWidth] = useState(100);
	const ref = useRef();

	useEffect(() => {
		setDayWidth(ref.current.offsetWidth / 8);
	}, []);

	return (
		<>
			<Container>
				<Header>
					<Row ref={ref}>
						<Day />
						{days.map((day, i) => (
							<Day key={i}>
								<div>{moment(day).format('dddd')}</div>
								<div>{moment(day).format('D')}</div>
							</Day>
						))}
					</Row>
				</Header>
				<Content>
					{hours.map((hour) => (
						<Row key={hour}>
							<Cell>
								<Time>{hour}</Time>
							</Cell>
							{days.map((day) => (
								<Cell key={day}></Cell>
							))}
						</Row>
					))}
				</Content>
			</Container>
			{tasks.map((task) => {
				const height = task.end_time?.diff(task.start_time, 'minutes');
				const midnight = task.start_time?.clone().startOf('day');
				const top = 93 + task.start_time?.diff(midnight, 'minutes');
				const left = dayWidth * getDay(moment(task.start_time).format('dddd'));

				return (
					<Wrapper top={top} left={left} key={task.id}>
						<Task
							xmlns='http://www.w3.org/2000/svg'
							width={dayWidth}
							height={height}
						>
							<rect
								x='0'
								width={dayWidth}
								height={height}
								rx='10'
								fill='blue'
							></rect>
							<TaskText width='100%' height='100%' fill='#fff'>
								<p>
									{`${task.start_time.format('HH:mm')} -
										${task.end_time.format('HH:mm')}`}
								</p>
								<p>{task.type}</p>
							</TaskText>
						</Task>
					</Wrapper>
				);
			})}
		</>
	);
};

const Container = styled.table`
	width: 100%;
	table-layout: fixed;
	border-collapse: collapse;
	position: relative;
`;

const Header = styled.thead``;

const Content = styled.tbody``;

const Day = styled.th`
	padding: 1rem;
	width: 100%;
	position: sticky;
	top: 0;
	background: #ffffff;
	/* background: #058ad9;
	color: #ffffff; */
	z-index: 1;

	div {
		margin: 0.5rem;
	}
`;

const Cell = styled.td`
	position: relative;
`;

const Row = styled.tr`
	border: 1px solid grey;
	height: 3.75rem;
	width: 100%;
`;

const Time = styled.time`
	position: absolute;
	top: 0;
	left: 0;
`;

const TaskText = styled.foreignObject`
	color: #fff;

	p {
		margin: 0.5rem;
	}
`;

const Task = styled.svg`
	/* position: absolute;
	top: 0; */
`;

const Wrapper = styled.div`
	width: fit-content;
	height: fit-content;
	position: absolute;
	top: ${({ top }) => top}px;
	left: ${({ left }) => left}px;
`;

export default Calendar;
