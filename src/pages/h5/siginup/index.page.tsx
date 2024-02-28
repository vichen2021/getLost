import { GetServerSideProps, NextPage, PageConfig } from 'next';
import Head from 'next/head';
import Top from './top';
import Mid from './mid';
import End from './end';
import H5 from '../../../components/h5';
import ctrls from '../../api/ctrls';
import { redirect } from 'next/dist/server/api-utils';

type IProps = {
	name: string;
	redirect: string;
};

/**
 * siginup
 */
const Page: NextPage<IProps> = ({ name, redirect }) => {
	const paddingV = '1rem';
	return (
		<>
			<Head>
				<title>siginup</title>
			</Head>
			<span>注册</span>
			<div className='page'>
				<H5.Layout.Row>
					<H5.Layout.Column>
						<Top name={name} />
						<Mid redirect={redirect} />
					</H5.Layout.Column>
				</H5.Layout.Row>
				<H5.Layout.Row>
					<End />
				</H5.Layout.Row>
			</div>
			<style jsx>{`
.page{
height: calc(100% - 2 * ${paddingV});
padding: ${paddingV} 0.5rem;
display: flex;
flex-direction: column;
justify-content: space-between;
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
	const { redirect = '' } = query;
	const name = await ctrls.sysConfig.getSysName();
	return {
		props: {
			name,
			redirect
		}
	};
};
