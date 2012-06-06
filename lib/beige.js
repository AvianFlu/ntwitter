/* beige.js */

var claimdb = require('../db/claimdb.js');

var beiges = [
	{name: 't1', hex: '#ffebcd'},
	{name: 't2', hex: '#856363'}, 
	{name: 't3', hex: '#F5F5DC'}, 
	{name: 't4', hex: '#FFF8E7'}, 
	{name: 't5', hex: '#EDC9AF'}, 
	{name: 't6', hex: '#C2B280'}, 
	{name: 't7', hex: '#A67B5B'}, 
	{name: 't8', hex: '#967117'}
];

var beigesObjs = [];

var beige = function (hex, name) {
	return {
		hex: hex,
		name: name
	}
}

function getRandom () {
	var len = beiges.length;
	var randomnumber = Math.floor(Math.random()*len);
	return beiges[randomnumber];
}

function getTwoRandom () {
	var first = null; 
	var second = null; 

	first = getRandom();
	second = getRandom();

	while (second === first) {
		second = getRandom();
		//console.log(first, second);
	}

	return [first, second];
	return {1: first, 2: second};
}

function generate100Randoms () {
	var start = new Date();
	var arr = [];

	for(var i=0; i<10000; i++) {
		arr.push(getTwoRandom());
	}

	console.log(arr.length);
	//console.log(arr);
	console.log(start, new Date());

	console.log(beiges.length)

	return arr;

}

function getDBEntries() {
	claimdb.getAllBeiges(function(err, docs) {
		console.log(docs);
		//return docs;
	});
}

exports.getTwoRandom = getTwoRandom;
exports.generate100Randoms = generate100Randoms;
exports.getDBEntries = getDBEntries;