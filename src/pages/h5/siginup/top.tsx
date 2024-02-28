
/**
 * top
 */
export default function Top({ name }: { name: string }) {
	return <>
		<div className='head'>
			<span>
				失物招领平台
			</span>
		</div>
		<style jsx>{`
.head{
display: flex;
flex-direction: column;
justify-content: center;
font-family: AlibabaPuHuiTiR;
font-weight: normal;
line-height: 16px;
text-align: center;
width: 100%;
margin-top: 50px;
font-size: 30px;
margin-bottom: 30px;
}
`}</style>
	</>;
}
