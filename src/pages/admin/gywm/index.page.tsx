import { GetServerSideProps, NextPage, PageConfig } from 'next';
import Head from 'next/head';

type IProps = {
};

/**
 * 关于我们
 */
const Page: NextPage<IProps> = () => {
	return (
		<>
			<Head>
				<title>关于我们</title>
			</Head>
			<div className='body'>
				<p className='wenzi'>&emsp;&emsp;失物招领信息发布系统是一个旨在帮助人们更方便地发布和搜索失物招领信息的平台。
					该系统的背景始于人们对失物招领事务的需求。在过去，人们通常需要通过寻找物品
					的地点、打电话或者到当地的失物招领中心来找回自己的失物，这常常会带来很
					多不便和烦恼。
				</p><br />
				<p className='wenzi'>&emsp;&emsp;为了解决这个问题，我们决定开发一个失物招领信息发布系统，为用户提供一个更加便捷和
					高效的解决方案。</p><br />
				<p className='wenzi'>&emsp;&emsp;该系统于2023年开发，我们的团队由来自不同领域的专业人士组成，
					包括开发人员、测试人员、UI/UX 设计师等。我们在开发过程中，
					采用了最先进的技术和方法，为用户提供一个安全、稳定、易用和人性化的平台</p><br />
				<p className='wenzi'>&emsp;&emsp;我们致力于不断改进和优化该系统，以满足用户的不同需求和反馈。我们的目标是
					让更多的人能够在失物招领事务中获得帮助，并为社会提供更好的服务。如果您有任何
					建议或者意见，欢迎随时联系我们，我们将会尽快给您回复。</p>
			</div>
			<style jsx>{`
			.body{
/* 矩形 10 */


width: 100%;
height: 100%;
border-radius: 24px;
background: #FFFFFF;
}
.wenzi{

font-family: 思源黑体;
font-size: 23px;
font-weight: normal;
line-height: 50px;
margin-left: 10px;

color: #3D3D3D;
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
