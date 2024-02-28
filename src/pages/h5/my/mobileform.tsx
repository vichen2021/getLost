import pages from '../../../atoms/pages';
import res from '../../../atoms/res';
import Link from '../../../components/link';
import Ui from '../../../components/ui';

/**
 * mobileform
 */
export default function Mobileform() {
	return <>
		<div className="z">
			<div>
				<Link href={pages['/h5/sigin']}><button className='t'>退出</button></Link>
			</div>
		</div >
		<style jsx>{`
.t{
/* 
Button 2
按钮
*/
margin-left: 60px;
font-size: large;
width: 70%;
height: 50px;

/* 自动布局 */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 5px 16px;
gap: 8px; 
color: #FFFF;
background: #087592;
border-radius: 10px;
margin: auto;
}
.z{
margin-top: 60px;
}

`}</style>
	</>;
}
