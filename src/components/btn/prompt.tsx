import { Message, Modal } from '@arco-design/web-react';
import { ReactNode, useState } from 'react';
import LabelInfo from '../label/info';

/**
 * 带提示按钮
 */
export default function ButtonPrompt({
	title,
	dlgTitle = '提示',
	children,
	disabled,
	onConfirm,
	onCancel
}: {
	/**
	 * 按钮标题
	 */
	title: ReactNode;
	/**
	 * 提示框标题,默认为`提示`
	 */
	dlgTitle?: ReactNode;
	/**
	 * 提示内容
	 */
	children: ReactNode;
	/**
	 * 确定事件
	 */
	onConfirm(): Promise<void> | void;
	onCancel?(): Promise<void> | void;
	disabled?: boolean;
}) {
	const [visible, setvisible] = useState(false);
	const [confirmLoading, setconfirmLoading] = useState(false);
	return <>
		<span className='btn' onClick={() => {
			if (disabled) {
				return;
			}
			setvisible(true);
		}}>{title}</span>
		<Modal
			title={<LabelInfo title={dlgTitle} />}
			style={{ top: 0 }}
			alignCenter={false}
			visible={visible}
			confirmLoading={confirmLoading}
			onCancel={() => {
				setvisible(false);
				onCancel && onCancel();
			}}
			onOk={async () => {
				setconfirmLoading(true);
				try {
					await onConfirm();
					setvisible(false);
				} catch (error) {
					Message.error({
						content: (error as Error).message,
						closable: true
					});
				}
				finally {
					setconfirmLoading(false);
				}
			}}
		>
			<div>
				{children}
			</div>
		</Modal>
		<style jsx>{`
.btn{
cursor: pointer;
font:normal 400 14px normal;
color:#3F6FF6;
}
.btn:hover{
}
`}</style>
	</>;
}
