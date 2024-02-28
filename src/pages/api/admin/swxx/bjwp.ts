import api from '../../../../atoms/api';
import smartfetch from '../../../../atoms/smart-fetch';
import { Message, Result } from './bjwp.api';

export type { Data as Result, Message } from './bjwp.api';

/**
 * 编辑物品
 */
export default async function apiAdminSwxxBjwp(msg: Message) {
	const ret = await smartfetch<Result, Message>(api['/api/admin/swxx/bjwp'], 'post', msg);
	if(ret.ok === true){
		return ret.data;
	}
	throw new Error(ret.message);
}
