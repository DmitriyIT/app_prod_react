var word2vec = require('./word2vec');

/**
 * word2vec.
 * - getVectorPhrase     (str, callback)	  => callback(with vector of phrase)
 * - cosCompare          (a, b)				  => cos of angle between vectors a&b
 * - cosCompareVsArr     (a, arr)			  => arr of cosCompare
 */

// word2vec.getVectorPhrase('новый старdтап сдdелают', function(res_vec) {console.log(res_vec)});
// console: vector of 50 dimention  [ ... -0.07397758960723877, -0.07949069887399673, 0.007408923469483852, ... ]

// console.log(word2vec.cosCompare([1, 2, 4], [2, 1, 0]));
// console: 0.3903600291794133  
// res in [0; 1]:
// 	near 0 - very dissimilar
// 	near 1 - very similar

// console.log(word2vec.cosCompareVsArr([1, 2, 4], [[2, 1, 0], [2, 1, 0]]));
// same as cosCompare, but with array:
// console: [ 0.3903600291794133, 0.3903600291794133 ]