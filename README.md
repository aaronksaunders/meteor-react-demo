#Demo Using React & Meteor

###Overview
* This is based on the code from the starter video and template provided by [https://github.com/ryanswapp/react-meteor-template](https://github.com/ryanswapp/react-meteor-template). 
* Link to youtube video [https://www.youtube.com/watch?v=kVbVBp35keQ](https://www.youtube.com/watch?v=kVbVBp35keQ)

###Differences
* There was some code missing that showed how to actually create an account so I have included that in this demo.
* The form helper code did not properly use the label when rendering the form
* The form helper code did not support a date picker - used package [3stack:react-datetimepicker](https://atmospherejs.com/3stack/react-datetimepicker)
* The form helper code did not support select-option input type
* Handle state changes when user logs in and logs out thru `Meteor.user()`
* Added Image Upload functionality to store a small photo with user profile by adding another form helper code

###Packages Integrated
```
# Meteor packages used by this project, one per line.
# Check this file (and the other files in this directory) into your repository.
#
# 'meteor add' and 'meteor remove' will edit this file for you,
# but you can also edit it by hand.

meteor-base             # Packages every Meteor app needs to have
mobile-experience       # Packages for a great mobile UX
mongo                   # The database Meteor supports right now
blaze-html-templates    # Compile .html files into Meteor Blaze views
session                 # Client-side reactive dictionary for your app
jquery                  # Helpful client-side library
tracker                 # Meteor's client-side reactive programming library

standard-minifiers      # JS/CSS minifiers run for production mode
es5-shim                # ECMAScript 5 compatibility for older browsers.
ecmascript              # Enable ECMAScript2015+ syntax in app code

autopublish             # Publish all data to the clients (for prototyping)
insecure                # Allow all DB writes from clients (for prototyping)
react
kadira:flow-router
kadira:react-layout
twbs:bootstrap
accounts-password
meteortoys:allthings
natestrauser:font-awesome
tsega:bootstrap3-datetimepicker
3stack:react-datetimepicker
juliancwirko:s-alert
juliancwirko:s-alert-slide
juliancwirko:s-alert-scale
```
