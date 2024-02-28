import api from '../../../../atoms/api';
import smartfetch from '../../../../atoms/smart-fetch';
import { Message, Result } from './shchxx.api';

export type { Data as Result, Message } from './shchxx.api';

/**
 * 删除信息
 */
export default async function apiAdminYhlbShchxx(msg: Message) {
	const ret = await smartfetch<Result, Message>(api['/api/admin/yhlb/shchxx'], 'delete', msg);
	if(ret.ok === true){
		return ret.data;
	}
	throw new Error(ret.message);
}
