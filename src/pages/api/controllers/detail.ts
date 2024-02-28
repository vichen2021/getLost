import mmLogger from '../../../atoms/server/logger';
import tbArticle, { ITbArticle } from '../../../db/01factory/table/tb_article';
import tbUser, { ITbUser } from '../../../db/01factory/table/tb_user';

const logger = mmLogger('pages/api/controllers/detail');

export type GetUserByIdParam = Pick<ITbUser, 'user_id'>;
export type GetUserByIdResult = ITbUser;

// 用户关联物品
export type GetArticleByUserIdParam = Pick<ITbUser, 'user_id'>;
export type GetArticleByUserIdResult = ITbArticle[];


// 物品详情
export type ArticleParam = Pick<ITbArticle, 'item_id'>;
export type ArticleResult = ITbArticle;







/**
 * 详情查询相关方法
 */
const detail = {
	/**
	* 通过用户Id获取用户信息
	*/
	async getUserById(param: GetUserByIdParam) {
		logger.debug("通过id查看用户信息", param);
		const userid = param.user_id;
		// 通过用户id获取用户信息
		const user = await tbUser().first({ user_id: userid }).where('enable_mark', 1)
		return user as GetUserByIdResult;
	},
	/**
	 * 用户关联物品详情
	 * @param 用户id
	 */
	async getArticleByUserId(param: GetArticleByUserIdParam) {
		logger.debug("查看用户关联物品", param);
		const userid = param.user_id;
		// 通过用户id获取用户所有物品信息
		const articles = await tbArticle().query({ user_id: userid, enable_mark: 1 })
		return articles as GetArticleByUserIdResult;
	},
	/**
	* 物品详情
	*/
	async getArticleById(param: ArticleParam) {
		logger.debug("查看物品详情", param);
		const id = param.item_id;
		// 通过id获取物品信息
		const article = await tbArticle().first({ item_id: id }).where('enable_mark', 1)
		return article as ArticleResult;
	},
};

export default detail;
