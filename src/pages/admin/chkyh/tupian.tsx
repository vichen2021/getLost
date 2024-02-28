import { Icon } from '@arco-design/web-react';
import res from '../../../atoms/res';
import Ui from '../../../components/ui';
import { ITbArticle } from '../../../db/01factory/table/tb_article';
import Bjbc from '../swxx/bjbc';
import { useEffect, useState } from 'react';
import { Loading } from '@arco-design/mobile-react';
import { unixTimeToString1, unixTimeToString2 } from '../../api/timeUtil';
import getfile from '../../../atoms/getfile';
/**
 * 图片
 */
export default function Tupian({ article }: { article: ITbArticle }) {
	const [loading, setLoading] = useState(true);
	// 图片地址
	const src = (() => {
		if (article?.image_url) {
			return getfile(article.image_url);
		}
		return res['/yaoshi.jpg']
	})();
	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 100); // 模拟1秒的loading状态
	}, [article]);
	return <>
		<div className="kapian">
			{loading ? (
				<Loading />
			) : (
				<div className="description">
					<Ui.Layout.Row style={{ margin: '20px 20px 20px 50px', height: '150px', width: '280px' }}>
						<Ui.Layout.Column>
							<label className='wenzi'>物品名称：</label>
							<span >{article?.item_name ?? ""}</span><br />
							<label className='wenzi'>物品类型：</label>
							<span >{article?.item_type == 1 ? "招领" : "寻物" ?? ""}</span><br />
							<label className='wenzi'>丢失/拾取时间：</label>
							<span >{unixTimeToString2(parseInt(article?.item_time, 10)) ?? ""}</span><br />
							<label className='wenzi'>失物状态：</label>
							<span >{article?.is_matched == 1 ? "已找回" : "未找回" ?? ""}</span><br />
						</Ui.Layout.Column>
					</Ui.Layout.Row>
					<Ui.Layout.Row style={{ position: 'relative', bottom: '165px', left: '350px', width: '300px' }}>
						<Ui.Layout.Column>
							<label className='wenzi'>物品描述：</label>
							<div style={{ width: '300px', height: '145px' }}>
								<p>{article?.item_desc ?? ""}</p>
							</div>
						</Ui.Layout.Column>
					</Ui.Layout.Row>
					<Ui.Layout.Row style={{ position: 'relative', bottom: '370px', left: '650px' }}>
						<Ui.Layout.Column>
							<div className='img'>
								<img className='picture' title={`${600}*${400}`} src={src} />
								{/* <img src={res['/yaoshi.svg']} alt="" /> */}
							</div>
						</Ui.Layout.Column>
					</Ui.Layout.Row>
					<Ui.Layout.Row style={{ position: 'relative', bottom: '470px', left: '980px' }}>
						<Ui.Layout.Column>
							<div className='editbtn'>
								<Bjbc initData={article}
									onChange={() => {
										location.reload();
									}} />
							</div>
						</Ui.Layout.Column>
					</Ui.Layout.Row>
				</div>
			)}
		</div >
		<style jsx>{`
.editbtn{

border: 1px solid #1C7B95;
width: 50px;
border-radius: 10px;
background-color: rgba(28,123,149,0.1);
}
.description{
width: auto;
height: 158px;
}
		.img{
padding: 6px 100px;
width: 213px;
height: 144px;

}
		.picture{
 	max-width: 100%;
        max-height: 100%;
        display: block;
        margin: auto;
}
.kapian{
/* 矩形 1 */

width: 1118px;
height: 158px;
border-radius: 24px;
margin-top: 20px;
border:1px solid #1C7B95;
background-color: rgba(28,123,149,0.06);
}
.wenzi{
color: #1C7B95;
}
		`}</style>
	</>;
}
