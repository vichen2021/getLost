import { PageConfig } from 'next';
import createHandler from '../../../../atoms/server/handler';
import mmLogger from '../../../../atoms/server/logger';
import ctrls from '../../ctrls';
import { WpxxGetalliarticleParam, WpxxGetalliarticleResult } from '../../controllers/wpxx';
const logger = mmLogger('pages/api/h5/home/syshwxx.api');
export type Data = WpxxGetalliarticleResult;

export type Result = {
	ok: true;
	data: Data;
} | {
	ok: false;
	message: string;
};

export type Message = WpxxGetalliarticleParam;

/**
 * 所有失物信息
 */
const handler = createHandler<Result>();

handler.post(async (req, res) => {
	try {
		logger.debug('msg body:', req.body);
		const msg = req.body as Message;
		const data = await ctrls.wpxx.getAllIArticle(msg);
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
