import SliderCaptcha from 'rc-slider-captcha';
import React from 'react';
import { getCaptcha, verifyCaptcha, getResult } from '../../api/yzmservice';

interface Props {
	// 定义一个函数类型的属性，用于接收父组件传递的函数
	onValueChange: (value: number) => void;
}

function yzhm(props: Props) {
	return (
		<>
			<SliderCaptcha
				mode="float"
				request={getCaptcha}
				onVerify={async (data) => {
					return verifyCaptcha(data).then(async () => {
						const result = parseInt((await getResult()).toString())
						//console.log('人机验证结果：' + result)
						props.onValueChange(result);
					});;
				}}
			/>
		</>
	);
}

export default yzhm;