/* beige.js */
var claimdb = require('../db/claimdb.js');
var userdb = require('../db/usersdb.js');

var beiges = [
	{name: "Aglet", hex: "#F0F0D8"},
	{name: "Coconut Cream Pie", hex: "#F1EFDA"},
	{name: "Serenity 001", hex: "#F2EEDB"},
	{name: "Your Love is a Light", hex: "#FBFCD0"},
	{name: "Vintage Paper", hex: "#EAE2CF"},
	{name: "Tan", hex: "#ECE9D8"},
	{name: "October Morning", hex: "#F2E9C6"},
	{name: "Cote D\'ivoire", hex: "#EBEBD3"},
	{name: "Jesus", hex: "#ECE1BD"},
	{name: "Metallic Pearls", hex: "#FCF8E0"},
	{name: "Golden Beige", hex: "#D8BC69"},
	{name: "Dark Beige (panty)", hex: "#CAAC94"},
	{name: "Born again Christian", hex: "#FDEDD4"},
	{name: "Wallpaper Beige", hex: "#F8F2BC"},
	{name: "Box of Memories", hex: "#F8EEB1"}
];

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

	// Gets a new second random beige while it's the same as the first, too ensure two different beiges.
	while (second === first) {
		second = getRandom();
	}

	claimdb.addAppear(first, second, function (err) {
		if(err) { console.error(err); }
	});

	return [first, second];
}

function generate100Randoms () {
	var start = new Date();
	var arr = [];

	for(var i=0; i<50; i++) {
		arr.push(getTwoRandom());
	}

	console.log(arr.length);
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

function importBeigesToDB () {
	for(var i=0; i<beiges.length; i++) {
		claimdb.claimBeige(beiges[i].hex, beiges[i].name, '272375334', function (err, hex) {
			console.log('claimed:', err, hex);
		})
	}
}

function getTop10 (callback) {

	claimdb.getTop10( function (err, docs) {

		var namesRetrieved = 0;
		var top10Beiges = [];

		if(err) { console.error(err); }
		else {

			for( var i=0; i<docs.length; i++) {
				top10Beiges.push({
					name: docs[i].name,
					hex: docs[i].hex,
					twitterName: null
				});

				userdb.getTwitterName(docs[i].twitterId, i, function (err, doc) {

					top10Beiges[doc.i].twitterName = doc[0].twitterName;
					namesRetrieved ++;

					if(namesRetrieved === 9) {
						callback(err, top10Beiges);
					}
				});				
			}
		}
	});
}

exports.getTwoRandom = getTwoRandom;
exports.generate100Randoms = generate100Randoms;
exports.getDBEntries = getDBEntries;
exports.importBeigesToDB = importBeigesToDB;
exports.getTop10 = getTop10;