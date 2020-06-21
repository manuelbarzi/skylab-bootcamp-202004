require('nomad-commons/polyfills/string')

const { models: { Workspace } } = require('nomad-data')

module.exports = async (workspaceId) => {
    String.validate.notVoid(workspaceId)

    const workspaceFound = await Workspace.findOne({ _id: workspaceId }).populate({
        path: 'reviews',
        populate: { path: 'user', model: 'User', select: ['name', 'surname'] }
    })

    if (!workspaceFound) throw new Error(`workspace with id ${workspaceId} does not exist`)

    return workspaceFound
}

