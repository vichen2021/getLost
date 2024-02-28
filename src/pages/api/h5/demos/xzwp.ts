import api from '../../../../atoms/api';
import smartfetch from '../../../../atoms/smart-fetch';
import { Message, Result } from './xzwp.api';

export type { Data as Result, Message } from './xzwp.api';

/**
 * 新增物品
 */
export default async function apiH5DemosXzwp(msg: Message) {
	const ret = await smartfetch<Result, Message>(api['/api/h5/demos/xzwp'], 'post', msg);
	if(ret.ok === true){
		return ret.data;
	}
	throw new Error(ret.message);
}
