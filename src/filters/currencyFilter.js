export default function currencyFilter(value) {
	return (value/100).toFixed(2) + "$"
}