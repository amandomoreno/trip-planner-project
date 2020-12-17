const Destination = require('../models/destination')

module.exports = {
    new: newDestination,
    create,
    index,
    show,
    update,
    delete: deleteDestination
}

function newDestination(req, res) {
    res.render('destinations/new', {
        title: "Add Destination", 
        user: req.user,
        err: ''})
} 

function create(req, res){
    Destination.create(req.body, function(err, destination){
        console.log(destination)
        res.redirect('/destinations/new')
    })
}

function index(req, res){
    Destination.find({}, function(err, destinations){
        res.render('destinations/index', { 
            title: "All Destinations", 
            user: req.user,
            destinations
        })
    })
}

function show(req, res){
    Destination.findById(req.params.id, function(err, destination) {
        res.render('destinations/show', {
            title: 'Destination Detail', 
            user: req.user,
            destination
        })
    })
}

function update(req, res){
    Destination.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err, destination){
        res.redirect('/destinations')
    })
}

function deleteDestination(req, res){
    Destination.findByIdAndDelete(req.params.id, function(err){
        res.redirect('/destinations')
    })
}