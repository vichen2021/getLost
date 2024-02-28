import { v4 as uuidv4 } from 'uuid';
import res from '../../../atoms/res';
import Searchbar from './searchbar';


/**
 * 头部
 */
export default function Toubu() {
	// ...
	return <>
		<div className="box">
			<div className="navigation">
				<div className="left-content">
					<img src={res['/images/h5/logo3.svg']} alt="" />
				</div>
				<div className="right-content">
					{/* <Searchbar /> */}
				</div>
			</div>
		</div>
		<style jsx>{`
.navigation {
  display: flex;
  justify-content: space-between;
  height: 50px;
  overflow: hidden;
  width: 100%;
}
.left-content {
  /* 左侧内容的样式 */
margin-top: 10px;
margin-left: 4px;
}
.left-content img {
	width: 50px;
	height: 30px;
}

.right-content {
  /* 右侧内容的样式 */
margin-right: 4px;
}
.box{
position: absolute;
height:50px;
width: 100%;
background-color: #087592;
z-index: 10;
{/* margin-left: -10px;
margin-top: -12px; */}
}
	
		`}</style>

	</>;
}
