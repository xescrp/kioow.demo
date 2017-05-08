//===================================================================
//configure folders to watch and matching || excluding rules
//Config item :  (Add your items in the folders array) 
//{
//    name: 'omt.prd', // This is an item identify. it must be unique on the folder collection
//    server: 'http://localhost:1010', // Set the target remote server where files have to be replied. This is the Listener
//    sourcerelated: ['c:/app/public/data'], //An information field. just for info, set your references her
//    sourcefolder: 'C:/development/node/app/public_backup/data', //the directory for watching
//    targetfolder: 'c:/temp', //the remote server target directory
//    filter: {  //filters
//        exclude: ['*.json'] //exclussion filter. A collection of rules for discarding the matching files, ej: ['*.json', '*.html', 'config.js']
//        match: ['*.json'] //match filter. A collection of rules for only including the matching files, ej: ['*.json', '*.html', 'config.js']
//    }
//},
// Note: The process flow for filters executes match rules at first time, and then executes exclude rules. be careful not 
// including mutual exclussion rules on filter.match vs. filter.exclude
//===================================================================
module.exports = {
    folders: [
        {
            name: 'omt.prd',
            server: 'http://localhost:1010',
            sourcerelated: ['c:/app/public/data'],
            sourcefolder: 'C:/development/node/app/public_backup/data',
            targetfolder: 'c:/temp',
            //filter: {
            //    exclude: ['*.json']
            //}
        }
    ]
}