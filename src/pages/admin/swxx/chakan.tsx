import pages from '../../../atoms/pages';
import Link from '../../../components/link';
import Ui from '../../../components/ui';

/**
 * 查看
 */
export default function Chakan({ id }: { id: string }) {
	return <>
		<Link href={pages['/admin/chkshw'] + `?itemid=${id}`} ><Ui.Table.Button title='查看' /></Link>
	</>;
}
