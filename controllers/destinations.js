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

// function deleteDestination(req, res){
//         let idx = destination.indexOf(req.params.id)
//         req.user.destination.splice(idx, 1)
//         req.user.save().then(() =>{
//             res.redirect('/destinations')
//         })
// }

// function removeFromCollection(req, res) {
//     Game.findOne({ slug: req.params.slug }).then((game) => {
//       let idx = game.favoritedBy.indexOf(req.user._id);
//       game.favoritedBy.splice(idx, 1);
//       game.save().then(() => {
//         res.redirect(`/games/${req.params.slug}`);
//       });
//     });
//   }

// function removeFromWatchList(req, res) {
//     let idx = req.user.watchList.findIndex((g) => g.slug === req.params.slug);
//     req.user.watchList.splice(idx, 1);
//     req.user.save().then(() => {
//       res.redirect(`/games/${req.body.slug}`);
//     });
//   }

// function removeFriend(req, res) {
//     let idx = req.user.friends.indexOf(req.params.id);
//     req.user.friends.splice(idx, 1);
//     req.user.save().then(() => {
//       res.redirect(`/users/${req.params.id}`);
//     });
//   }


function addActivity(req, res){
    console.log(req.body.activityId, 'activityId')
    Destination.findById(req.params.id, function(err, destination){
        destination.activities.push(req.body.activityId)
        destination.save(function(err){
            res.redirect(`/destinations/${destination._id}`)
        })
    })
}

