import api from '../../../../atoms/api';
import smartfetch from '../../../../atoms/smart-fetch';
import { Message, Result } from './yhglwp.api';

export type { Data as Result, Message } from './yhglwp.api';

/**
 * 用户关联物品
 */
export default async function apiAdminChkyhYhglwp(msg: Message) {
	const ret = await smartfetch<Result, Message>(api['/api/admin/chkyh/yhglwp'], 'post', msg);
	if(ret.ok === true){
		return ret.data;
	}
	throw new Error(ret.message);
}
