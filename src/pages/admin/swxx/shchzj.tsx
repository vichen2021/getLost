import ui from '../../../atoms/ui';
import Ui from '../../../components/ui';
import apiAdminSwxxShchwp, { Message as M1, Result as R1 } from '../../api/admin/swxx/shchwp';

/**
 * 删除组件
 */
export default function Shchzj({ item_id, onChange }: M1 & { onChange(): void }) {
	return <>
		<Ui.feedback.Confirm
			title={
				<div>
					<div className='qrscgtsjm'>确认作废该条数据吗</div>
					<div className='schbkhf'>作废后需联系管理员恢复</div>
				</div>
			}
			onOk={async () => {
				await apiAdminSwxxShchwp({ item_id });
				ui.Message.success('作废成功');
				onChange();
			}}
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
