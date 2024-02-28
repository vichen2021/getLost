import api from '../../../../atoms/api';
import smartfetch from '../../../../atoms/smart-fetch';
import { Message, Result } from './syshwxx.api';

export type { Data as Result, Message } from './syshwxx.api';

/**
 * 所有失物信息
 */
export default async function apiH5HomeSyshwxx(msg: Message) {
	const ret = await smartfetch<Result, Message>(api['/api/h5/home/syshwxx'], 'post', msg);
	if(ret.ok === true){
		return ret.data;
	}
	throw new Error(ret.message);
}
