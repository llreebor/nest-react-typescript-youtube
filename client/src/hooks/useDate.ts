import { useMemo } from 'react'

type DateFormatOptions = {
	year?: 'numeric' | '2-digit'
	month?: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long'
	day?: 'numeric' | '2-digit'
}

const useFormattedDate = (dateString: string): string => {
	const date = useMemo(() => new Date(dateString), [dateString])
	const options: DateFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}
	return date.toLocaleString('us-US', options)
}

export default useFormattedDate
