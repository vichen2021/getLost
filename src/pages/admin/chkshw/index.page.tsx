import { GetServerSideProps, NextPage, PageConfig } from 'next';
import Head from 'next/head';
import Ui from '../../../components/ui';
import Wpmch from '../chkyh/wpmch';
import res from '../../../atoms/res';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Bjbc from '../swxx/bjbc';
import apiAdminChkshwWpxq, { Message as M1, Result as R1 } from '../../api/admin/chkshw/wpxq';
import getfile from '../../../atoms/getfile';

type IProps = {
};

/**
 * 查看失物
 */
const Page: NextPage<IProps> = () => {
	const router = useRouter();
	const { itemid } = router.query;
	const [data, setdata] = useState({} as R1);

	// 加载用户信息与用户物品信息
	useEffect(() => {
		void (async () => {
			const data = await apiAdminChkshwWpxq({ item_id: itemid.toString() });
			setdata(data);
		})();
	}, []);
	const src = (() => {
		if (data?.image_url != null) {
			return getfile(data.image_url);
		}
		return res['/yaoshi.jpg']
	})();
	return (
		<>
			<Head>
				<title>失物详情</title>
			</Head>
			<div className="beijing">
				<Ui.Layout.Space size={'large'}>
					<Ui.MainContainer
						title={'失物详情'}
					>
					</Ui.MainContainer>
				</Ui.Layout.Space>
				<div><div className="kapian">
					<div className="description">
						<Ui.Layout.Row style={{ margin: '20px 20px 20px 50px', height: '150px', width: '280px' }}>
							<Ui.Layout.Column>
								<label className='wenzi'>物品名称：</label>
								<span>{data.item_name}</span><br />
								<label className='wenzi'>物品类型：</label>
								<span >{data.item_type == 1 ? '招领' : '寻物'}</span><br />
								<label className='wenzi'>丢失/拾取时间：</label>
								<span >{data.item_time}</span><br />
								<label className='wenzi'></label>
								<span >{data.is_matched == 1 ? '已找回' : '未找回'}</span><br />
							</Ui.Layout.Column>
						</Ui.Layout.Row>
						<Ui.Layout.Row style={{ position: 'relative', bottom: '165px', left: '350px', width: '300px' }}>
							<Ui.Layout.Column>
								<label className='wenzi'>物品描述：</label>
								<div style={{ width: '300px', height: '145px' }}>
									{/* 5月20日下午在操场遗失一串钥匙，如有捡到者请联系我。电话：123456 */}
									<p>{data.item_desc}</p>
								</div>
							</Ui.Layout.Column>
						</Ui.Layout.Row>
						<Ui.Layout.Row style={{ position: 'relative', bottom: '370px', left: '650px' }}>
							<Ui.Layout.Column>
								<div className='img'>
									<img className='picture' title={`${600}*${400}`} src={src} />
									{/* <img src={res['/yaoshi.svg']} alt="" /> */}
								</div>
							</Ui.Layout.Column>
						</Ui.Layout.Row>
						<Ui.Layout.Row style={{ position: 'relative', bottom: '470px', left: '980px' }}>
							<Ui.Layout.Column>
								<div className='editbtn'>
									<Bjbc initData={data}
										onChange={() => {
											location.reload();
										}} />
								</div>
							</Ui.Layout.Column>
						</Ui.Layout.Row>
					</div>


				</div ></div>
			</div>
			<style jsx>{`
.editbtn{

border: 1px solid #1C7B95;
width: 50px;
border-radius: 10px;
background-color: rgba(28,123,149,0.1);
}
			.description{
width: auto;
height: 158px;
}
		.img{
padding: 6px 100px;
width: 213px;
height: 144px;

}
		.picture{
 	max-width: 100%;
        max-height: 100%;
        display: block;
        margin: auto;
}
.kapian{
/* 矩形 1 */

width: 1118px;
height: 158px;
border-radius: 24px;
margin-top: 20px;
border:1px solid #1C7B95;
background-color: rgba(28,123,149,0.06);
}
.wenzi{
color: #1C7B95;
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
