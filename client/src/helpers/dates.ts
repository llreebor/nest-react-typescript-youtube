const FormattedDate = (dateString: string) => {
	const date = new Date(dateString)
	const options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}
}

export default FormattedDate
