import Card from './card';
import tbArticle, { ITbArticle } from '../../../db/01factory/table/tb_article';
import { useEffect, useState } from 'react';
import apiH5HomeSyshwxx, { Message as M1, Result as R1 } from '../../api/h5/home/syshwxx';
import { Loading } from '@arco-design/mobile-react';
/**
 * 中间
 */
export default function Zhj() {
	const [data, setdata] = useState({} as R1);
	// const [len, setlen] = useState({} as number);
	const [loading, setLoading] = useState(true);
	// 加载列表
	useEffect(() => {
		void (async () => {
			const data = await apiH5HomeSyshwxx({});
			setdata(data);
			console.log(data)
			setTimeout(() => {
				setLoading(false);
			}); // 模拟loading状态
		})();
	}, []);

	// const data2 = new Array(len).fill(0);
	return <>
		{loading ? (
			<Loading />
		) : (
			<div className="body">
				{
					data.map((row, index) => {
						return <Card key={index} article={row} />;
					})
				}
			</div>
		)}
		<style jsx>{`
		`}</style>
	</>;
}
