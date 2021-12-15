const mongoose =  require('mongoose');
const colors = require('colors');

mongoose.connect("mongodb+srv://pilox97:pilox2760517@cluster0.sbeoa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
    

})
    .then(db => console.log('DB is working'.yellow))
    .catch(error => console.log(error))

    module.export = mongoose;