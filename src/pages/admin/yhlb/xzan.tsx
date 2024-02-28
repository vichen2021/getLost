import { useState } from 'react';
import Ui from '../../../components/ui';
import apiAdminYhlbXzyh, { Message as M1, Result as R1 } from '../../api/admin/yhlb/xzyh';

/**
 * 新增按钮
 */
export default function Xzan({
	onChange
}: {
	onChange(): void
}) {

	const initData = {} as M1;
	const [data, setdata] = useState(initData);
	return <>
		<Ui.Button.Add
			dlgTitle='人员信息-新增'
			onCancel={() => {
				setdata(initData);
			}}
			onOK={async () => {
				const username = data;
				if (!username) {
					throw new Error('用户名为必填项，请重新填写');
				}
				await apiAdminYhlbXzyh(data);
				setdata(initData);
				onChange();
			}}
		>
			<Ui.Form>
				<Ui.Form.Group
					title='人员基本信息'
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
				</Ui.Form.Group>
			</Ui.Form>

		</Ui.Button.Add >
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
