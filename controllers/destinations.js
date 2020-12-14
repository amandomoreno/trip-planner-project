const Destination = require('../models/destination')

module.exports = {
    new: newDestination,
    create
}

function newDestination(req, res) {
    res.render('destinations/new', {title: "Add Destination", err: ''})
} 

function create(req, res){
    const destination = new Destination(req.body)
    destination.save(function(err){
        if (err){
        console.log(err)
        return res.redirect('/destinations/new')
        }
        console.log(destination)
        res.redirect(`/destinations/${destination._id}`)
    })
}