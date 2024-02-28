import dataWrap from '../../../atoms/server/data-wrap';
import get01factoryDb from '../db';

const db = get01factoryDb();

/**
 * 用户表
 */
export type ITbUser = {
	/**
	 * 用户ID
	 */
	user_id: string;	// text
	/**
	 * 用户名
	 */
	username: string;	// text
	/**
	 * 密码
	 */
	password: string;	// text
	/**
	 * 手机号
	 */
	phone: string;	// text
	/**
	 * 上次登录时间
	 */
	last_time: string;	// bigint
	/**
	 * 创建时间
	 */
	create_time: string;	// bigint
	/**
	 * 创建人
	 */
	create_user: string;	// text
	/**
	 * 修改时间
	 */
	modify_time: string;	// bigint
	/**
	 * 修改用户
	 */
	modify_user: string;	// text
	/**
	 * 启用标记
	 */
	enable_mark: number;	// smallint
	/**
	 * 备注
	 */
	descriptioin: string;	// text
	/**
	 * 身份识别是否为管理员，0为非管理员，1是管理员
	 */
	is_admin: number;	// smallint
};

type IData = ITbUser;
const tableName = 'tb_user';

/**
 * 用户表
 */
export default function tbUser() {
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
