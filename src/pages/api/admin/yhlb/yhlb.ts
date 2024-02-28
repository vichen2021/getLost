import api from '../../../../atoms/api';
import smartfetch from '../../../../atoms/smart-fetch';
import { Message, Result } from './yhlb.api';

export type { Data as Result, Message } from './yhlb.api';

/**
 * 用户列表
 */
export default async function apiAdminYhlbYhlb(msg: Message) {
	const ret = await smartfetch<Result, Message>(api['/api/admin/yhlb/yhlb'], 'get', msg);
	if(ret.ok === true){
		return ret.data;
	}
	throw new Error(ret.message);
}
