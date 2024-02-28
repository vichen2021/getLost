import code from './controllers/code';
import detail from './controllers/detail';
import wpxx from './controllers/wpxx';
import yhxxgl from './controllers/yhxxgl';
import sysConfig from './controllers/sys/config';
import sysFile from './controllers/sys/file';
import sysGroup from './controllers/sys/group';
import sysLog from './controllers/sys/log';
import sysMenu from './controllers/sys/menu';
import sysRole from './controllers/sys/role';
import sysSession from './controllers/sys/session';
import sysTbimpexp from './controllers/sys/tbimpexp';
import sysUser from './controllers/sys/user';
import sysUtils from './controllers/sys/utils';
import sysSessionCookie from './controllers/sys/session/cookie';

const ctrls = {
	code,
	detail,
	wpxx,
	yhxxgl,
	sysConfig,
	sysFile,
	sysGroup,
	sysLog,
	sysMenu,
	sysRole,
	sysSession,
	sysTbimpexp,
	sysUser,
	sysUtils,
	sysSessionCookie
};
export default ctrls;
