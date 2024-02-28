import api from '../../../../atoms/api';
import smartfetch from '../../../../atoms/smart-fetch';
import { Message, Result } from './wpxq.api';

export type { Data as Result, Message } from './wpxq.api';

/**
 * 物品详情
 */
export default async function apiAdminChkshwWpxq(msg: Message) {
	const ret = await smartfetch<Result, Message>(api['/api/admin/chkshw/wpxq'], 'post', msg);
	if(ret.ok === true){
		return ret.data;
	}
	throw new Error(ret.message);
}
