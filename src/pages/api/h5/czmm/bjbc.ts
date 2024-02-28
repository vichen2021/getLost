import api from '../../../../atoms/api';
import smartfetch from '../../../../atoms/smart-fetch';
import { Message, Result } from './bjbc.api';

export type { Data as Result, Message } from './bjbc.api';

/**
 * 编辑保存
 */
export default async function apiH5XzjmBjbc(msg: Message) {
	const ret = await smartfetch<Result, Message>(api['/api/h5/czmm/bjbc'], 'post', msg);
	if (ret.ok === true) {
		return ret.data;
	}
	throw new Error(ret.message);
}
