const IS_BROWSER = false;
const DEBUG = false;
const BBS_DOMAIN = DEBUG ? 'http://bbs.kanxue.cn/' : 'https://bbs.kanxue.com/';
const PASSPORT_DOMAIN = DEBUG ? 'http://passport.kanxue.cn/' : 'https://passport.kanxue.com/';
const WWW_DOMAIN = DEBUG ? 'http://www.kanxue.cn/' : 'https://www.kanxue.com/';

export default {
	DEBUG,
	IS_BROWSER,
	BBS_DOMAIN,
	PASSPORT_DOMAIN,
	WWW_DOMAIN
}
