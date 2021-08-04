const clearUrl = () => {
	window.history.replaceState({}, document.title, window.location.pathname);
};

export default clearUrl;
