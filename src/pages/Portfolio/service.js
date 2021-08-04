import { Service, api, storageHelper } from 'utils';

const $portfolio = new Service('portfolio', {
	loading: false,
	results: [],
	savedItems: storageHelper.getItem('PORTFOLIO_ITEMS') || [],
}, {
	setResults(results) {
		this.set({ results });
	},

	setLoading(loading) {
		this.set({ loading });
	},

	setSavedItems(savedItems) {
		this.set({ savedItems });
	},
});

$portfolio.addItem = (item) => {
	const newItems = [
		...$portfolio.state.savedItems,
		item,
	];

	storageHelper.setItem('PORTFOLIO_ITEMS', newItems);
	$portfolio.setSavedItems(newItems);
};

$portfolio.removeItem = (item) => {
	const newItems = $portfolio.state.savedItems.filter((i) => i !== item);

	storageHelper.setItem('PORTFOLIO_ITEMS', newItems);
	$portfolio.setSavedItems(newItems);
};

$portfolio.search = (keywords) => {
	$portfolio.setLoading(true);

	api.get(`/query?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=demo`)
		.then(({ bestMatches = [] }) => {
			// Wtf these results keys are wrong?
			// Eg. "1. symbol", '2. name', etc.
			const testWrongKey = /^\d+\. /;
			bestMatches.forEach((bm) => {
				Object.keys(bm).forEach((key) => {
					if (testWrongKey.test(key)) {
						bm[key.replace(testWrongKey, '')] = bm[key];
					}
				});
			});

			$portfolio.setResults(bestMatches);
			$portfolio.setLoading(false);
		});
};

export default $portfolio;
