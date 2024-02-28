import pages from '../../../../atoms/pages';
import pagesize from '../../../../atoms/pagesize';
import mmLogger from '../../../../atoms/server/logger';
import md5 from '../../../../atoms/server/md5';
import uuid from '../../../../atoms/server/uuid';
import { ITb01menu } from '../../../../db/01factory/table/tb01menu';
import tb01user, { ITb01user } from '../../../../db/01factory/table/tb01user';
import tb_user, { ITbUser } from '../../../../db/01factory/table/tb_user';
import RoleType from '../../../../db/01factory/type/role';
import viewUserRole, { IVUserRole } from '../../../../db/01factory/view/userrole';
import ctrls from '../../ctrls';
import { CallBackGetCookie, CallBackSetCookie } from './session/cookie';

const logger = mmLogger('pages/api/controllers/sys/user');

export type SysUserSigninParam = Pick<ITbUser, 'username' | 'password'> & {
	setCookie: CallBackSetCookie;
};
export type SysUserChangePasswordParam = {
	/**
	 * 原密码
	 */
	oldpsw: string;
	/**
	 * 新密码
	 */
	newpsw: string;
	getCookie: CallBackGetCookie;
};
export type SysUserModifyParam = Pick<ITb01user, 'ext' | 'phone' | 'sex' | 'userid' | 'username'>;
export type SysUserAddParam = Partial<Pick<ITb01user, 'username' | 'phone' | 'sex' | 'ext'>> & Pick<ITb01user, 'userid'>;
export type SysUserRedirectAfterLoginParam = {
	redirectUrl: string;
	getCookie: CallBackGetCookie;
	setCookie: CallBackSetCookie;
	redirect(url: string): void;
};
export type SysUserSignUpParam = SysUserCheckParam & Pick<ITbUser, 'username' | 'password'>;
export type SysUserSignUpResult = {};
export type SysUserCheckParam = Pick<ITbUser, 'username'>;
export type SysUserCheckResult = {};
export type SysUserGetRolesParam = {
	getCookie: CallBackGetCookie;
};
export type SysUserGetRolesResult = IVUserRole[];
export type SysUserListParam = {
	// 当前页面
	page: string;
	// 用户状态：启用1 ，停用0
	state: string;
	// 用户查询关键字
	keyword: string;
};
export type SysUserListResult = {
	total: number;
	data: ITb01user[];
};
export type SysUserGetByIDResult = ITb01user;

