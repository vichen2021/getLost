import api from '../../../../atoms/api';
import smartfetch from '../../../../atoms/smart-fetch';
import { Message, Result } from './zhuce.api';

export type { Data as Result, Message } from './zhuce.api';

/**
 * 注册
 */
export default async function apiH5SiginupZhuce(msg: Message) {
	const ret = await smartfetch<Result, Message>(api['/api/h5/siginup/zhuce'], 'post', msg);
	if(ret.ok === true){
		return ret.data;
	}
	throw new Error(ret.message);
}
