import api from '../../../../atoms/api';
import smartfetch from '../../../../atoms/smart-fetch';
import { Message, Result } from './xzshw.api';

export type { Data as Result, Message } from './xzshw.api';

/**
 * 新增失物
 */
export default async function apiAdminChkyhXzshw(msg: Message) {
	const ret = await smartfetch<Result, Message>(api['/api/admin/chkyh/xzshw'], 'post', msg);
	if(ret.ok === true){
		return ret.data;
	}
	throw new Error(ret.message);
}
