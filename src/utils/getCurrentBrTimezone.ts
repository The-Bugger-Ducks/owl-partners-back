import { log } from 'console';
import { format, utcToZonedTime } from 'date-fns-tz';
export function getCurrentBrTimezone() {
	const timeZone = 'America/Sao_Paulo';
	const date = new Date();
	const brazilDateTime = utcToZonedTime(date, timeZone);
	const formatStr = 'yyyy-MM-dd\'T\'HH:mm:ssXXX'; // Formato ISO

	console.log(brazilDateTime);


	return format(brazilDateTime, formatStr, { timeZone });
}

