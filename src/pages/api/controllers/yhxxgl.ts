import pagesize from '../../../atoms/pagesize';
import mmLogger from '../../../atoms/server/logger';
import md5 from '../../../atoms/server/md5';
import uuid from '../../../atoms/server/uuid';
import tbUser, { ITbUser } from '../../../db/01factory/table/tb_user';

const logger = mmLogger('pages/api/controllers/yhxxgl');
// 不知道加啥，先把用户名，密码，创建日期，启用标记，描述和是否管理员添加了

export type YhxxglXzbcParam = ITbUser;

export type YhxxglXzbcResult = {};


export type YhxxglBjbcParam = Pick<ITbUser, 'user_id' | 'username' | 'modify_time' | 'enable_mark' | 'is_admin' | 'descriptioin' | 'phone'>;
export type YhxxglBjbcResult = {};

export type YhxxglShanchuParam = Pick<ITbUser, 'user_id'>;
export type YhxxglShanchuResult = {};

export type YhxxglJinyongParam = Pick<ITbUser, 'user_id'>;
export type YhxxglJinyongResult = {};

export type YhxxglLbchxParam = {
	page: string;
	keyword: string;
};
export type YhxxglLbchxResult = {
	data: ITbUser[];
	total: number;
};

export type YhxxglZhzhmmParam = Pick<ITbUser, 'user_id'>;
export type YhxxglZhzhmmResult = {};

export type YhxxglH5bjbcParam = Pick<ITbUser, 'user_id' | 'username' | 'modify_time' | 'modify_user' | 'phone'>;
export type YhxxglH5bjbcResult = {};

/**
 * 用户信息管理
 */
const yhxxgl = {

	/**
	 * 列表查询
	 */
	async lbchx(param: YhxxglLbchxParam) {
		logger.debug(param);
		const { page, keyword } = param;
		const data = await tbUser().list(
			['username'],
			keyword,
			page,
			10,
			{},
			(qb) => {
				return qb.orderBy('enable_mark', 'desc').orderBy('create_time', 'desc');;
			}
		);
		return data as YhxxglLbchxResult;
	},




	/**
	 * 新增保存
	 */
	async xzbc(param: YhxxglXzbcParam) {
		logger.debug(param);
		// 先把用户名，密码，创建日期(服务器当前时间)，启用标记（默认为1启动），描述（可选）和是否管理员（默认为0否）添加判断,创建人不会获取
		// 用户id为自动生成
		const { username, descriptioin, phone } = param;
		if (!username) {
			throw new Error('用户名不得为空');
		}
		if (!phone) {
			throw new Error('手机号不得为空');
		}
		const password = '123456';
		const now = Date.now();
		// 用户id自动生成，创建时间为服务器当前时间
		const user_id = uuid();
		const create_time = now.toString();
		const modify_time = now.toString();
		// 标记为1，不是管理员
		const enable_mark = 1;
		const is_admin = 0;
		await tbUser().insert({
			user_id,
			username,
			password,
			create_time,
			modify_time,
			enable_mark,
			descriptioin,
			phone,
			is_admin
		});
		return {} as YhxxglXzbcResult;
	},

	/**
	 * 编辑保存
	 */
	async bjbc(param: YhxxglBjbcParam) {
		logger.debug('编辑保存', param);
		// 貌似只用修改'username' | 'password'|'enable_mark'|'descriptioin'|'is_admin'
		// 以及修改时间获取为现在最新时间,
		// 现在最新添加了手机号
		const { user_id, username, enable_mark, descriptioin, is_admin, phone } = param;
		if (!username) {
			throw new Error('用户名不得为空');
		}
		if (!phone) {
			throw new Error('手机号不得为空');
		}
		const modify_time = Date.now().toString();
		await tbUser().update({
			username,
			enable_mark: enable_mark == 0 ? 0 : 1,
			descriptioin,
			modify_time,
			is_admin,
			phone,
			user_id
		}, {
			user_id
		});
		return {} as YhxxglBjbcResult;
	},

	/**
		 * h5编辑保存
		 */
	async h5bjbc(param: YhxxglH5bjbcParam) {
		logger.debug("H5修改个人信息", param);
		//  Pick<ITbUser, 'user_id' | 'username' | 'password' | 'modify_time' | 'modify_user'>;
		// h5端的修改只会设计到用户名以及密码的修改
		// 但其中修改时间要修改成服务器当前时间，而修改人的话则是要成为修改后的用户名称
		const { user_id, username, phone } = param;
		// if (!username) {
		// 	throw new Error('用户名不得为空');
		// }
		// if (!password) {
		// 	throw new Error('密码不得为空');
		// }
		// if (!phone) {
		// 	throw new Error('手机号不得为空');
		// }
		const modify_time = Date.now().toString();
		const modify_user = username;
		await tbUser().update({
			username,
			modify_time,
			phone,
			modify_user
		}, {
			user_id
		});
		return {} as YhxxglH5bjbcResult;
	},



	/**
	 * 删除
	 */
	async shanchu(param: YhxxglShanchuParam) {
		logger.debug(param);
		const { user_id } = param;
		await tbUser().delete({
			user_id
		});
		return {} as YhxxglShanchuResult;
	},



	/**
	 * 禁用
	 */
	async jinyong(param: YhxxglJinyongParam) {
		logger.debug(param);
		const { user_id } = param;
		const enable_mark = 0;
		await tbUser().update({
			enable_mark
		}, {
			user_id
		});
		return {} as YhxxglJinyongResult;
	},
	/**
	 * 重置密码
	 */
	async chzhmm(param: YhxxglZhzhmmParam) {
		logger.debug(param);
		const { user_id } = param;
		await tbUser().update({
			password: md5('123456')
		}, {
			user_id
		});
		return {} as YhxxglZhzhmmResult;
	},
};
export default yhxxgl;
