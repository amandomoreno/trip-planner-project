const Destination = require('../models/destination')

module.exports = {
    new: newDestination,
    create
}

function newDestination(req, res) {
    res.render('destinations/new', {
        title: "Add Destination", 
        user: req.user,
        err: ''})
} 

function create(req, res){
    const destination = new Destination(req.body.postedBy)
    req.body.postedBy = req.user.name
    req.body.avatar = req.user.avatar
    destination.save(function(err){
        if (err){
        console.log(err)
        return res.redirect('/destinations/new')
        }
        console.log(destination)
        Destination.create(req.body)
        res.redirect(`/destinations/${destination._id}`)
    })
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
//         res.redirect(`/destinations/${destination._id}`)
//     })
// }

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