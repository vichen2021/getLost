import { Key, useEffect, useState } from 'react';
import apiAccountGetPageInfo, { Message as M1, Result as R1 } from '../../api/account/get-page-info';
import apiAdminChkyhYhglwp, { Message as M2, Result as R2 } from '../../api/admin/chkyh/yhglwp';
import tbUser, { ITbUser } from '../../../db/01factory/table/tb_user';
import { Loading } from '@arco-design/mobile-react';
import Card from './card';
/**
 * 中间
 */
export default function Zhj({ current }: { current: ITbUser }) {
	// 加载用户物品信息
	const [data, setdata] = useState({} as R2);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		void (async () => {
			const data = await apiAdminChkyhYhglwp({ user_id: current.user_id });
			setdata(data);
			setTimeout(() => {
				setLoading(false);
			});
		})();
	}, []);
	return <>
		<div className="card">
			{loading ? (
				<Loading />
			) : (
				<div className="net">
					{data.map((row, index) => {
						return <Card key={index} article={row} />;
					})}
				</div>
			)}
		</div>

		<style jsx>{`
	.card{
	display: flex;
      justify-content: center;
      align-items: center;

}
.net{
width: 100%;

}

		`}</style>
	</>;
}
