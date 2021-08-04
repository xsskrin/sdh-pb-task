const bind = function (context, names) {
	for (let i = 0, len = names.length; i < len; i += 1) {
		context[names[i]] = context[names[i]].bind(context);
	}
};

export default bind;
