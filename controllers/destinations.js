const Destination = require('../models/destination')

module.exports = {
    new: newDestination,
    create,
    index
}

function newDestination(req, res) {
    res.render('destinations/new', {
        title: "Add Destination", 
        user: req.user,
        err: ''})
} 

// function create(req, res){
//     const destination = new Destination(req.body.postedBy)
//     req.body.postedBy = req.user.name
//     req.body.avatar = req.user.avatar
//     destination.save(function(err){
//         if (err){
//         console.log(err)
//         return res.redirect('/destinations/new')
//         }
//         console.log(destination)
//         Destination.create(req.body)
//         res.redirect('/destinations/new')
//     })
// }

function create(req, res){
    Destination.create(req.body, function(err, destination){
        console.log(destination)
        res.redirect('/destinations/new')
    })
}

// function index(req, res) {
//     Message.find({})
//     .then((messages) => {
//       res.render("messages/index", {
//         user: req.user,
//         title: "Message Board",
//         messages: messages.reverse()
//       })
//     })
//   }

function index(req, res){
    Destination.find({}, function(err, destinations){
        res.render('destinations/index', { 
            title: "All Destinations", 
            user: req.user,
            destinations
        })
    })
}

