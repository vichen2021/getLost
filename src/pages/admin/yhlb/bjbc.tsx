import { useState } from 'react';
import Ui from '../../../components/ui';
import apiAdminYhlbBjbc, { Message as M1, Result as R1 } from '../../api/admin/yhlb/bjbc';

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
	return <>
		<Ui.Button.Edit
			dlgTitle='人物信息-编辑'
			onCancel={() => {
				setdata(initData);
			}}
			onOK={async () => {
				const { username, password } = data;
				if (!username) {
					throw new Error('用户名为必填项，请重新填写');
				}
				console.log(data);
				await apiAdminYhlbBjbc(data);
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
								label='用户名称'
								labelSpan={7}
								value={data.username}
								onChange={(val) => {
									setdata({
										...data,
										username: val
									});
								}}
							/>
						</Ui.Form.Column>
					</Ui.Form.Row>
					<Ui.Form.Row>
						<Ui.Form.Column span={14}>
							<Ui.Form.Item.Input
								required
								label='手机号'
								labelSpan={7}
								value={data.phone}
								onChange={(val) => {
									setdata({
										...data,
										phone: val
									});
								}}
							/>
						</Ui.Form.Column>
					</Ui.Form.Row>
					<Ui.Form.Row>
						<Ui.Form.Column span={11} style={{ marginLeft: '20px' }}>
							<Ui.Form.Item.Select
								required
								label='是否管理员'
								labelSpan={9}
								value={data?.is_admin == 1 ? '是' : '否'}
								onChange={(val) => {
									setdata({
										...data,
										is_admin: val == '是' ? 1 : 0
									});
								}}
							>
								<Ui.Form.Item.Select.Option value={'是'} />
								<Ui.Form.Item.Select.Option value={'否'} />
							</Ui.Form.Item.Select>
						</Ui.Form.Column>
					</Ui.Form.Row>
				</Ui.Form.Group>
				<Ui.Form.Group
					title='人物备注'
				>
					<Ui.Form.Row>
						<Ui.Form.Column>
							<div>
								<div>
									<Ui.Form.Item.TextArea
										style={{ minHeight: 300, width: 500 }}
										value={data.descriptioin}
										onChange={(val) => {
											setdata({
												...data,
												descriptioin: val
											});
										}}
									/>
								</div>
							</div>
						</Ui.Form.Column>
					</Ui.Form.Row>
				</Ui.Form.Group>
			</Ui.Form>
		</Ui.Button.Edit>
	</>;
}
