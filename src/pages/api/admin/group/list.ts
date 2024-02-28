import api from '../../../../atoms/api';
import smartfetch from '../../../../atoms/smart-fetch';
import { Message, Result } from './list.api';

export type { Data, Message, Result } from './list.api';

export default async function apiAdminGroupList(msg: Message) {
	const ret = await smartfetch<Result, Message>(api['/api/admin/group/list'], 'get', msg);
	if (ret.ok === true) {
		return ret.data;
	}
	throw new Error(ret.message);
}
