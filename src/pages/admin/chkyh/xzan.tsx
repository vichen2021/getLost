import { useEffect, useState } from 'react';
import Ui from '../../../components/ui';
import Wptp from './wptp';
import apiAdminChkyhXzshw, { Message as M1, Result as R1 } from '../../api/admin/chkyh/xzshw';
/**
 * 新增按钮
 */
export default function Xzan({
	userid,
	onChange
}: {
	userid: string
	onChange(): void;
}) {
	const initData = { user_id: userid } as M1;
	const [data, setdata] = useState(initData);
	return <>

		<Ui.Button.Add
			dlgTitle='物品信息'
			onCancel={() => {
				setdata(initData);
			}}
			onOK={async () => {
				const { item_time, item_type } = data
				const now = Date.now();
				if (parseInt(item_time, 10) > now) {
					throw new Error('丢失时间大于当前时间！请重新填写');
				}
				setdata(
					{
						...data,
						user_id: userid
					})
				console.log(userid)
				console.log(data)
				await apiAdminChkyhXzshw(data);
				// setdata(initData);
				onChange();
			}}
		>
			<Ui.Form>
				<Ui.Form.Group
					title='基本信息'
				>
					<Ui.Form.Row>
						<Ui.Form.Column span={14} style={{ marginLeft: '-10px' }}>
							<Ui.Form.Item.Input
								required
								label='物品名称'
								labelSpan={7}
								value={data.item_name}
								onChange={(val) => {
									setdata({
										...data,
										item_name: val
									});

								}}
							/>
						</Ui.Form.Column>
					</Ui.Form.Row>
					<Ui.Form.Row>
						<Ui.Form.Column style={{ marginLeft: '-100px' }}>
							<Ui.Form.Item.Select
								style={{ width: '100px' }}
								required
								label='物品状态'
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
						<Ui.Form.Column style={{ marginLeft: '0px' }}>
							<Ui.Form.Item.DatePicker
								required
								label='丢失/拾取时间'
								style={{ width: '200px' }}
								labelSpan={4}
								showTime
								//format='YYYY-MM-DD hh:mm A'
								value={data?.item_time}
								onChange={(val) => {
									setdata({
										...data,
										item_time: val
									});
								}}
							/>
						</Ui.Form.Column>
					</Ui.Form.Row>

					<Ui.Form.Group title='物品描述'>
						<Ui.Form.Row>
							<Ui.Form.Column>
								<div>
									<Ui.Form.Item.TextArea
										// required
										// label='物品描述'
										// labelSpan={4}
										style={{ minHeight: 200, width: 500 }}
										value={data?.item_desc}
										onChange={(val) => {
											setdata({
												...data,
												item_desc: val
											});
										}}
									/>
								</div>
							</Ui.Form.Column>
						</Ui.Form.Row>
					</Ui.Form.Group>
				</Ui.Form.Group>
				<Ui.Form.Group title='图片'>
					<Ui.Form.Row>
						<Ui.Form.Column>
							<Wptp
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

		</Ui.Button.Add >
		<style jsx>{`

		`}</style>
	</>;
}
