import React, { useState } from 'react';
import styled from 'styled-components';

const DownloadScheduleForm = ({ handleDownload }) => {
	const [selectedOption, setSelectedOption] = useState('2');

	const handleChange = (e) => {
		setSelectedOption(e.target.value);
	};

	return (
		<Container onSubmit={(e) => handleDownload(e, selectedOption)}>
			<p>Select a time range:</p>

			<div>
				<input
					type='radio'
					id='2'
					value='2'
					name='division'
					checked={selectedOption === '2'}
					onChange={handleChange}
				/>
				<label htmlFor='2'>2 days</label>
			</div>
			<div>
				<input
					type='radio'
					id='4'
					value='4'
					name='division'
					checked={selectedOption === '4'}
					onChange={handleChange}
				/>
				<label htmlFor='4'>4 days</label>
			</div>
			<div>
				<input
					type='radio'
					id='7'
					value='7'
					name='division'
					checked={selectedOption === '7'}
					onChange={handleChange}
				/>
				<label htmlFor='7'>7 days</label>
			</div>
			<div>
				<input
					type='radio'
					id='14'
					value='14'
					name='division'
					checked={selectedOption === '14'}
					onChange={handleChange}
				/>
				<label htmlFor='14'>14 days</label>
			</div>
			<div>
				<input
					type='radio'
					id='28'
					value='28'
					name='division'
					checked={selectedOption === '28'}
					onChange={handleChange}
				/>
				<label htmlFor='28'>28 days</label>
			</div>

			<DownloadButton>Download</DownloadButton>
		</Container>
	);
};

const Container = styled.form`
	text-align: left;
`;

const DownloadButton = styled.button`
	background: #0000ff;
	margin-top: 2rem;

	:hover {
		background: #003366;
	}
`;

export default DownloadScheduleForm;
