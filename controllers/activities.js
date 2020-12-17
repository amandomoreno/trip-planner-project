const Activity = require('../models/activity')

module.exports = {
    new: newActivity,
    create
}

function newActivity(req, res) {
    Activity.find({}, function(err, activities){
        res.render('activities/new', {
            title: "Add Activity", 
            user: req.user,
            activities
        })
    })
} 

function create(req, res){
    Activity.create(req.body, function(err, activity){
        console.log(activity)
        res.redirect('/activities/new')
    })
}