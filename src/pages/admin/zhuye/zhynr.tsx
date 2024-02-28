
/**
 * 主页内容
 */
export default function Zhynr({ id }: { id: string }) {
	return <>
		<div className='fk'>
			<span className='ziti'>物品名称：钥匙</span>
			<span className='ziti'>物品状态：丢失</span>
			<span className='ziti'>丢失时间：2023.5.14</span>
		</div >
		<style jsx>{`
.fk{
/* Frame 34 */
left: 282px;
top: 130px;
width: 318px;
height: 237px;
border-radius: 14px;
padding: 15px 27px;
margin-left: 30px;	
margin-top: 20px;
/* 自动布局 */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 15px 27px;
gap: 10px;
	
/* tertiary/secondary 1 */
background: #E1DFA4;
	
}
.ziti{
	/* 物品名称:钥匙物品状态：丢失丢失时间：2023.5.14 */

left: 329px;
top: 197px;
width: 250px;
height: 110px;
font-family: MicrosoftYaHeiLight;
font-size: 24px;
font-weight: normal;
line-height: 22px;
margin-top: 20px;
	
color: #3D3D3D;
	
}
`}</style>
	</>;
}
