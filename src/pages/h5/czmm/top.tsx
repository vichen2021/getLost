import res from '../../../atoms/res';

/**
 * top
 */
export default function Top() {
	return <>
		<div className="container">
			<div className="left">
				<img src={res['/images/h5/logo3.svg']} alt="" />
			</div>
			<div className="right">
				<img src={res['/images/h5/settings.svg']} alt="" />
			</div>
		</div>
		<style jsx>{`
.container {
display: flex;
justify-content: space-between;
height: 132px;
width: 100%;
background-color: #087592;
  
}
.left{
margin-top: 18px;
margin-left: 4px;

}
.right{
margin-top: 40px;
margin-right: 18px;
}
`}</style>
	</>;
}
