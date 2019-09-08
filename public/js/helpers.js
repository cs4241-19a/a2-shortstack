let register = function(Handlebars) {
    let helpers = {
        // put all of your helpers inside this object
        if_eq: function(arg1, arg2, opts){
            return (arg1 === arg2) ? opts.fn(this) : opts.inverse(this);
        }
    };

    if (Handlebars && typeof Handlebars.registerHelper === "function") {
        // register helpers
        for (var prop in helpers) {
            Handlebars.registerHelper(prop, helpers[prop]);
        }
    } else {
        // just return helpers object if we can't register helpers here
        return helpers;
    }

};

module.exports.register = register;
module.exports.helpers = register(null);