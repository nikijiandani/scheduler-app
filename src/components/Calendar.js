import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { hours } from '../hours';

const Calendar = ({ days }) => {
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
