import dataWrap from '../../../atoms/server/data-wrap';
import get01factoryDb from '../db';

const db = get01factoryDb();

/**
 * 失物表
 */
export type ITbArticle = {
	/**
	 * 物品ID
	 */
	item_id: string;	// text
	/**
	 * 用户ID
	 */
	user_id: string;	// text
	/**
	 * 失物或寻物类型（0寻物，1招领）
	 */
	item_type: number;	// smallint
	/**
	 * 物品名称
	 */
	item_name: string;	// text
	/**
	 * 物品特征描述
	 */
	item_desc: string;	// text
	/**
	 * 丢失或拾取时间
	 */
	item_time: string;	// bigint
	/**
	 * 丢失或拾取地点
	 */
	item_place: string;	// text
	/**
	 * 是否匹配到（0：未匹配，1：已匹配）
	 */
	is_matched: number;	// smallint
	/**
	 * 修改人
	 */
	modify_user: string;	// text
	/**
	 * 创建人
	 */
	create_user: string;	// text
	/**
	 * 修改时间
	 */
	modify_time: string;	// bigint
	/**
	 * 启用标记
	 */
	enable_mark: number;	// smallint
	/**
	 * 创建时间
	 */
	create_time: string;	// bigint
	/**
	 * 图片地址
	 */
	image_url: string;	// text
};

type IData = ITbArticle;
const tableName = 'tb_article';

/**
 * 失物表
 */
export default function tbArticle() {
	return dataWrap<IData>(db, tableName);
	// return {
	// 	/**
	// 	 * sql查询 ！！！ 慎用
	// 	 */
	// 	raw<T = any>(sql: string, ...bindings: any[]) {
	// 		return db.raw(sql, ...bindings) as unknown as T;
	// 	},
	// 	...dataWrap<IData>(db, tableName)
	// };
}
