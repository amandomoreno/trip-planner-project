const Destination = require('../models/destination')
const Activity = require('../models/activity')

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

// function show(req, res){
//     Destination.findById(req.params.id, function(err, destination) {
//         res.render('destinations/show', {
//             title: 'Destination Detail', 
//             user: req.user,
//             destination
//         })
//     })
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