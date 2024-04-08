import { createClient } from 'contentful';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Ask Lillian how to put cards in flex

const Bestseller = () => {
	const [data, setData] = useState([]);

	const client = createClient({
		space: import.meta.env.VITE_SPACE_ID,
		accessToken: import.meta.env.VITE_ACCESS_TOKEN,
	});

	const fetchData = () =>
		client
			.getEntries({ content_type: 'product' })
			.then((response) => {
				setData(response.items);
				// console.log(response.items);
			})
			.catch(console.error);

	useEffect(() => {
		fetchData();
	}, []);

	return data ? (
		<div className='flex flex-row space-x-4 overflow-x-auto m-2'>
			{data.map((eachData) => (
				<Link
					key={eachData.sys.id}
					className='card card-compact w-96 bg-base-100 shadow-xl'
					to={`/bestseller/${eachData.sys.id}`}
				>
					<div>
						<img
							className='h-30'
							src={eachData.fields.heroImage.fields.file.url}
							alt={eachData.fields.heroImage.fields.file.fileName}
						/>
						<div className='card-body'>
							<h2 className='card-title'>{eachData.fields.name}</h2>
							<h3>
								{eachData.fields.price} {''}EUR
							</h3>
						</div>
					</div>
				</Link>
			))}
		</div>
	) : (
		<p>Loading...</p>
	);
};



export default Bestseller;