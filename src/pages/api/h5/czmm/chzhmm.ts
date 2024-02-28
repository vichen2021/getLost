import api from '../../../../atoms/api';
import smartfetch from '../../../../atoms/smart-fetch';
import { Message, Result } from './chzhmm.api';

export type { Data as Result, Message } from './chzhmm.api';

/**
 * Chzhmm
 */
export default async function apiH5CzmmChzhmm(msg: Message) {
	const ret = await smartfetch<Result, Message>(api['/api/h5/czmm/chzhmm'], 'post', msg);
	if(ret.ok === true){
		return ret.data;
	}
	throw new Error(ret.message);
}
