import api from '../../../../atoms/api';
import smartfetch from '../../../../atoms/smart-fetch';

export type Result = {
	ok: true;
} | {
	ok: false;
	message: string;
};

export type Message = {
	/**
	* 文件id
	*/
	id: string;
}

export default async function deletefile(msg: Message) {
	const ret = await smartfetch<Result, void>(`${api['/api/file/delete/id']}/${msg.id}`, 'delete');
	if (ret.ok === true) {
		return true;
	}
	throw new Error(ret.message);
}
