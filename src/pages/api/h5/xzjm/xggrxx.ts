import api from '../../../../atoms/api';
import smartfetch from '../../../../atoms/smart-fetch';
import { Message, Result } from './xggrxx.api';

export type { Data as Result, Message } from './xggrxx.api';

/**
 * 修改个人信息
 */
export default async function apiH5XzjmXggrxx(msg: Message) {
	const ret = await smartfetch<Result, Message>(api['/api/h5/xzjm/xggrxx'], 'post', msg);
	if(ret.ok === true){
		return ret.data;
	}
	throw new Error(ret.message);
}
