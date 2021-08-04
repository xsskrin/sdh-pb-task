/*
* This is just a temporary solution for staging to force https.
* For production you should setup the redirecting using your dns hosting service.
*/
import { __DEV } from 'envs';

if (!__DEV) {
	if (!/^https:\/\//.test(window.location.origin)) {
		window.location.href = window.location.href.replace(/^http:/, 'https:');
	}
}
