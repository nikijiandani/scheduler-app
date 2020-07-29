import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { hours } from '../hours';

const Calendar = ({ days, tasks }) => {
	console.log(tasks);

	return (
		<Container>
			<Header>
				<Row>
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
			{/* {tasks.map((task) => (
				<svg
					viewBox='0 0 220 100'
					xmlns='http://www.w3.org/2000/svg'
					key={task.id}
				>
					<rect x='120' width='100' height='100' rx='15'>
						<text>{task.description}</text>
					</rect>
				</svg>
			))} */}
		</Container>
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
	height: 3rem;
	width: 100%;
`;

const Time = styled.time`
	position: absolute;
	top: 0;
	left: 0;
`;

export default Calendar;
