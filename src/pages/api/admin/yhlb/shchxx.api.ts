import { PageConfig } from 'next';
import createHandler from '../../../../atoms/server/handler';
import mmLogger from '../../../../atoms/server/logger';
import ctrls from '../../ctrls';
import { YhxxglShanchuParam, YhxxglShanchuResult } from '../../controllers/yhxxgl';

const logger = mmLogger('pages/api/admin/yhlb/shchxx.api');

export type Data = YhxxglShanchuResult;

export type Result = {
	ok: true;
	data: Data;
} | {
	ok: false;
	message: string;
};

export type Message = YhxxglShanchuParam;

/**
 * 删除信息
 */
const handler = createHandler<Result>();

handler.delete(async(req, res) => {
	try {
		logger.debug('msg body:', req.body);
		const msg = req.body as Message;
		const data = await ctrls.yhxxgl.shanchu(msg);
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
