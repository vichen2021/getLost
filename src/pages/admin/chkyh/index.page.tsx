import { GetServerSideProps, NextPage, PageConfig } from 'next';
import Head from 'next/head';
import Xzan from './xzan';
import { useEffect, useState } from 'react';
import Ui from '../../../components/ui';
import Wpmch from './wpmch';
import apiH5MyGetuserbyid, { Message as M1, Result as R1 } from '../../api/h5/my/getuserbyid';
type IProps = {
	userid: string
};
/**
 * 查看用户
 */
const Page: NextPage<IProps> = ({ userid }) => {
	// 获取用户id
	const [user, setuser] = useState({} as R1);
	useEffect(() => {
		void (async () => {
			const user = await apiH5MyGetuserbyid({ user_id: userid.toString() });
			setuser(user);
		})();
	}, [userid]);
	return (
		<>
			<Head>
				<title>用户详情</title>
			</Head>
			<div className="beijing">
				<Ui.Layout.Space size={'large'}>
					<Ui.MainContainer
						title={`${user?.username ?? ''} - 物品信息`}
						subTitle={<Xzan userid={userid.toString()} onChange={() => {
						}} />}
					>
					</Ui.MainContainer>
				</Ui.Layout.Space>
				<div><Wpmch userid={userid.toString()} /></div>
			</div>
			<style jsx>{`
			
`}</style>
		</>
	);
};
export const getServerSideProps: GetServerSideProps<IProps> = async ({ query }) =>
({
	props:
	{
		userid: query.userid?.toString() || ''
	}
});
// export const getServerSideProps: GetServerSideProps<IProps> = async (context) => {
// 	const { query } = context;
// 	const { userid } = query;
// 	return { props: { userid: userid.toString() } };
// };
export const config: PageConfig = {
	amp: false
};

export default Page;


