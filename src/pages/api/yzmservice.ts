import res from "../../atoms/res";

let result = 0;
export const getCaptcha = async () => {
	return {
		bgUrl: res['/images/captcha/captcha1.jpg'],
		puzzleUrl: res['/images/captcha/captcha2.png'],
	};
};

export const verifyCaptcha = async (data: { x: number }) => {
	if (data.x && data.x > 87 && data.x < 93) {
		result = 1;
		return Promise.resolve();
	}
	return Promise.reject();
};
export const getResult = async () => {
	if (result == 1) {
		return 1;
	}
	return 0;
};
export type ActionType = {
	refresh: (resetErrorCount?: boolean) => void; // 刷新，参数为是否重置连续错误次数为0
	status: Status; // 每次获取返回当前的状态，注意它不是引用值，而是一个静态值。部分场景下配合自定义刷新操作使用。
};

export enum Status {
	Default = 1, // 默认
	Loading, // 加载中
	Verify, // 验证中
	Success, // 验证成功
	Error // 验证失败
}