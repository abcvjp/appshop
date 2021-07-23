export const isArrayEmpty = (arr) => (!((typeof arr !== 'undefined') && arr.length > 0))

export const isObjectEmpty = obj => {
	return Object.keys(obj).length === 0
}

export const createDataTree = dataset => {
	const hashTable = Object.create(null)
	dataset.forEach(aData => hashTable[aData.id] = { ...aData, childs: [] })
	const dataTree = []
	dataset.forEach(aData => {
		if (aData.parent_id) hashTable[aData.parent_id].childs.push(hashTable[aData.id])
		else dataTree.push(hashTable[aData.id])
	});
	return dataTree;
}

export const generateBreadCrumbs = (string, map_name_slug) => {
	return string.split(' - ').map(name => {
		return {
			name,
			path: map_name_slug[name]
		}
	})
}