const Destination = require('../models/destination')

module.exports = {
    create
}

function create(req, res){
    Destination.findById(req.params.id, function(err, destination){
        destination.reviews.push(req.body)
        destination.save(function(err){
            res.redirect(`/destinations/${destination._id}`)
        })
    })
}