import { DatePicker, Input, Space } from '@arco-design/web-react';
import { SetStateAction, useEffect, useState } from 'react';
import H5 from '../../../components/h5';
import Ui from '../../../components/ui';
import Form from '../../../components/form/form';
import apiAccountGetPageInfo, { Message as M2, Result as R2 } from '../../api/account/get-page-info';
import apiH5DemosXzwp, { Message as M1, Result as R1 } from '../../api/h5/demos/xzwp';
import Img from '../../admin/sys/systemstting/img';
import { Loading } from '@arco-design/mobile-react';
import Wptp from '../../admin/chkyh/wptp';

const TextArea = Input.TextArea;
/**
 * mid
 */
export default function Mid({
	initData,
}: {
	initData: M1;
}) {
	const [curuser, setcuruser] = useState({
		user: {}
	} as R2);
	initData.user_id = curuser.user.user_id;
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		void (async () => {
			const curuser = await apiAccountGetPageInfo({});
			setcuruser(curuser);
			setTimeout(() => {
				setLoading(false);
			}, (100));
		})();
	}, []);
	function setfiles(files: any) {
		throw new Error('Function not implemented.');
	}
	const [files, setFiles] = useState([]);
	const handleImageChange = (images: SetStateAction<any[]>) => {
		console.log('ooooooooooooooooooooo', images);
		setFiles(images);
	};
	const [data, setdata] = useState(initData);
	return <>
		{loading ? (
			<Loading />
		) : (
			<div className="body">
				<Ui.Form>
					<div className="name">
						<Ui.Form.Item.Input style={{ width: '80%', backgroundColor: 'rgba(28,123,149,0.1)' }} placeholder='请输入物品名称'
							value={data?.item_name}
							onChange={(val) => {
								//todo
								setdata({
									...data,
									item_name: val
								});
							}}
						/>
					</div>
					<div className="btnDiv">
						<div className="resetBtnDiv">
							<Input type='reset' className='resets arco-btn arco-btn-outline arco-btn-size-default arco-btn-shape-square' value='清&nbsp;空'
								onClick={
									() => {
										setdata(initData);
									}
								}
							/>
						</div>
						<div className="saveBtnDiv">
							<Ui.Button.Save

								onClick={async () => {
									//console.log('获取到的userid是', curuser.user.user_id);
									setdata({ ...data, user_id: curuser.user.user_id });
									await apiH5DemosXzwp(data);
									setdata(initData);
								}}></Ui.Button.Save>
						</div>
					</div>
					<div className="description">
						{/* <Ui.Form.Item.TextArea minLength={10} maxLength={100} style={{ width: '80%', height: '222px', overflowY: 'auto' }} placeholder='请详细说明丢失物品、地点、时间等' /> */}
						<TextArea style={{ width: '90%', height: '80%', overflowY: 'auto', backgroundColor: 'rgba(28,123,149,0.1)' }} placeholder='请详细说明丢失物品、地点、时间等'
							value={data?.item_desc}
							onChange={(val) => {
								//todo
								setdata({
									...data,
									item_desc: val
								});
							}}
						/>
					</div>
					<div className="date">
						<Ui.Form.Item.DatePicker className='pick_time'
							value={data?.item_time}
							showTime
							style={{ backgroundColor: '' }}
							onChange={(val) => {
								//todo
								setdata({
									...data,
									item_time: val
								});
							}}
						/>
					</div>
					<div className="type">
						<Ui.Form.Item.Select
							style={{ width: '120px' }}
							placeholder='请选择'
							onChange={(val) => {
								setdata({
									...data,
									item_type: val == "寻物" ? 0 : 1
								});
							}}
						>
							<Ui.Form.Item.Select.Option value={'招领'} />
							<Ui.Form.Item.Select.Option value={'寻物'} />
						</Ui.Form.Item.Select>
					</div>
					<div className="tupan">
						<Wptp
							onChange={(fid) => {
								setdata({ ...data, image_url: fid });
							}}
							onDelete={() => {
								setdata({ ...data, image_url: null });
							}}
							item_url={data?.image_url}
						/>
					</div>
				</Ui.Form>
			</div >
		)}
		<style jsx>{`
.pick_time{
	width: 100px;
}
.body{
  position: relative;
  top: 50px;
  margin: 3px 1px 2px 1px;
  width: 99%;
  height: 750px;
  background-color: ;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
}
.name{
	position: absolute;
	top: 0;
	left: 0;
	display:block;
	width: 50%;
	height: 10%;
	text-align: left;
	color: #087592;
}
.btnDiv{
	position: absolute;
	top: -15px;
	right: 0;
	display:block;
	width: 50%;
	height: 10%;
	text-align: right;
	color: #087592;
}
.resetBtnDiv{
width: 63px;
height: 31px;
position: absolute;
bottom: 5%;
right: 80px;
}
.saveBtnDiv{
width: 63px;
height: 31px;
position: absolute;
bottom: 5%;
right: 10px;
}
.description{
	position: absolute;
	top: 10%;
	left: 0;
	display:block;
	width: 100%;
	height: 60%;
	padding-left: 5px;
	padding-right: 5px;
}

.date{
	position: absolute;
	top: 60%;
	display:block;
	text-align: left;
	padding-right: 5px;
	width: 60%;
	height: 15%;
    
}
.type{
	position: absolute;
	top: 60%;
right: 10%;
	display:block;
	text-align: right;
	padding-right: 5px;
	width: 40%;
	height: 15%;
}
.tupan{
	bottom: 0;
	left: 0;
	position: absolute;
	width: 100%;
	height: 25%;
	border-radius: 10px;
} 
		`}</style>
	</>;
}
