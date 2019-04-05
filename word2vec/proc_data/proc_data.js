var fs = require('fs');
var Az = require('az');

var fileContent = fs.readFileSync("data_first.txt", "utf8");
Az.Morph.init('../dicts', function() {
	var res_arr = [];
	var tokens = Az.Tokens(fileContent).done(['WORD']);
	for (var i = 0; i < tokens.length; i++) {
		var t = tokens[i];
 		var word = t.source.substr(t.st, t.length);
		
		// console.log(word);
		if (Az.Morph(word)[0]) {
			res_arr.push( Az.Morph(word)[0].normalize().word );
		}
	}

	res_str = res_arr.join(' ');
	fs.writeFileSync("data_res.txt", res_str);
	console.log('end write');
	console.log('start length: ' + fileContent.length);
	console.log('res_arr length: ' + res_arr.length);
	console.log('res_str length: ' + res_str.length);
});	