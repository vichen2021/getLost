import api from '../../../../atoms/api';
import smartfetch from '../../../../atoms/smart-fetch';
import { Message, Result } from './del.api';

export type { Data, Message, Result } from './del.api';

export default async function apiAdminGroupDel(msg: Message) {
	const ret = await smartfetch<Result, Message>(api['/api/admin/group/del'], 'delete', msg);
	if (ret.ok === true) {
		return ret.data;
	}
	throw new Error(ret.message);
}
