exports.upsert = (sequelizeModel, condition, values) => {
    return sequelizeModel
        .findOne({ where: condition })
        .then(function(obj) {
            // update
            if(obj)
                return obj.update(values);
            // insert
            return sequelizeModel.create(values);
        })
}