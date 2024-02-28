import { GetServerSideProps, NextPage, PageConfig } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Ui from '../../../components/ui';
import res from '../../../atoms/res';
import Xzan from './xzan';
import Bjbc from './bjbc';
import Shchzj from './shchzj';
import goto from '../../../atoms/goto';
import apiAdminYhlbYhlb, { Message as M1, Result as R1 } from '../../api/admin/yhlb/yhlb';
import dt2str from '../../../atoms/dt/dt2str';
import pagesize from '../../../atoms/pagesize';
import ui from '../../../atoms/ui';
import pages from '../../../atoms/pages';
type IProps = {
	initQuery: M1;
};

/**
 * 用户列表
 */
const Page: NextPage<IProps> = ({ initQuery }) => {
	const [data, setdata] = useState({} as R1);
	const [query, setquery] = useState(initQuery);
	useEffect(() => {
		void (async () => {

			try {
				const data = await apiAdminYhlbYhlb(initQuery);
				setdata(data);
			} catch (error) {
				ui.Message.showError(error);
			}
		})();
	}, [query]);
	useEffect(() => {
		void (async () => {
			await goto({
				query
			});
		})();
	}, [query]);
	return (
		<>
			<Head>
				<title>用户列表</title>
			</Head>
			<Ui.MainContainer
				title={'用户信息列表信息管理'}
				subTitle={<Xzan onChange={() => {
					setquery({
						...query,
						page: '1'
					});
				}} />}
				icon={res['/xinzeng.png']}
				search={{
					placeholder: '请搜索',
					onSearch(value) {
						setquery({
							...query,
							keyword: value,
							page: '1'
						});
					},
				}}
			>
				<Ui.Table
					data={data.data}
					keyField='user_id'
					columns={[{
						title: '用户id',
						dataIndex: 'user_id'
					}, {
						title: '用户名',
						dataIndex: 'username'
					}, {
						title: '联系电话',
						dataIndex: 'phone'
					}, {
						title: '最近登录时间',
						dataIndex: 'last_time',
						render(col, item, index) {
							return dt2str(col, 'datetime');
						},
					}, {
						title: '状态',
						dataIndex: 'enable_mark',
						render(val, row) {
							if (row.enable_mark === 1) {
								return '启用';
							} if (row.enable_mark === 0) {
								return '禁用';
							}
							return '未知';
						}
					}, {
						title: '操作',
						dataIndex: 'caozuo',
						render(col, item, index) {
							if (item.enable_mark == 0) {
								return <span style={{ color: 'red' }}> 已作废</span>;

							} else {
								return <Ui.Table.ButtonGroup>
									<Bjbc
										initData={item}
										onChange={() => {
											setquery({
												...query
											});
										}}
									/>
									<Link href={pages['/admin/chkyh'] + `?userid=${item.user_id}`}
										className='ck' style={{ textDecoration: 'none', color: '#3F6FF6' }}
									>查看</Link>
									<Shchzj user_id={item.user_id}
										onChange={() => {
											setquery({
												...query
											});
										}}
									/>
								</Ui.Table.ButtonGroup>;
							}

						}
					},
					]}
					pagination={{
						current: parseInt(query.page),
						total: data.total,
						pageSize: pagesize(),
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
	const initQquery = context.query as M1;
	return {
		props: {
			initQuery: {
				page: '1',
				keyword: '',
				...initQquery
			}
		}
	};
};
