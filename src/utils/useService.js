import { useEffect, useState } from 'react';

const useService = (service, events) => {
	const [, setState] = useState();

	useEffect(() => {
		const refresh = () => {
			setState({});
		};

		events.forEach((e) => {
			// console.log(e)
			service.on(e, refresh);
		});

		return () => {
			events.forEach((e) => {
				service.off(e, refresh);
			});
		};
	}, events);
};

export default useService;
