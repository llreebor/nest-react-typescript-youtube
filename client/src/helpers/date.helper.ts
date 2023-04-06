type DateFormatOptions = {
	year?: 'numeric' | '2-digit'
	month?: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long'
	day?: 'numeric' | '2-digit'
}

const formatDate = (dateString: string): string => {
	const date = new Date(dateString)
	const options: DateFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}
	return date.toLocaleString('us-US', options)
}

export default formatDate
