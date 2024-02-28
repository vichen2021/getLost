import { GetServerSideProps, NextPage, PageConfig } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import Ui from '../../../components/ui';

type IProps = {
};

/**
 * 发布信息
 */
const Page: NextPage<IProps> = () => {

	const [data, setdata] = useState({
		wpmch: '钥匙',
		lxdh: 18564567859,
		wpzht: '丢失/拾取',
		diushishqshj: new Date().getTime().toString(),
	});

	return (
		<>
			<Head>
				<title>发布信息</title>
			</Head>

			<Ui.Form>

				<Ui.Form.Row>
					<div className='srys'>
						<Ui.Form.Column span={20}>


							<Ui.Form.Item.Input

								label='物品名称'
								color='#3D3D3D'
								labelSpan={7}
								value={data.wpmch}
								onChange={(val) => {
									//todo
									setdata({
										...data,
										wpmch: val
									});
								}}
							/>

						</Ui.Form.Column>
						<Ui.Form.Column span={20}>
							<Ui.Form.Item.InputNumber
								label='联系电话'
								color='#3D3D3D'
								labelSpan={8}
								value={data.lxdh}
								onChange={(val) => {
									//todo
									setdata({
										...data,
										lxdh: val
									});
								}}
							/>
						</Ui.Form.Column>
					</div>
				</Ui.Form.Row>

				<Ui.Form.Row>
					<div className='srys'>
						<Ui.Form.Column span={20}>
							<Ui.Form.Item.Input

								label='物品状态'
								labelSpan={7}
								value={data.wpzht}
								onChange={(val) => {
									//todo
									setdata({
										...data,
										wpzht: val
									});
								}}
							/>
						</Ui.Form.Column>
					</div>
				</Ui.Form.Row>
				<Ui.Form.Row>
					<div className='srys'>
						<Ui.Form.Column span={20}>
							<Ui.Form.Item.DatePicker

								label='丢失/拾取时间'
								showTime
								labelSpan={9}
								value={data.diushishqshj}
								onChange={(val) => {
									//todo
									setdata({
										...data,
										diushishqshj: val
									});
								}}
							/>
						</Ui.Form.Column>
					</div>
				</Ui.Form.Row>
			</Ui.Form >
			<div className='wpms'>
				<Ui.Form.Group
					title='物品描述'
				>
					<Ui.Form.Row>
						<Ui.Form.Column>

							<div>
								<Ui.Form.Item.TextArea
									// required
									// label='物品描述'
									// labelSpan={4}
									style={{ minHeight: 300, width: 500 }}
								/>
							</div>
							<div>

								<a href="javascript:;" className="file">选择图片
									<input type="file" name="" id="" />
								</a>
							</div>



						</Ui.Form.Column>
					</Ui.Form.Row>
				</Ui.Form.Group>
			</div>
			<style jsx>{`
.srys{
display: flex;
float: left;
width: 600px;
margin-top: 40px;

}
.wpms{
margin-left: 40px;
}
.file {
    position: relative;
    display: inline-block;
    background: #D0EEFF;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: #1E88C7;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
	margin-left: 10px;
}
.file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
}
.file:hover {
    background: #AADFFD;
    border-color: #78C3F3;
    color: #004974;
    text-decoration: none;
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
