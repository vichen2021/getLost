import { GetServerSideProps, NextPage, PageConfig } from 'next';
import Head from 'next/head';
import Top from './top';
import Xiugai from './xiugai';
import apiH5XzjmXggrxx, { Message as M1, Result as R1 } from '../../api/h5/xzjm/xggrxx';

type IProps = {
};

/**
 * 修改信息
 */
const Page: NextPage<IProps> = () => {
	return (
		<>
			<Head>
				<title>修改信息</title>
			</Head>
			<Top />
			<Xiugai initData={{} as M1} />
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
