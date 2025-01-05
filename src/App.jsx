import React, { useEffect, useState } from 'react';

function App() {
	const [elementsData, setElementsData] = useState([]);
	const [errorMessage, setErrorMessage] = useState('');
	
	const prcode = "https://store.epicgames.com/en-US/p/";

	// Function to format the title and generate the URL
	function createGameLink(game) {
	  // Trim spaces from title and replace with hyphens
	  const formattedTitle = game.title
		.toLowerCase()
		.split(" ")
		.join("-");
	
	  // Extract the unique identifier from offerMappings (first item in the array)
	  const gameId = game.offerMappings?.[0]?.pageSlug;
	
	  // Combine base URL with the pageSlug
	  if (gameId) {
		return `${prcode}${gameId}`;
	  }
	
	  // Return a fallback URL if pageSlug is not found
	  return "#";
	}
	

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('/api/freeGamesPromotions');
				if (!response.ok) {
					throw new Error(`HTTP Error: ${response.status}`);
				}
				const data = await response.json();
				// console.log('Full API Response:', data);

				// Ignore errors and focus on the actual data
				if (data.errors && data.errors.length > 0) {
					// console.error('API Errors:', data.errors);
					// Optionally set a warning or message if needed
					setErrorMessage('Some errors occurred, but proceeding with available data.');
				}

				// Safely extract `elements` from the response, even if errors exist
				const elements = data?.data?.Catalog?.searchStore?.elements || [];
				if (elements.length === 0) {
					setErrorMessage('No games available at the moment.');
				}
				setElementsData(elements);
			} catch (error) {
				// console.error('Error fetching data:', error);
				setErrorMessage('Failed to fetch data. Please try again later.');
			}
		};

		fetchData();
	}, []);

	return (
		<div className="container text-white  mx-auto p-4">
			<h1 className="text-4xl text-center font-alieronheavy  mb-2">Free Games</h1>
			<h1 className="text-lg text-center font-alieronlight text-[#6e6e73] mb-8">Developed by <span className='font-alieronsemi text-white ' >Gamers</span></h1>

			{/* Display error message if present */}
			{/* {errorMessage && (
				<div className="text-red-500 border border-red-500 p-4 rounded mb-4">
					{errorMessage}
				</div>
			)} */}

			{/* Display games if data is available */}
			<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 shadow-lg ' >
			{elementsData.length > 0 ? (
				elementsData.map((game) => (
					<div key={game.id} className="p-3 mb-4 rounded-xl bg-[#0F0F0F] flex flex-col justify-between space-y-3 ">
						<div>
							{game.keyImages?.[0]?.url && (
								<img
									src={game.keyImages[0].url}
									alt={game.title}
									className="w-full min-h-44 max-h-48 object-cover object-center h-auto  rounded"
								/>
							)}
							<h2 className="text-xl font-alieronbold mt-2">{game.title}</h2>
							<p className='text-sm font-alieronregular mt-2 text-[#cccccc] ' >{game.description}</p>
						</div>
						<div>
							<div className='flex space-x-1 items-center font-alieronheavy ' >
								<div className='text-sm text-[#6e6e73] line-through ' >{game.price.totalPrice.originalPrice}</div>
								<div className='text-xl' >{game.price.totalPrice.discountPrice  === 0 ? "Free" : game.price.totalPrice.discountPrice }</div>
							</div>
							<div className='flex flex-col lg:flex-row mt-2 justify-between items-center space-y-2 lg:space-y-0 ' >
								<a href={createGameLink(game)} className='bg-[#37AFE1] px-3 scale-100 w-full text-center lg:w-fit hover:scale-90 transition-all duration-300 text-black font-alieronregular py-0.5 text-sm rounded-full ' target="_blank" rel="noopener noreferrer">Open</a>
								<p className='text-sm font-alieronsemi  text-[#6e6e73] w-full text-center lg:w-fit ' >Effective Date: {new Date(game.effectiveDate).toLocaleDateString()}</p>
							</div>
						</div>
					</div>
				))
			) : (
				!errorMessage && <p>No games available at the moment.</p>
			)}
			</div>
		</div>
	);
}

export default App;
