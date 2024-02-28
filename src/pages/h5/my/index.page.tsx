import { GetServerSideProps, NextPage, PageConfig } from 'next';
import Head from 'next/head';
import Top from './top';
import Neirong from './neirong';
import Zhj from './zhj';
import Mobileform from './mobileform';
import { Divider } from '@arco-design/web-react';
import apiAccountGetPageInfo, { Message as M1, Result as R1 } from '../../api/account/get-page-info';
import { useEffect, useState } from 'react';
import { Loading } from '@arco-design/mobile-react';
type IProps = {
};

/**
 * 我的
 */
const Page: NextPage<IProps> = () => {
	const [current, setcurrent] = useState({} as R1);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		void (async () => {
			// 获取当前登录用户信息
			const current = await apiAccountGetPageInfo({});
			setcurrent(current);
			setTimeout(() => {
				setLoading(false);
			});
		})();
	}, [current]);
	return (
		<>
			<Head>
				<title>我的</title>
			</Head>
			{loading ? (
				<Loading />
			) : (
				<div className="body">
					<Top />
					<Neirong current={current.user} />
					<Mobileform />

					<div style={{ width: '90%', height: '1px', background: 'rgba(28,123,149,0.5)', margin: '40px 5% 5%' }}>
						<Divider>个人物品</Divider>
					</div>
					<Zhj current={current.user} />
				</div>
			)}
			<style jsx>{`
`}</style>

		</>

	);
};

export const config: PageConfig = {
	amp: false
};

export default Page;

// pre-render this page on each request
// eslint-disable-next-line require-await, @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps<IProps> = async (context) => {
	const query = context.query as Record<string, string>;
	return {
		props: {}
	};
};
