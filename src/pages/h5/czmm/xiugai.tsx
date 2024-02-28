import { useEffect, useState } from 'react';
import { Loading } from '@arco-design/mobile-react';
import router from 'next/router';
import pages from '../../../atoms/pages';
import Link from '../../../components/link';
import Ui from '../../../components/ui';
import apiAccountGetPageInfo, { Message as M2, Result as R2 } from '../../api/account/get-page-info';
import H5 from '../../../components/h5';
import ui from '../../../atoms/ui';
import apiH5CzmmChzhmm, { Message as M3, Result as R3 } from '../../api/h5/czmm/chzhmm';
import apiH5CzmmEdituser, { Message as M1, Result as R1 } from '../../api/h5/czmm/edituser';

/**
 * 修改
 */
export default function Xiugai({
	initData,
}: {
	initData: M1;
}) {
	const [data, setdata] = useState(initData);
	// const [curuser, setcuruser] = useState({} as R2);
	const [user, setuser] = useState(initData);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		void (async () => {
			// 获取当前登录用户信息
			const current = await apiAccountGetPageInfo({});
			// setcuruser(current);
			setuser(current.user);
			setTimeout(() => {
				setLoading(false);
			}); // 模拟100毫秒的loading状态
		})();
	}, [user]);
	return <>
		{loading ? (
			<Loading />
		) : (
			<div >
				<div className="v">
					<H5.Layout.Row>
						<H5.Layout.Column span={20} >
							<Ui.Form.Item.Input
								addBefore='昵称'
								placeholder={user.username}
								onChange={(val) => {
									setdata({
										...user,
										username: val
									});
									//console.log('11111111111');
								}}
							/>
						</H5.Layout.Column>
						<H5.Layout.Column span={20}>
							<Ui.Form.Item.Input
								addBefore='手机号'
								placeholder={user.phone}
								onChange={(val) => {
									setdata({
										...data,
										phone: val
									});
								}}
							/>
						</H5.Layout.Column>
					</H5.Layout.Row>
				</div>
				<Link href={pages['/h5/my']} style={{ color: 'black' }}><button className="canel">取消</button></Link>
				<button className="save"
					onClick={async () => {
						console.log(data);
						if (!data.username) {
							setdata({
								...data,
								username: user.username
							});
						}
						if (!data.phone) {
							setdata({
								...data,
								phone: user.phone
							});
						}
						console.log(data)
						await apiH5CzmmEdituser(data);
						await router.push(pages['/h5/sigin']);
					}}
				>
					确定
				</button>
				<button className="reset"
					onClick={async () => {
						await apiH5CzmmChzhmm(data);
						ui.Message.success('密码已经重置为123456');
						await router.push(pages['/h5/sigin']);
					}}
				>
					重置密码
				</button>
			</div>
		)}
		<style jsx>{`

input{
width:50%;
padding: 10px;
border: 1px solid #ccc;
borderRadius: 5px;
fontSize: 16px;
marginLeft: 90px;
background: #F2F3F5;
}
		.v{
padding: 21px;
margin-top: 20px;
}
.save{
position: absolute;
left: 240px;
top: 550px;
width: 70px;
height: 32px;
border-radius: 4px;
opacity: 1;
/* 自动布局 */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 5px 16px;
gap: 8px;
background: #087592;
color: #FFFF;
}
.reset{
position: absolute;
left: 320px;
top: 550px;
width: 90px;
height: 32px;
border-radius: 4px;
opacity: 1;
/* 自动布局 */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 5px 16px;
gap: 8px;
background: #087592;
color: #FFFF;
}
.canel{
/* 
按钮
*/
position: absolute;
left: 159px;
top: 550px;
width: 70px;
height: 32px;
border-radius: 4px;
opacity: 1;
/* 自动布局 */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 5px 16px;
gap: 8px;
background: #C9CDD4;
}
.ziti{
font-size: large;
}
		`}</style>

	</>;
}
