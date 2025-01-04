import React, { useEffect, useState } from 'react';

function App() {
	const [elementsData, setElementsData] = useState([]);
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('/api/freeGamesPromotions');
				if (!response.ok) {
					throw new Error(`HTTP Error: ${response.status}`);
				}
				const data = await response.json();
				console.log('Full API Response:', data);

				// Ignore errors and focus on the actual data
				if (data.errors && data.errors.length > 0) {
					console.error('API Errors:', data.errors);
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
				console.error('Error fetching data:', error);
				setErrorMessage('Failed to fetch data. Please try again later.');
			}
		};

		fetchData();
	}, []);

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Free Games</h1>

			{/* Display error message if present */}
			{errorMessage && (
				<div className="text-red-500 border border-red-500 p-4 rounded mb-4">
					{errorMessage}
				</div>
			)}

			{/* Display games if data is available */}
			{elementsData.length > 0 ? (
				elementsData.map((game) => (
					<div key={game.id} className="border p-4 mb-4 rounded">
						<h2 className="text-xl font-semibold">{game.title}</h2>
						<p>{game.description}</p>
						<p>Effective Date: {new Date(game.effectiveDate).toLocaleDateString()}</p>
						{game.keyImages?.[0]?.url && (
							<img
								src={game.keyImages[0].url}
								alt={game.title}
								className="w-full h-auto mt-2 rounded"
							/>
						)}
					</div>
				))
			) : (
				!errorMessage && <p>No games available at the moment.</p>
			)}
		</div>
	);
}

export default App;
