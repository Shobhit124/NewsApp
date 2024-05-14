//App.js
import './App.css';
import { useState } from 'react';
import React from 'react'
import {PushSpinner} from "react-spinners-kit";

function Spinner() {
	const [loading] = useState(true)
	return (
		<>


				<div className="spinner">
					<center><PushSpinner size={30} color="#BEBEBE"
                        loading={loading} /></center>
				</div>
		</>
	);
}

export default Spinner;
