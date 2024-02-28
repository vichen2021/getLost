import ui from '../../../atoms/ui';
import Ui from '../../../components/ui';
import apiAdminYhlbJyyh, { Message as M1, Result as R1 } from '../../api/admin/yhlb/jyyh';

/**
 * 删除组件
 */
export default function Shchzj({ user_id, onChange }: M1 & { onChange(): void }) {
	return <>
		<Ui.feedback.Confirm
			onOk={async () => {
				try {
					await apiAdminYhlbJyyh({ user_id });
					ui.Message.success('禁用成功');
					onChange();
				} catch (error) {
					ui.Message.showError(error);
				}

			}}
			title={
				<div>
					<div className='qrscgtsjm'>确认删除该条数据吗</div>
					<div className='schbkhf'>删除后不可恢复</div>
				</div>
			}
		>
			<Ui.Table.Button title='作废' />
		</Ui.feedback.Confirm>
		<style jsx>{`
		.qrscgtsjm{
/* 确认删除该条数据吗 */
font-family: Nunito Sans;
font-size: 16px;
font-weight: 600;
line-height: 24px;
text-align: left;
letter-spacing: 0px;
color: #1D2129;
}
.schbkhf{
/* 删除后不可恢复 */
font-family: Nunito Sans;
font-size: 14px;
font-weight: normal;
line-height: 22px;
text-align: justify; /* 浏览器可能不支持 */
letter-spacing: 0px;
color: #1D2129;
}
		`}</style>
	</>;
}
