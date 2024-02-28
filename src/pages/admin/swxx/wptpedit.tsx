import Ui from '../../../components/ui';
import getfile from '../../../atoms/getfile';
import res from '../../../atoms/res';
/**
 * 物品图片
 */
export default function Wptpedit(
	{ onChange,
		onDelete,
		item_url
	}: {
		onChange(fid: string): void;
		onDelete(): void;
		item_url: string
	}) {
	const src = (() => {
		if (item_url != null) {
			return getfile(item_url);
		}
		return res['/yaoshi.jpg']
	})();
	return <>
		<div>
			<Ui.Form.Item
			>
				<div className="img">
					<Ui.File.Uploader
						tip='点击此处添加图片'
						multiple={false}
						// files={filelist}
						deleteFileOnServer
						onChange={(files) => {
							if (files.length > 0) {
								onChange(files[files.length - 1].fileid);
								console.log(files[files.length - 1].fileid, "文件名")
							} else {
								onDelete();
							}
						}}
						limit={1}
						listType='picture-card'
					>
						<img className='picture' src={src} />
					</Ui.File.Uploader>
				</div>
			</Ui.Form.Item>
		</div>
		<style jsx>{`
		.picture{
 		max-width: 40%;
        max-height: 40%;
        display: block;
}
		`}</style>
	</>;
}
