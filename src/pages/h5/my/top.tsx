import pages from '../../../atoms/pages';
import res from '../../../atoms/res';
import Link from '../../../components/link';

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
				<Link href={pages['/h5/czmm']}><img src={res['/images/h5/settings.svg']} alt="" /></Link>
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
