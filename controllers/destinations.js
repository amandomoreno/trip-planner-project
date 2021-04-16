const Destination = require('../models/destination')
const Activity = require('../models/activity')
const User = require('../models/user')

module.exports = {
    new: newDestination,
    create,
    index,
    show,
    update,
    delete: deleteDestination,
    addActivity
}

function newDestination(req, res) {
    res.render('destinations/new', {
        title: "Add Destination", 
        user: req.user,
        err: ''})
} 

function create(req, res){
    req.body.createdBy = req.user._id
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

// function show(req, res) {
//   Movie.findById(req.params.id)
//   .populate('cast').exec(function(err, movie) {
//     Performer.find({_id: {$nin: movie.cast}}, function(err, performers) {
//       res.render('movies/show', {title: 'Movie Detail', movie, performers})
//     })
//   })
// }

// function create(req, res) {
//   Movie.findById(req.params.id, function(err, movie) {
//     movie.reviews.push(req.body)
//     movie.save(function(err) {
//       res.redirect(`/movies/${movie._id}`)
//     })
//   })
// }

function show(req, res){
    Destination.findById(req.params.id)
    .populate('activities').exec(function(err, destination) {
        Activity.find({_id: {$nin: destination.activities}}, function(err, activities) { 
            console.log(destination)      
            res.render('destinations/show', {
                title: 'Destination Details', 
                user: req.user, 
                destination, 
                activities
            })
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

function addActivity(req, res){
    console.log(req.body.activityId, 'activityId')
    Destination.findById(req.params.id, function(err, destination){
        destination.activities.push(req.body.activityId)
        destination.save(function(err){
            res.redirect(`/destinations/${destination._id}`)
        })
    })
}

