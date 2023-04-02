export function getTokenFromLocalStorage(): string {
	const token = localStorage.getItem('token')
	const newToken = token ? JSON.parse(token) : ''

	return newToken
}

export function setTokenToLocalStorage(key: string, token: string): void {
	localStorage.setItem(key, JSON.stringify(token))
}

export function removeTokenFromLocalStorage(key: string): void {
	localStorage.removeItem(key)
}
