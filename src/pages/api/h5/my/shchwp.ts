import api from '../../../../atoms/api';
import smartfetch from '../../../../atoms/smart-fetch';
import { Message, Result } from './shchwp.api';

export type { Data as Result, Message } from './shchwp.api';

/**
 * 删除物品
 */
export default async function apiH5MyShchwp(msg: Message) {
	const ret = await smartfetch<Result, Message>(api['/api/h5/my/shchwp'], 'post', msg);
	if(ret.ok === true){
		return ret.data;
	}
	throw new Error(ret.message);
}
