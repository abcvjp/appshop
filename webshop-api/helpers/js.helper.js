exports.isEmptyArray = (arr) => {
	if (typeof arr !== 'undefined' && arr.length > 0) {
		return false
	}
	return true
}