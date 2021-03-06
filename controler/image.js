const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: process.env.KEY_CLARIFAI 
   });

const hangleImageApi = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => res.json(data))
    .catch(console.log)
}


const handleImage = (req, res, db) => {
    const {id} = req.body;

    
        db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            if(entries.length){
                res.json(entries[0])
            }
            else{
                res.json('user id fault')
            }
        })
        .catch(err => res.json('Error'))
    
   
}

module.exports = {
    handleImage,
    hangleImageApi
}