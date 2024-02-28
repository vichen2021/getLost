import { Descriptions } from '@arco-design/web-react';
//import apiH5MyGetuserbyid, { Message as M1, Result as R1 } from '../../api/h5/my/getuserbyid';
import apiAccountGetPageInfo, { Message as M1, Result as R1 } from '../../api/account/get-page-info';
import { useEffect, useState } from 'react';
import { Loading } from '@arco-design/mobile-react';
import { ITbUser } from '../../../db/01factory/table/tb_user';
import { unixTimeToString3 } from '../../api/timeUtil';
/**
 * 内容
 */
export default function Neirong({ current }: { current: ITbUser }) {

	const [loading, setLoading] = useState(true);
	useEffect(() => {
		void (async () => {
			// 获取当前登录用户信息
			const current = await apiAccountGetPageInfo({});
			setTimeout(() => {
				setLoading(false);
			}); // 模拟100毫秒的loading状态
		})();
	}, []);
	const data = [
		{
			label: '注册时间',
			value: `${unixTimeToString3(parseInt(current?.create_time, 10))}`,
		},
		{
			label: '最近登录时间：',
			value: `${unixTimeToString3(parseInt(current?.last_time, 10))}`,
		},
		{
			label: '联系电话',
			value: `${current?.phone ?? '未填写'}`,
		},
		{
			label: '用户ID',
			value: `${current?.user_id}`,
		},
	];
	return <>
		{loading ? (
			<Loading />
		) : (
			<div className="mid">
				<div className="username">
					<span>{`${current.username}`}</span>
					{/* <img src={res['/images/h5/Avatar 1.png']} alt="" /> */}
				</div>
				<div className='userlist'>
					<Descriptions
						column={1}
						data={data}
						style={{ marginBottom: 20 }}
						labelStyle={{ paddingRight: 36 }}
					/>
				</div>
			</div >
		)}
		<style jsx>{`
.username{
	font-size: 30px;
	position: relative;
	left: 22px;
	align-items: center;
	margin-top: 30px;
	height: 80px;
	position: 'relative'
}
.userlist{
position: relative;
	left: 22px;
}	

		`}</style>
	</>;
}
