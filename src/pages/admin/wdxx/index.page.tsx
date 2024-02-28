import { GetServerSideProps, NextPage, PageConfig } from 'next';
import Head from 'next/head';
import Img from '../sys/systemstting/img';
import res from '../../../atoms/res';

type IProps = {
};

/**
 * 我的信息
 */
const Page: NextPage<IProps> = () => {
	return (
		<>
			<Head>
				<title>我的信息</title>
			</Head>

			<div className='body'>
				<div className='left'>
					<div className='img'>
						<img src={res['/touxiang.jpg']} alt="" />

					</div>

					<div className='leftwenben'>
						<form action='' >
							<span className='wenben'>账号：<input className='srk' type='text' name='账号' /></span>
							<span className='wenben'>密码：<input className='srk' type='password' name='密码' /></span>
							<span className='wenben'>性别：<input className='srk' type='text' name='性别' /></span>
							<span className='wenben'>邮箱：<input className='srk' type='email' name='邮箱' /></span>
							<span className='wenben'>手机号：<input className='srk' type='number' name='手机号' /></span>

						</form>
					</div>
				</div>
				<div className='right'>
					<title>个人介绍</title>、


				</div>

			</div>

			<style jsx>{`
			.body{
width: 100%;
height: 100%;
border-radius: 40px;
background: #FFFFFF;
box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
}
.img{
/* 
Avatar
头像
*/
width: 275px;
height: 269px;
border-radius: 4px;
opacity: 1;
	
/* 自动布局 */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 32px;
margin: 50px 100px;
	
}
.left{
width: 50%;
}
.right{
width: 50%;
}
.leftwenben{
margin-top: -20px;
}
.wenben{
/* 
input 3
输入框
*/


width: 600px;
height: 32px;
border-radius: 2px;
opacity: 1;
/* 自动布局 */
display: flex;
margin-left: 100px;
margin-top: 20px;
}
.srk{
	background: #F2F3F5;
width: 250px;
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
