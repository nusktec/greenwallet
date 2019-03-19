//this control view meta data and menu handling
var metaFunctions = function (title,menu) {
    var meta = {
        mtitle: title+' | '+process.env.APP_NAME,
        mdesc:  process.env.APP_DESC,
        mkeys:  process.env.APP_KEYS,
        mauth:  process.env.APP_AUTH,
        mselect:menu
    };
    return meta;
};

module.exports = metaFunctions;