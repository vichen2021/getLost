import { GetServerSideProps, NextPage, PageConfig } from 'next';
import Head from 'next/head';
import Zhynr from './zhynr';

type IProps = {
};

/**
 * 主页
 */
const Page: NextPage<IProps> = () => {
	const data = new Array(3).fill(0);
	return (
		<>
			<Head>
				<title>主页</title>
			</Head>
			<div className='fudong'>

				{data.map((_row, index) => {
					const id = (() => {
						return (index + 1).toString().padStart(2, '0');
					})();
					return <Zhynr key={index} id={id} />;
				})}
			</div >
			<div className='fudong'>

				{data.map((_row, index) => {
					const id = (() => {
						return (index + 1).toString().padStart(2, '0');
					})();
					return <Zhynr key={index} id={id} />;
				})}
			</div >
			<div className='fudong'>

				{data.map((_row, index) => {
					const id = (() => {
						return (index + 1).toString().padStart(2, '0');
					})();
					return <Zhynr key={index} id={id} />;
				})}
			</div >

			<style jsx>{`
			.fudong{
display: flex;
float: left;
}
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
