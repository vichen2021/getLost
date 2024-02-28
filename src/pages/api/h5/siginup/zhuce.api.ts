import { PageConfig } from 'next';
import createHandler from '../../../../atoms/server/handler';
import mmLogger from '../../../../atoms/server/logger';
import ctrls from '../../ctrls';
import { SysUserSignUpParam, SysUserSignUpResult } from '../../controllers/sys/user';

const logger = mmLogger('pages/api/h5/siginup/zhuce.api');

export type Data = SysUserSignUpResult;

export type Result = {
	ok: true;
	data: Data;
} | {
	ok: false;
	message: string;
};

export type Message = SysUserSignUpParam;

/**
 * 注册
 */
const handler = createHandler<Result>();

handler.post(async(req, res) => {
	try {
		logger.debug('msg body:', req.body);
		const msg = req.body as Message;
		const data = await ctrls.sysUser.signup(msg);
		res.status(200).json({
			ok: true,
			data
		});
	} catch (error) {
		logger.error(error);
		logger.trace(error);
		res.status(200).json({ ok: false, message: (error as Error).message });
	}
});

export const config: PageConfig = {};

export default handler;
