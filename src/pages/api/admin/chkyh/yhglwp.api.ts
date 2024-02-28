import { PageConfig } from 'next';
import createHandler from '../../../../atoms/server/handler';
import mmLogger from '../../../../atoms/server/logger';
import ctrls from '../../ctrls';
import { GetArticleByUserIdParam, GetArticleByUserIdResult } from '../../controllers/detail';

const logger = mmLogger('pages/api/admin/chkyh/yhglwp.api');

export type Data = GetArticleByUserIdResult;

export type Result = {
	ok: true;
	data: Data;
} | {
	ok: false;
	message: string;
};

export type Message = GetArticleByUserIdParam;

/**
 * 用户关联物品
 */
const handler = createHandler<Result>();

handler.post(async(req, res) => {
	try {
		logger.debug('msg body:', req.body);
		const msg = req.body as Message;
		const data = await ctrls.detail.getArticleByUserId(msg);
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
