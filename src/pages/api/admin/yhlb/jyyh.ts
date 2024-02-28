import api from '../../../../atoms/api';
import smartfetch from '../../../../atoms/smart-fetch';
import { Message, Result } from './jyyh.api';

export type { Data as Result, Message } from './jyyh.api';

/**
 * 禁用用户
 */
export default async function apiAdminYhlbJyyh(msg: Message) {
	const ret = await smartfetch<Result, Message>(api['/api/admin/yhlb/jyyh'], 'post', msg);
	if(ret.ok === true){
		return ret.data;
	}
	throw new Error(ret.message);
}
