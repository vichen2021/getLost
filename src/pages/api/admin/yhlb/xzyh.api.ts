import { PageConfig } from 'next';
import createHandler from '../../../../atoms/server/handler';
import mmLogger from '../../../../atoms/server/logger';
import ctrls from '../../ctrls';
import { YhxxglXzbcParam, YhxxglXzbcResult } from '../../controllers/yhxxgl';

const logger = mmLogger('pages/api/admin/yhlb/xzyh.api');

export type Data = YhxxglXzbcResult;

export type Result = {
	ok: true;
	data: Data;
} | {
	ok: false;
	message: string;
};

export type Message = YhxxglXzbcParam;

/**
 * 新增用户
 */
const handler = createHandler<Result>();

handler.get(async (req, res) => {
	try {
		logger.debug('msg body:', req.query);
		const msg = req.query as Message;
		const data = await ctrls.yhxxgl.xzbc(msg);
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
