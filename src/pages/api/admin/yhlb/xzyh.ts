import api from '../../../../atoms/api';
import smartfetch from '../../../../atoms/smart-fetch';
import { Message, Result } from './xzyh.api';

export type { Data as Result, Message } from './xzyh.api';

/**
 * 新增用户
 */
export default async function apiAdminYhlbXzyh(msg: Message) {
	const ret = await smartfetch<Result, Message>(api['/api/admin/yhlb/xzyh'], 'get', msg);
	if(ret.ok === true){
		return ret.data;
	}
	throw new Error(ret.message);
}
