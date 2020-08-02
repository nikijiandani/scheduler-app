import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { hours } from '../hours';
import { getDay, stringFormat } from '../utils';

const Calendar = ({ days, tasks, setShowTaskModal, setSelectedTask }) => {
	const [dayWidth, setDayWidth] = useState(100);
	const ref = useRef();

	useEffect(() => {
		setDayWidth(ref.current.offsetWidth / 8);
	}, []);

	return (
		<>
			<Container>
				<colgroup>
					<Column />
					{days.map((day, i) => (
						<Column key={i} today={day.isSame(moment(), 'day')} />
					))}
				</colgroup>
				<Header>
					<Row ref={ref}>
						<Day />
						{days.map((day, i) => (
							<Day key={i} today={day.isSame(moment(), 'day')}>
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
				const height = Math.abs(
					task.end_time?.diff(task.start_time, 'minutes')
				);

				const midnight = task.start_time?.clone().startOf('day');
				const top = 93 + task.start_time?.diff(midnight, 'minutes');
				const left = dayWidth * getDay(moment(task.start_time).format('dddd'));

				return (
					<Wrapper
						top={top}
						left={left}
						key={task.id}
						tabIndex='0'
						onClick={() => {
							setSelectedTask(task);
							setShowTaskModal(true);
						}}
						taskType={task.type}
					>
						<Task
							xmlns='http://www.w3.org/2000/svg'
							width={dayWidth - 4}
							height={height}
						>
							<defs>
								<linearGradient id='grad1' x1='0%' y1='0%' x2='0%' y2='100%'>
									<stop
										offset='21%'
										style={{ stopColor: 'rgba(0,71,11,1)', stopOpacity: 1 }}
									/>
									<stop
										offset='100%'
										style={{ stopColor: 'rgba(0,180,28,1)', stopOpacity: 1 }}
									/>
								</linearGradient>
								<linearGradient id='grad2' x1='0%' y1='0%' x2='0%' y2='100%'>
									<stop
										offset='21%'
										style={{ stopColor: 'rgba(55,55,55,1)', stopOpacity: 1 }}
									/>
									<stop
										offset='100%'
										style={{ stopColor: 'rgba(153,153,153,1)', stopOpacity: 1 }}
									/>
								</linearGradient>
								<linearGradient id='grad3' x1='0%' y1='0%' x2='0%' y2='100%'>
									<stop
										offset='21%'
										style={{ stopColor: 'rgba(113,1,131,1)', stopOpacity: 1 }}
									/>
									<stop
										offset='100%'
										style={{ stopColor: 'rgba(167,0,194,1)', stopOpacity: 1 }}
									/>
								</linearGradient>
							</defs>
							<rect
								x='0'
								width={dayWidth}
								height={height}
								rx='4'
								fill={
									task.type === 'PICK-UP'
										? 'url(#grad1)'
										: task.type === 'DROP-OFF'
										? 'url(#grad2)'
										: 'url(#grad3)'
								}
							></rect>
							<TaskText width='100%' height='100%' fill='#fff'>
								<p>
									{`${task.start_time.format('HH:mm')} -
										${task.end_time.format('HH:mm')}`}
								</p>
								<hr />
								<p>{stringFormat(task.type)}</p>
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

const Column = styled.col`
	background: ${({ today }) => (today ? '#e9f8ff' : '#ffffff')};
`;

const Day = styled.th`
	padding: 1rem;
	width: 100%;
	position: sticky;
	top: 0;
	background: ${({ today }) => (today ? '#e9f8ff' : '#ffffff')};
	z-index: 1;
	box-shadow: 0 1px 0 0 grey;

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

	:first-child {
		border: none;
	}
`;

const Time = styled.time`
	position: absolute;
	top: 0;
	left: 0;
	padding-left: 1rem;
`;

const TaskText = styled.foreignObject`
	color: #fff;

	p {
		margin: 0.5rem;
		font-weight: 500;
		font-size: 0.875rem;
		text-align: left;
		line-height: 0.875rem;
	}

	hr {
		margin: 0 0.5rem;
	}
`;

const Task = styled.svg``;

const Wrapper = styled.div`
	width: fit-content;
	height: fit-content;
	position: absolute;
	top: ${({ top }) => top}px;
	left: ${({ left }) => left}px;
	cursor: pointer;

	:hover {
		svg {
			rect {
				fill: ${({ taskType }) =>
					taskType === 'PICK-UP'
						? '#00470b'
						: taskType === 'DROP-OFF'
						? '#373737'
						: '#710183'};
			}
		}
	}
`;

export default Calendar;
