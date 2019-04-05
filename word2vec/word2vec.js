var Az = require('az');
var emb = require('./emb.json'); //emb.length = 5000
var vcb = require('./dictionary.json');

/*
functions:
- parseSearchStr      (str, callback) 	  => callback(with arr of norm words)
- getVectorOfArrWord  (arr_str) 			  => vector of this arr
- getNearestByPhrase  (str, c_nst, cb)   => callback(with arr of nearest id's word)
- getVectorPhrase     (str, callback)	  => callback(with vector)
- getId               (word) 				  => id of word || -1
- getVector           (word) 				  => vect of word || -1
- cosCompare          (a, b)				  => cos of angle between vectors
- cosCompareVsArr     (a, arr)			  => arr of cosCompare
- getNearest          (a, howMutch)  	  => array of id's words (howMutch nearest words)
*/


/**
 * return callback(with arr of norm words)
 * @param  {[type]}   str      :phrase
 * @param  {Function} callback :func
 */
function parseSearchStr(str, callback) {
	Az.Morph.init(function() {
		var res_arr = [];
		var tokens = Az.Tokens(str).done(['WORD']);
		for (var i = 0; i < tokens.length; i++) {
			var t = tokens[i];
	 		var word = t.source.substr(t.st, t.length);
			
			res_arr.push( Az.Morph(word)[0].normalize().word );
		}

		callback(res_arr);
	});	
}
// parseSearchStr('новый стартап сделают', function(res) { console.log(res); });

/**
 * return vect
 * @param  [arr of normilize words] arr_str
 */
function getVectorOfArrWord(arr_str) {
	var res_vec;
	
	arr_str.forEach(function(elem_of_arr) {
		var vec_word = getVector(elem_of_arr);	
	
		if (vec_word != -1) {
			if (res_vec) {
				for (var i = 0; i < res_vec.length; i++) {
					res_vec[i] += vec_word[i];
				}
			} else {
				res_vec = vec_word;
			}
		}
	})

	return res_vec || -1;
}
// console.log(getVectorOfArrWord(['да', 'ну', 'еще', 'прожил']));

/**
 * asinc! run callback(with arr of nearest id's word)
 * @param  {[type]} str           
 * @param  {[type]} count_nearest 
 * @param  {Function} callback   
 */
function getNearestByPhrase(str, count_nearest, callback) {
	
	parseSearchStr(str, function(res_arr_words) {
		var res_vector_of_arr = getVectorOfArrWord(res_arr_words);
		var nearest_arr = getNearest(res_vector_of_arr, count_nearest);
		
		callback(nearest_arr);
	});	
}
// getNearestByPhrase('новый стартап сделают', 3, function(res_Arr) {console.log(res_Arr)});


/**
 * return callback(with vector)
 * @param  {[type]}   str      
 * @param  {Function} callback :func
 */
function getVectorPhrase(str, callback) {
	parseSearchStr(str, function(res_arr_words) {
		var res_vector_of_arr = getVectorOfArrWord(res_arr_words);
		callback(res_vector_of_arr);
	});		
}
// getVectorPhrase('новый старdтап сдdелают', function(res_vec) {console.log(res_vec)});

function getId(word) {
	return vcb[word] || -1;
}

function getVector(word) {
	return (getId(word) != -1) ? emb[getId(word)] : -1;
}
// console.log(getVector('смелым'));


/**
 * return cos of angle between vectors
 * @param  [arr] a 
 * @param  [arr] b 
 * @return [int]
 */
function cosCompare(a, b) {
	function absVec(x) {
		var sum = x.reduce(function(sum, current) {
			return sum + current*current;
		}, 0);
		return Math.sqrt(sum);
	}

	var ab_sum = a.reduce(function(sum, current, index) {
		return sum + current*b[index];
	}, 0);

	return ab_sum/(absVec(a) * absVec(b));
}
// console.log(cosCompare([1, 2, 4], [2, 1, 0]));


function cosCompareVsArr(a, arr) {
	return arr.map(function(e) { 
		return cosCompare(a, e);
	});
}
// console.log(cosCompareVsArr([1, 2, 4], [[2, 1, 0], [2, 1, 0]]));


/**
 * return array of id's words (howMutch nearest words)
 * @param  [arr] a vector
 * @param  [int] howMutch 
 * @return array
 */
function getNearest(a, howMutch) {
	if (howMutch > emb.length) {
		howMutch = emb.length;
	}

	var data = emb.map(function(e, index) {
		var compare = cosCompare(a, e);
		return {
			vector: e,
			cos_comp: compare,
			id_word: index
		};
	});

	// data[0] - max
	data.sort(function(a, b) {
		return b.cos_comp - a.cos_comp;
	})

	var res = [];
	for(var i = 0; i < howMutch; i++) {
		res.push(data[i].id_word)
	}
	return res;
}
// console.log(getNearest(emb[364], 5));
// анализ: 364
// "наблюдение": 77
// var rev_dict = require('./rev_dict.json');
// getNearest(emb[77], 10).forEach(function(e) {
// 	console.log(rev_dict[e]);
// });

var out_module = {
	getVectorPhrase: getVectorPhrase,
	cosCompare: cosCompare,
	cosCompareVsArr: cosCompareVsArr
};

module.exports = out_module;