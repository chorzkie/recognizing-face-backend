const Clarifai = require('clarifai')

const appClarifai = new Clarifai.App({
    apiKey: 'eacdc29814054bf086ee4ba63bb8f983'
});

const clarifaiApiCall = (req, res) => {
    const { input } = req.body
    appClarifai.models.predict(Clarifai.FACE_DETECT_MODEL, input)
        .then(data => {
            res.json(data)
        })
        .catch(err =>
            res.status(404).json('Unable to call API')
        )
}

const image = (req, res, dbaseSql) => {
    const { id } = req.body
    dbaseSql('users').where('id', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entry => {
            res.json(entry[0])
        })
        .catch(err =>
            res.status(404).json('Unable to update entries')
        )
}

const getEntries = (req, res, dbaseSql) => {
    const { id } = req.params
    dbaseSql('users').select('entries').where('id', id)
        .then(feedback => {
            res.json(feedback[0])
        })
        .catch(err =>
            res.status(404).json('Unable to fetch entries')
        )
}

module.exports = {
    clarifaiApiCall,
    image,
    getEntries
}