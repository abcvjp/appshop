export const isArrayEmpty = (arr) => (!((typeof arr !== 'undefined') && arr.length > 0))

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