const sysUser = {
	/**
	 * 注册
	 */
	async signup(param: SysUserSignUpParam) {
		await this.check(param);
		const { username, password } = param;
		if (!password) {
			throw new Error('密码不能为空');
		}
		const dateString = Date.now().toString();
		const userid = uuid();
		await tb_user().insert({
			user_id: userid,
			username,
			password: md5(password),
			create_time: dateString,
			create_user: username,
			modify_user: username,
			modify_time: dateString,
			enable_mark: 1,
			is_admin: 0,
			descriptioin: null

		});
	},
	// 用户名查重
	async check(param: SysUserCheckParam) {
		const { username } = param;
		if (!username) {
			throw new Error('未知错误');
		}
		const user = await tb_user().first({
			username
		});
		if (user) {
			throw new Error('用户已存在');
		}
	},
	/**
	 * 登录
	 */
	async signin(body: SysUserSigninParam) {
		logger.debug('msg body:', body);
		const { username, setCookie, ...msg } = body;
		const user = await tb_user().first({
			username: username,
			password: md5(msg.password)
		});
		const dateString = Date.now().toString();
		await tb_user().update({ last_time: dateString }, { user_id: user.user_id })
		logger.debug('user', user);
		if (!user) {
			throw new Error('帐户名或密码错误');
		}
		const { password, ...data } = user;
		if (data.enable_mark != 1) {
			throw new Error('账户已作废,请联系管理员');
			// const msg = '账户已作废,请联系管理员';
			// res.statusMessage = encodeURIComponent(msg);
			// res.status(500).end(msg);
		}
		const vurs = await tb_user().query({
			username: data.username
		});
		if (vurs.length > 0) {
			const [vu] = vurs;
			ctrls.sysSession.setUser(vu, setCookie);
		} else {
			ctrls.sysSession.setUser({
				...data,
				password
			}, setCookie);
		}
	},
	/**
	 * 修改密码
	 */
	async changePassword({ getCookie, oldpsw, newpsw }: SysUserChangePasswordParam) {
		const user = await ctrls.sysSession.getUser(getCookie);
		const user2 = await ctrls.sysSession.getUser(null);
		logger.debug('修改密码时获取cookie1', user);
		logger.debug('修改密码时获取cookie2', user2);
		if (!oldpsw || !newpsw) {
			throw new Error('密码不能为空');
		}
		const tb = tb_user();
		const data = await tb
			.first({
				username: user.username,
				password: md5(oldpsw)
			});
		if (!data) {
			throw new Error('密码错误');
		}
		if (data.password === newpsw) {
			throw new Error('原密码和新密码一致，请重新输入');
		}
		await tb.update({ password: md5(newpsw) }, { username: user.username });
	},
	/**
	 * 重置密码
	 */
	async resetPassword(username: string) {
		if (!username) {
			throw new Error('useid is required!');
		}
		const tb = tb_user();
		const u = await tb.first({
			username
		});
		if (!u) {
			throw new Error('User not exist!');
		}
		await tb.update({
			password: md5('123456')
		}, {
			username
		});
	},
	async modify(param: SysUserModifyParam) {
		const { userid, username, ext, phone, sex } = param;
		if (userid) {
			await tb01user().update({
				username: username,
			}, { userid });
		}
	},
	// 启用
	async enable(user_id: string) {
		if (user_id) {
			await tb_user().update({
				enable_mark: 1
			}, { user_id });
		}
	},
	// 禁用
	async disable(user_id: string) {
		if (user_id) {
			await tb_user()
				.update({
					enable_mark: 0
				}, { user_id });
		}
	},
	listAll(keyword: string, page: number) {
		return tb01user()
			.list(['userid', 'username', 'phone'], keyword, page, pagesize(), {
				state: 1
			}, (qb) => {
				return qb.orderBy('userid', 'asc');
			});
	},
	list(param: SysUserListParam) {
		const { keyword, page, state } = param;
		return tb01user()
			.list(['userid', 'username', 'phone'], keyword, page, pagesize(), {}, (qb) => {
				return qb.orderBy('userid', 'asc');
			}, (qb) => {
				if (state) {
					void qb.where('state', parseInt(state));
				}
				return qb.whereNot('userid', 'admin');
			});
	},
	async add(user: SysUserAddParam) {
		// 通过first 判断用户名userid是否唯一
		const data = await tb_user()
			.first({ username: user.username });
		if (data) {
			logger.debug('error', data);
			throw new Error('用户名重复！');
		} else {
			await tb_user().insert({
				...user,
				password: md5('123456'),
				enable_mark: 1
			});
		}
	},
	async getRolesByUserID(user_id: string) {
		const data = await viewUserRole()
			.query()
			.orderBy('user_id', 'asc')
			.where({ user_id: user_id });
		const count = data.length;
		return { data, count };
	},
	all() {
		return tb01user()
			.query({
				state: 1
			});
	},
	async search(keyword: string) {
		const { data } = await tb01user()
			.list(['username'], keyword, 1, 0, {}, (qb) => {
				return qb.orderBy('userid', 'asc');
			});
		return data;
	},
	getByID(user_id: string) {
		return tb_user().first({ user_id });
	},
	async redirectAfterLogin({ getCookie, setCookie, redirect, redirectUrl = '' }: SysUserRedirectAfterLoginParam) {
		try {
			// 从Cookie中取到数据
			const u = await ctrls.sysSession.getUser(getCookie);
			logger.debug('从Cookie中取到用户信息', u);
			if (!u) {
				return redirect(pages['/account/signin']);
			}
			// 判断 只有一个角色,再次跳转回来，查找角色的menuid
			if (u.is_admin) {
				logger.debug('管理员登录权限验证', u);
				// 根据角色id 查找 角色菜单关联表，找到所有的菜单id
				const data = await ctrls.sysMenu.getByRoleID(RoleType.admin);

				logger.debug('管理员登录成功', u, redirectUrl);
				// 要跳转的页面是否有权限
				if (redirectUrl) {
					const url = redirectUrl.replace(/\?.*/, '');
					if (data.some((menu) => {
						logger.debug('222222222222', url, menu);
						return menu.url === url;
					})) {
						return redirect(redirectUrl);
					} else {
						return redirect(pages['/403']);
					}
				}
				logger.debug('333333', u);

				function getFirstMenu(menus: Pick<ITb01menu, 'menuid' | 'pid' | 'url'>[], pid: string | null): string | null {
					if (menus == null) {
						return null;
					}
					for (let i = 0; i < menus.length; ++i) {
						const menu = menus[i];
						if (menu.pid === pid) {
							if (menu.url) {
								return menu.url;
							}
							const url = getFirstMenu(menus, menu.menuid);
							if (url) {
								return url;
							}
						}
					}
					return null;
				}

				const url = getFirstMenu(data, null);
				// const url = oneTest(menus, null, null);
				// const url = twoTest(menus);
				logger.debug('3333333333', data, url);
				if (url) {
					return redirect(url);
				}
				return redirect(pages['/admin/sys/nomenu']);
			}

			// 调服务查询 该用户拥有多少角色
			const data = await ctrls.sysUser.getRolesByUserID(u.user_id);
			logger.debug('222222222', data);
			// 逻辑判断
			const destination = (() => {
				if (data.count == 0) {
					return pages['/account/norolepage'];
				}
				if (data.count > 1) {
					return `${pages['/account/rolechoose']}?redirect=${redirectUrl}`;
				}
				const [role] = data.data;
				logger.debug('sssssssssssssssss', u);
				// 只有一个角色,再次跳转回来，查找角色的menuid
				ctrls.sysSession.setUser({
					...u
				}, setCookie);
				return `${pages['/account/pagejump']}?redirect=${redirectUrl}`;
			})();
			return redirect(destination);
		} catch (error) {
			logger.error(error);
			return redirect(pages['/500']);
		}
	},
	async getRoles({ getCookie }: SysUserGetRolesParam) {
		// 从Cookie中获取 user.userid
		const u = await ctrls.sysSession.getUser(getCookie);
		logger.debug('user::::::::::::', u);
		// 获取所有用户的角色
		const data = await ctrls.sysUser.getRolesByUserID(u.user_id);
		return data.data as SysUserGetRolesResult;
	}
};

export default sysUser;
