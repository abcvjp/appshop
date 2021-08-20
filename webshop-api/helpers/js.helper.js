exports.isEmptyArray = (arr) => {
	if (typeof arr !== 'undefined' && arr.length > 0) {
		return false
	}
	return true
}

exports.isObjectEmpty = obj => {
	return Object.keys(obj).length === 0
}

exports.deleteObjProps = (obj, prop) => {
    for (const p of prop) {
        (p in obj) && (delete obj[p]);
    }    
}