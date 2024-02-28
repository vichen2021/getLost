import { PageConfig } from 'next';
import createHandler from '../../../../atoms/server/handler';
import mmLogger from '../../../../atoms/server/logger';
import ctrls from '../../ctrls';
import { YhxxglLbchxParam, YhxxglLbchxResult } from '../../controllers/yhxxgl';

const logger = mmLogger('pages/api/admin/yhlb/yhlb.api');

export type Data = YhxxglLbchxResult;

export type Result = {
	ok: true;
	data: Data;
} | {
	ok: false;
	message: string;
};

export type Message = YhxxglLbchxParam;

/**
 * 用户列表
 */
const handler = createHandler<Result>();

handler.get(async(req, res) => {
	try {
		logger.debug('msg body:', req.query);
		const msg = req.query as Message;
		const data = await ctrls.yhxxgl.lbchx(msg);
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
