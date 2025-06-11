import React from 'react';
import './Loading.css';

export default function Loading() {
	return (
		<div className="loading-container">
			<h1>Loading...</h1>
			<div className="lds-ring"><div></div><div></div><div></div><div></div></div>
		</div>
	);
}