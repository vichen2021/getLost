import { useRouter } from 'next/router';
import { SetStateAction, useState } from 'react';
import pages from '../../../atoms/pages';
import ui from '../../../atoms/ui';
import Yzhm from './yzhm';
import Link from '../../../components/link';
import apiH5SiginupZhuce, { Message as M1, Result as R1 } from '../../api/h5/siginup/zhuce';
import H5 from '../../../components/h5';
import { Input } from '@arco-design/web-react';
type UserData = M1 & {
	password2: string;
}
/**
 * mid
 */
export default function Mid({
	redirect
}: {
	redirect: string;
}) {

	const router = useRouter();
	// 账号密码
	const [user, setuser] = useState({} as UserData);

	// 人机验证需要子组件向父组件传参
	const [value, setValue] = useState<number>(0);
	// 定义一个函数，用于接收子组件传递的值
	function handleChildValue(value: number) {
		setValue(value);
	}
	function validateUsername(username: string): boolean {
		const usernameRegex = /^[\u4e00-\u9fa5a-zA-Z0-9_-]{4,}$/;
		// 匹配中文、字母、数字、下划线、中划线，长度大于等于4
		const isNumber = /^\d+$/.test(username); // 是否为纯数字
		return usernameRegex.test(username) && !isNumber;
	}
	function validatePassword(password: string): boolean {
		const passwordRegex = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/;
		// 匹配字母和数字，长度大于等于6，不能为纯数字
		const isNumber = /^\d+$/.test(password); // 是否为纯数字
		return passwordRegex.test(password) && !isNumber;
	}
	return <>
		<H5.Layout.Row>
			<H5.Layout.Column>
				<H5.Input
					border="none"
					maxLength={20}
					placeholder='请输入用户名'
					onChange={(e, val) => {
						setuser({ ...user, username: val });
					}}
				/>
			</H5.Layout.Column>
			<H5.Layout.Column>
				<H5.Input.Password
					border="none"
					value={user.password}
					onChange={(e, val) => {
						setuser({ ...user, password: val, password2: '' });
					}}
				/>
			</H5.Layout.Column>
			<H5.Layout.Column>
				<H5.Input.Password
					border="none"
					placeholder='请再次输入密码'
					value={user.password2}
					onChange={(e, val) => {
						setuser({
							...user,
							password2: val
						});
					}}
					onBlur={() => {
						if (user.password && user.password2 && user.password !== user.password2) {
							ui.Message.error('两次输入的密码不一致');

						}
					}}
				/>
			</H5.Layout.Column>
			<H5.Layout.Column>
				<span className='yzm'>
					<Yzhm onValueChange={handleChildValue} />
				</span>
			</H5.Layout.Column>
		</H5.Layout.Row>
		<div className='no'>
			<Link href={pages['/h5/sigin']}>已有帐号,去登录</Link>
		</div>
		<input type='button' value='注    册' className='btn' onClick={async () => {
			console.log(user.username)
			//账号验证
			if (!validateUsername(user.username) && user.username != null) {
				ui.Message.error({
					content: '用户名必须为长度大于4位的中文或字母数字！',
				});
				return;
			}
			//密码验证
			if (!validatePassword(user.password)) {
				ui.Message.error({
					content: '密码必须为长度大于等于6位的字母和数字，不能为纯数字！',
					closable: true
				});
				return;
			}
			//密码验证
			if (user.password !== user.password2) {
				ui.Message.error('两次输入的密码不一致');
				return;
			}
			// 人机验证
			if (!value) {
				//console.log('人机验证结果：' + value)
				ui.Message.error('人机验证失败，请重试！');
				return;
			}
			//验证通过，调用注册服务
			try {
				const data = await apiH5SiginupZhuce(user);
				await router.push(redirect || pages['/h5/sigin']);
			} catch (error) {
				ui.Message.error({
					content: (error as Error).message,
					closable: true
				});
				//ui.Message.showError(error);
			}

		}} />
		<style jsx>{`
.forget{
/* 忘记密码？ */
font-family: AlibabaPuHuiTiR;
font-size: 12px;
font-weight: normal;
line-height: 16px;
color: #646466;
margin: 0.5rem 0.3rem;


}
.no{
display: flex;
float: right;
font-family: AlibabaPuHuiTiR;
font-size: 12px;
font-weight: normal;

color: #646466;
margin-bottom: ;
}
.btn{
height: 49px;
width: 100%;
cursor: pointer;
text-align: center;
background-color: #1C7B95;
color: #FFFFFF;
font:normal 400 24px/30px normal;
border-radius: 0.375rem;
border-style: none;
margin-top: 10px;
}
.denglu{
width: 100%;
display: flex;
flex-direction: row;
justify-content: flex-end;
font:normal 1rem normal;
}	
	.a{
display: flex;
float: left;
width: 200px;
}
.yzm{
display: flex;
float: right;
margin-top: 10px;
}
`}</style>
	</>;
}
