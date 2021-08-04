import storageHelper from './storageHelper';

const languages = ['PL', 'EN'];

const getLanguage = () => {
	const language = (storageHelper.getItem('bp:lang') || '').toUpperCase();
	if (languages.indexOf(language) > -1) {
		return language;
	}
	return 'PL';
};

export default getLanguage;
