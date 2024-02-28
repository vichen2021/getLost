import { GetServerSideProps, NextPage, PageConfig } from 'next';
import Head from 'next/head';
import Ui from '../../../components/ui';
import res from '../../../atoms/res';
import Bjbc from './bjbc';
import Shchzj from './shchzj';
import Chakan from './chakan';
import dt2str from '../../../atoms/dt/dt2str';
import apiAdminSwxxLbchx, { Message as M1, Result as R1 } from '../../api/admin/swxx/lbchx';
import { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';

type IProps = {
	initQuery: M1;
};

/**
 * 失物信息列表
 */
const Page: NextPage<IProps> = ({ initQuery }) => {
	const [data, setdata] = useState({} as R1);
	const [query, setquery] = useState(initQuery);
	const [total, settotal] = useState(0);
	// 加载列表
	useEffect(() => {
		void (async () => {
			const data = await apiAdminSwxxLbchx(query);
			setdata(data);
			settotal(data.total);
		})();
	}, [query]);
	useEffect(() => {
		void (async () => {
			await Router.replace({
				query
			});
			console.log(query)
		})();
	}, [query]);
	return (
		<>
			<Head>
				<title>失物信息</title>
			</Head>
			<Ui.MainContainer
				title={'失物信息管理'}
				subTitle={"失物请在用户详情页添加"}
				icon={res['/xinzeng.png']}
				search={{
					placeholder: '请搜索',
					onSearch(value) {
						setquery({
							...query,
							keyword: value,
							page: '1'
						})
					}
				}}
			>
				<Ui.Table
					data={data.data}
					keyField={'item_id'}
					columns={[{
						title: '物品名称',
						dataIndex: 'item_name'
					}, {
						title: '物品状态',
						dataIndex: 'item_type',
						render(col, item, index) {
							if (col == 1) {
								return '寻物';
							} else {
								return '失物';
							}
						},
					}, {
						title: '丢失时间',
						dataIndex: 'item_time',
						render(col, item, index) {
							return dt2str(col, 'datetime');
						},
					}, {
						title: '是否已找回',
						dataIndex: 'is_matched',
						render(col, item, index) {
							if (col == 1) {
								return '是';
							} else {
								return '否';
							}
						}
					}, {
						title: '操作',
						dataIndex: 'caozuo',
						render(col, item, index) {
							if (!item.enable_mark) {
								return <span style={{ color: 'red' }} >已作废</span>
							}
							return <Ui.Table.ButtonGroup>
								<Bjbc initData={item}
									onChange={() => {
										setquery({
											...query
										});
									}} />
								<Chakan id={item.item_id} />
								<Shchzj item_id={item.item_id}
									onChange={() => {
										setquery({
											...query
										});
									}} />
							</Ui.Table.ButtonGroup>;
						}
					},
					]}
					pagination={{
						current: parseInt(query.page),
						total: data.total,
						pageSize: 8,
						onChange(pageNumber, pageSize) {
							setquery({
								...query,
								page: pageNumber.toString()
							});
						},
					}}
				/>
			</Ui.MainContainer >
			<style jsx>{`
			.ck{    
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
	const query = context.query as M1;
	return {
		props: {
			initQuery: {
				page: '1',
				keyword: '',
				...query
			}
		}
	};
};
