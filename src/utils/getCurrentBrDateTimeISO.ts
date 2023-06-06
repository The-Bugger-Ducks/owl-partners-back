export function getCurrentBrDateTimeISO(): string {
	const now = new Date()
	console.log("Hora UTC: ", now.getHours(), ":", now.getMinutes())
	const offset = -180 // offset em minutos (-180 equivale a -3 horas, ou seja, horário de Brasília)
	const localTimestamp = now.getTime() + offset * 60 * 1000 // adiciona o offset em milissegundos

	const localDate = new Date(localTimestamp)
	const formattedDate = localDate.toISOString()
	console.log("Hora Formatada: ", localDate.getHours(), ":", localDate.getMinutes())

	return now.toISOString()
}

