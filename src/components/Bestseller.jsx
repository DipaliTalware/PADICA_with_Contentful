import { createClient } from "contentful";
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Bestseller = () => {
  const [data, setData] = useState([]);

  const client = createClient({
    space: import.meta.env.VITE_SPACE_ID,
    accessToken: import.meta.env.VITE_ACCESS_TOKEN,
  });

  const fetchData = () =>
    client
      .getEntries({ content_type: "product" })
      .then((response) => {
        setData(response.items);
        console.log(response.items);
      })
      .catch(console.error);

  useEffect(() => {
    fetchData();
  }, []);
  

  return data ? (
		<div id='bestseller'>
			<h2 className='pt-14 text-3xl text-center'>Bestseller</h2>
			<div className='flex justify-center content-center pt-4 pb-14 '>
				<div className='grid grid-cols-1 sm:flex sm:flex-row space-x-2 overflow-x-auto m-2 min-[320px]:grid min-[320px]:grid-cols-1 min-[320px]:px-4 min-[320px]:mb-4'>
					{data.map((eachData) => (
						<Link
							key={eachData.sys.id}
							className='card card-compact w-96 bg-base-100 shadow-xl min-[320px]:mb-4'
							to={`/bestseller/${eachData.sys.id}`}
						>
							<div className='overflow-hidden'>
								<img
									className='h-30 shadow-lg transition-transform duration-300 transform hover:scale-110 hover:rotate ease-in-out'
									src={eachData.fields.heroImage.fields.file.url}
									alt={eachData.fields.heroImage.fields.file.fileName}
								/>
								<div className='card-body bg-slate-50'>
									<h2 className='card-title'>{eachData.fields.name}</h2>
									<h3>
										{eachData.fields.price} {''}EUR
									</h3>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	) : (
		<p>Loading...</p>
	);
};

export default Bestseller;
