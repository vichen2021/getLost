import mmLogger from '../../../atoms/server/logger';
import uuid from '../../../atoms/server/uuid';
import tbArticle, { ITbArticle } from '../../../db/01factory/table/tb_article';
const logger = mmLogger('pages/api/controllers/wpxx');

// 列表查询
export type WpxxWplbchxParam = { page: string; keyword: string; };
export type WpxxWplbchxResult = { data: ITbArticle[]; total: number; };

// 新增失物
export type WpxxXzshwParam = Pick<ITbArticle, 'item_id' | 'item_type' | 'item_name' | 'item_desc' | 'item_time' | 'is_matched' | 'modify_time' | 'create_time' | 'enable_mark' | 'user_id' | 'image_url'>;
export type WpxxXzshwResult = {};

// 编辑失物
export type WpxxBjwpParam = Pick<ITbArticle, 'item_id' | 'item_type' | 'item_name' | 'item_desc' | 'item_time' | 'is_matched' | 'modify_user' | 'modify_time' | 'enable_mark' | 'user_id' | 'image_url'>;
export type WpxxBjwpResult = {};

// 删除物品
export type WpxxShchwpParam = Pick<ITbArticle, 'item_id'>;
export type WpxxShchwpResult = {};

// 获取所有物品
export type WpxxGetalliarticleParam = {};
export type WpxxGetalliarticleResult = ITbArticle[];
/**
 * 物品信息
 */
const wpxx = {

	/**
	 * 物品列表查询
	 */
	async wplbchx(param: WpxxWplbchxParam) {
		logger.debug("物品列表查询", param);
		const { page, keyword } = param;
		console.log(param)
		const data = await tbArticle().list(
			['item_name'],
			keyword,
			page,
			8,
			{},
			(qb) => {
				return qb.orderBy('enable_mark', 'desc').orderBy('create_time', 'desc');
			}
		);
		return data as WpxxWplbchxResult;
	},
	/**
	 * 新增失物
	 */
	async xzshw(param: WpxxXzshwParam) {
		logger.debug("新增失物", param);
		const { item_type, item_time, item_name, item_desc, image_url, user_id } = param;
		const dataNow = Date.now().toString();
		await tbArticle().insert({
			item_id: uuid(),
			item_type,
			item_name,
			item_desc,
			item_time: new Date(item_time).getTime().toString(),
			is_matched: 0,
			create_time: dataNow,
			modify_time: dataNow,
			enable_mark: 1,
			image_url,
			user_id
		});
		return {} as WpxxXzshwResult;
	},

	/**
	 * 编辑物品
	 */
	async bjwp(param: WpxxBjwpParam) {
		logger.debug("编辑物品", param);
		const { item_id, item_type, item_time, item_name, is_matched, item_desc, image_url, user_id } = param;
		const dataNow = Date.now().toString();
		let time = item_time;
		if (!isNaN(new Date(item_time).getTime())) {
			time = new Date(item_time).getTime().toString()
		}
		await tbArticle().update({
			item_type,
			item_name,
			item_desc,
			item_time: time,
			is_matched,
			modify_time: dataNow,
			image_url,
			user_id
		}, { item_id });
		return {} as WpxxBjwpResult;
	},
	/**
	 * 删除物品
	 */
	async shchwp(param: WpxxShchwpParam) {
		logger.debug("删除物品", param);
		const item_id = param.item_id;
		await tbArticle().update({
			enable_mark: 0,
			modify_time: Date.now().toString()
		}, { item_id });

		return {} as WpxxShchwpResult;
	},



	/**
	 * 获取所有物品
	 */
	async getAllIArticle(param: WpxxGetalliarticleParam) {
		logger.debug(param);
		const data = await tbArticle().query({ enable_mark: 1 }).orderBy('create_time', 'desc');
		return data as WpxxGetalliarticleResult;
	},
};

export default wpxx;
