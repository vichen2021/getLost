import api from '../../../../atoms/api';
import smartfetch from '../../../../atoms/smart-fetch';
import { Message, Result } from './getuserbyid.api';

export type { Data as Result, Message } from './getuserbyid.api';

/**
 * getUserById
 */
export default async function apiH5MyGetuserbyid(msg: Message) {
	const ret = await smartfetch<Result, Message>(api['/api/h5/my/getuserbyid'], 'post', msg);
	if(ret.ok === true){
		return ret.data;
	}
	throw new Error(ret.message);
}
