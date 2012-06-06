/* beige.js */

var claimdb = require('../db/claimdb.js');

var beiges = [
	{name: 'Aglet', hex: '#F0F0D8'},
	{name: 'Coconut Cream Pie', hex: '#F1EFDA'},
	{name: 'Serenity 001', hex: '#F2EEDB'},
	{name: 'Your Love is a Light', hex: '#FBFCD0'},
	{name: 'Vintage Paper', hex: '#EAE2CF'},
	{name: 'Tan', hex: '#ECE9D8'},
	{name: 'October Morning', hex: '#F2E9C6'},
	{name: "Cote D'ivoire", hex: '#EBEBD3'},
	{name: 'Jesus', hex: '#ECE1BD'},
	{name: 'Metallic Pearls', hex: '#FCF8E0'},
	{name: "Golden Beige", hex: '#D8BC69'},
	{name: 'Dark Beige (panty)', hex: '#CAAC94'},
	{name: "Born again Christian", hex: '#FDEDD4'},
	{name: 'Wallpaper Beige', hex: '#F8F2BC'},
	{name: 'Box of Memories', hex: '#F8EEB1'}
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