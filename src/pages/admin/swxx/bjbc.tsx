import { useEffect, useState } from 'react';
import Ui from '../../../components/ui';
import apiAdminSwxxBjwp, { Message as M1, Result as R1 } from '../../api/admin/swxx/bjwp';
import { Loading } from '@arco-design/mobile-react';
import Wptpedit from './wptpedit';

/**
 * 编辑保存
 */
export default function Bjbc({
	initData,
	onChange
}: {
	initData: M1;
	onChange(): void;
}) {
	const [data, setdata] = useState(initData);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		void (async () => {
			setTimeout(() => {
				setLoading(false);
			});
		})();
	}, []);
	return <>
		{loading ? (
			<Loading />
		) : (<div>

			<Ui.Button.Edit
				dlgTitle='物品信息'
				onCancel={() => {
					setdata(initData);
				}}
				onOK={async () => {
					console.log(data)
					await apiAdminSwxxBjwp(data);
					onChange();
				}}
			>
				<Ui.Form>
					<Ui.Form.Group
						title='基本信息'
					>
						<Ui.Form.Row>
							<Ui.Form.Column span={14}>
								<Ui.Form.Item.Input
									required
									label='物品名称'
									labelSpan={7}
									value={data?.item_name}
									onChange={(val) => {
										//todo
										setdata({
											...data,
											item_name: val
										});
									}}
								/>
							</Ui.Form.Column>
						</Ui.Form.Row>
						<Ui.Form.Row>
							<Ui.Form.Column style={{ marginLeft: '-90px' }}>
								<Ui.Form.Item.Select
									style={{ width: '100px' }}
									required
									label='物品状态'
									value={data?.item_type == 0 ? "寻物" : "招领"}
									onChange={(val) => {
										setdata({
											...data,
											item_type: val == "寻物" ? 0 : 1
										});
									}}
								>
									<Ui.Form.Item.Select.Option value={'招领'} />
									<Ui.Form.Item.Select.Option value={'寻物'} />
								</Ui.Form.Item.Select>
							</Ui.Form.Column>
						</Ui.Form.Row>
						<Ui.Form.Row>
							<Ui.Form.Column style={{ marginLeft: '-90px' }}>
								<Ui.Form.Item.Select
									style={{ width: '100px' }}
									required
									label='是否找回'
									value={data?.is_matched == 0 ? "未找回" : "已找回"}
									onChange={(val) => {
										setdata({
											...data,
											is_matched: val == "未找回" ? 0 : 1
										});
									}}
								>
									<Ui.Form.Item.Select.Option value={'已找回'} />
									<Ui.Form.Item.Select.Option value={'未找回'} />
								</Ui.Form.Item.Select>
							</Ui.Form.Column>
						</Ui.Form.Row>
						<Ui.Form.Row>
							<Ui.Form.Column>
								<Ui.Form.Item.DatePicker
									required
									label='丢失/拾取时间'
									showTime
									labelSpan={4}
									value={data?.item_time}
									onChange={(val) => {
										//todo
										setdata({
											...data,
											item_time: val
										});
									}}
								/>
							</Ui.Form.Column>
						</Ui.Form.Row>
					</Ui.Form.Group>
					<Ui.Form.Group
						title='物品描述'
					>
						<Ui.Form.Row>
							<Ui.Form.Column>
								<div>
									<div>
										<Ui.Form.Item.TextArea
											required
											// label='物品描述'
											// labelSpan={4}
											style={{ minHeight: 300, width: 500 }}
											value={data?.item_desc}
											onChange={(val) => {
												//todo
												setdata({
													...data,
													item_desc: val
												});
											}}
										/>
									</div>
								</div>
							</Ui.Form.Column>
						</Ui.Form.Row>
					</Ui.Form.Group>
					<Ui.Form.Group title='图片'>
						<Ui.Form.Row>
							<Ui.Form.Column>
								<Wptpedit
									onChange={(fid) => {
										setdata({ ...data, image_url: fid });
									}}
									onDelete={() => {
										setdata({ ...data, image_url: null });
									}}
									item_url={data?.image_url}
								/>
							</Ui.Form.Column>
						</Ui.Form.Row>
					</Ui.Form.Group>
				</Ui.Form>
			</Ui.Button.Edit>
		</div>
		)}
		<style jsx>{`
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
	</>;
}
