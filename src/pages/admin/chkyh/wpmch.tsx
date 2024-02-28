import Tupian from './tupian';
//import { ITbArticle } from '../../../db/01factory/table/tb_article';
import { useEffect, useState } from 'react';
import apiAdminChkyhYhglwp, { Message as M1, Result as R1 } from '../../api/admin/chkyh/yhglwp';
/**
 * 物品名称
 */
export default function Wpmch({ userid }: { userid: string }) {
	// 加载用户信息与用户物品信息
	const [data, setdata] = useState({} as R1);
	const [len, setlen] = useState({} as number);
	useEffect(() => {
		void (async () => {
			console.log(userid);
			const data = await apiAdminChkyhYhglwp({ user_id: userid });
			setdata(data);
			setlen(data.length)
			console.log(data)
		})();
	}, []);

	const data2 = new Array(len).fill(0);
	return <>
		{data2.map((row, index) => {
			return <Tupian key={index} article={data[index]} />;
		})}
		<style jsx>{`
		
		`}</style>
	</>;
}

