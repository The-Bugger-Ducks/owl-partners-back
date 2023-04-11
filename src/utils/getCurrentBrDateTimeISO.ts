
// import { format, utcToZonedTime } from 'date-fns-tz';
// export function getCurrentBrDateTimeISO() {
// 	const timeZone = 'America/Sao_Paulo';
// 	const date = new Date();
// 	const brazilDateTime = utcToZonedTime(date, timeZone);
// 	const formatStr = 'yyyy-MM-dd\'T\'HH:mm:ssXXX'; // Formato ISO

// 	console.log(brazilDateTime);


// 	return format(brazilDateTime, formatStr, { timeZone });
// }



export function getCurrentBrDateTimeISO(): string {
	const now = new Date()
	const offset = -180 // offset em minutos (-180 equivale a -3 horas, ou seja, horário de Brasília)
	const localTimestamp = now.getTime() + offset * 60 * 1000 // adiciona o offset em milissegundos

	const localDate = new Date(localTimestamp)
	const formattedDate = localDate.toISOString()

	console.log(formattedDate);

	return formattedDate
}

