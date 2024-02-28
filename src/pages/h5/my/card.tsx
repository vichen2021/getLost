import { useRouter } from 'next/router';
import res from '../../../atoms/res';
import Button from '../../../components/button';
import { ITbArticle } from '../../../db/01factory/table/tb_article';
import { unixTimeToString1 } from '../../api/timeUtil';
import apiH5MyShchwp, { Message as M1, Result as R1 } from '../../api/h5/my/shchwp';
import Ui from '../../../components/ui';
import ui from '../../../atoms/ui';
import getfile from '../../../atoms/getfile';
import { Modal } from '@arco-design/web-react';
/**
 * Card
 */
export default function Card({ article }: { article: ITbArticle }) {
	const router = useRouter();
	const src = (() => {
		if (article?.image_url) {
			return getfile(article.image_url);
		}
		return res['/yaoshi.jpg']
	})();
	return <>
		<div className="card" onClick={() => {
			Modal.info({
				style: { width: '50%' },
				title: '物品描述',
				content:
					`${article.item_desc}`,
			});
		}}>
			<Ui.feedback.Confirm
				onOk={async () => {
					try {
						ui.Message.success('删除成功');
						await apiH5MyShchwp(article);
						router.reload();

					} catch (error) {
						ui.Message.showError(error);
					}

				}}
				title={<div className={'tishi'}>
					<div>是否确认删除？</div>
				</div>}
			>
				<span className='vanish'>
					x
				</span>
			</Ui.feedback.Confirm>

			<div className="tupan">
				<img className='picture' title={`${600}*${400}`} src={src} />
				{/* <img src={article?.image_url ?? res['/yaoshi.svg']} alt="" /> */}
			</div>
			<div className="description">
				<span>{article?.item_desc}</span>
			</div>
			<div className="name">
				<span>{article?.item_name}</span>
			</div>
			<div className="date">
				<span>{unixTimeToString1(parseInt(article?.item_time, 10))}</span>
			</div>
		</div >
		<style jsx>{`
.tishi{
font-family: MicrosoftYaHei;
font-size: 14px;
font-weight: normal;
line-height: 22px;
text-align: justify; /* 浏览器可能不支持 */
letter-spacing: 0em;
	
/* 文本/Text-5 */
color: #1D2129;
}
		.card{
			position: relative;
		top: 50px;
		margin: 3px 1px 2px 1px;
		width: 49%;
		height: 300px;
		background-color: rgba(28,123,149,0.1);
		border: 1px solid #087592;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 10px;
		float: left;
}
		.vanish{
			position: absolute;
		z-index: 2;
		top:5%;
		right: 5%;

}
		.tupan{
			position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 70%;
		border-radius: 10px;
}
		.tupan img{
			width: 100%;
		height: 100%;
}
		.description{
			position: absolute;
		bottom: 15%;
		display:block;
		width: 100%;
		height: 15%;
		padding-left: 5px;
		padding-right: 5px;
}
		.name{
			position: absolute;
		bottom: 0;
		left: 0;
		display:block;
		width: 40%;
		height: 15%;
		text-align: left;
		padding-left: 5px;
		color: #087592;
}
		.date{
			position: absolute;
		bottom: 0;
		right: 0;
		display:block;
		text-align: right;
		padding-right: 5px;
		width: 60%;
		height: 15%;
}



		`}</style >
	</>;
}
