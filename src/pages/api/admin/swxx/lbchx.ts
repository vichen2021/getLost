import api from '../../../../atoms/api';
import smartfetch from '../../../../atoms/smart-fetch';
import { Message, Result } from './lbchx.api';

export type { Data as Result, Message } from './lbchx.api';

/**
 * 列表查询
 */
export default async function apiAdminSwxxLbchx(msg: Message) {
	const ret = await smartfetch<Result, Message>(api['/api/admin/swxx/lbchx'], 'get', msg);
	if(ret.ok === true){
		return ret.data;
	}
	throw new Error(ret.message);
}
