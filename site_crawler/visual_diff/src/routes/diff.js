var path = require('path');
var express = require('express');
var router = express.Router();

router.get('/', function (req, response) {
  
    var dircompare = require('dir-compare');
    var format = require('util').format;
    
    var options = {compareSize: true};

    const rootDir = 'C:/temp/DiffTool';
    var sourcePath = path.join(rootDir, '/source');
    var targetPath = path.join(rootDir, '/target');
   
    var states = {'equal' : '==', 'left' : '->', 'right' : '<-', 'distinct' : '<>'};

    // Asynchronous
    dircompare.compare(sourcePath, targetPath, options)
    .then(res => {
        console.log(format('equal: %s, distinct: %s, left: %s, right: %s, differences: %s, same: %s',
                    res.equal, res.distinct, res.left, res.right, res.differences, res.same));                    
        
        var sameFilesWithContentDiff = [];
        var missingFiles = [];
        var newFiles = [];
        var sameFiles = [];        

        res.diffSet.forEach(entry => {
            var state = states[entry.state];
            var name1 = entry.name1 ? entry.name1 : '';
            var name2 = entry.name2 ? entry.name2 : '';

            var entryLog = format('%s(%s)%s%s(%s)', name1, entry.type1, state, name2, entry.type2);

            if (state == '<>') {
                sameFilesWithContentDiff.push(name1);
            } else if (state == '->') {
                missingFiles.push(name1);                
            } else if (state == '<-') {
                newFiles.push(name2);
            } else {
                sameFiles.push(name1);
            }
        });

        response.json({ sourcePath, targetPath, sameFilesWithContentDiff, missingFiles, newFiles, sameFiles});        
    })
    .catch(error => console.error(error));  
});

module.exports = router;