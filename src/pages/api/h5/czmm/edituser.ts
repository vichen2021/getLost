import api from '../../../../atoms/api';
import smartfetch from '../../../../atoms/smart-fetch';
import { Message, Result } from './edituser.api';

export type { Data as Result, Message } from './edituser.api';

/**
 * EditUser
 */
export default async function apiH5CzmmEdituser(msg: Message) {
	const ret = await smartfetch<Result, Message>(api['/api/h5/czmm/edituser'], 'post', msg);
	if(ret.ok === true){
		return ret.data;
	}
	throw new Error(ret.message);
}
