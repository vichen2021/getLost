// timeUtils.ts
export function unixTimeToString1(unixTime: number): string {
	const unixTimeNumber = typeof unixTime === 'string' ? parseInt(unixTime, 10) : unixTime; // 将字符串转换为数字
	const date = new Date(unixTimeNumber);
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hour = date.getHours();
	const minute = date.getMinutes();
	let suffix = hour >= 12 ? '下午' : '上午';
	if (hour >= 19) {
		suffix = '晚上'
	}
	const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
	return `${suffix}${formattedHour}点 ${month}月${day}日 ${year}年`;
	// const date = new Date(unixTime * 1000);
	// const year = date.getFullYear();
	// const month = date.getMonth() + 1;
	// const day = date.getDate();
	// const hour = date.getHours();
	// const minute = date.getMinutes();
	// const suffix = hour >= 12 ? '下午' : '上午';
	// const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
	// return `${suffix}${formattedHour}点 ${month}月${day}日 ${year}年`;
}
export function unixTimeToString2(unixTime: number): string {
	const unixTimeNumber = typeof unixTime === 'string' ? parseInt(unixTime, 10) : unixTime; // 将字符串转换为数字
	const date = new Date(unixTimeNumber);
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hour = date.getHours();
	const minute = date.getMinutes();
	let suffix = hour >= 12 ? '下午' : '上午';
	if (hour >= 19) {
		suffix = '晚上'
	}
	const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
	return `${year}年${month}月${day}日 ${suffix} ${hour}点`;
}
export function unixTimeToString3(unixTime: number): string {
	const unixTimeNumber = typeof unixTime === 'string' ? parseInt(unixTime, 10) : unixTime; // 将字符串转换为数字
	const date = new Date(unixTimeNumber);
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hour = date.getHours();
	const minute = date.getMinutes();
	let suffix = hour >= 12 ? '下午' : '上午';
	if (hour >= 19) {
		suffix = '晚上'
	}
	const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
	return `${year}-${month}-${day} ${hour}:${minute}`;
}