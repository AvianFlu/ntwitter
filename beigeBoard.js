var beigeBoard = [];
var beigeCollection = [];

var beigeObj = function (hex) {
	return {
		rank: null,
		votes: 0,
		hex: hex,
		name: null,
		claimedBy: null
	}
}

/*
	If this beige NOT in collection then add it.
		Else increase the vote.

	If this beige NOT in board then add it. (the board isn't already full of beiges.)
		Else increase the vote.
		  - If it's got more votes then the bottom item

	Make sure the beigeboard only shows the top 10 beiges.
	 - Sort collection then take top 10?
	 - Or iterate over collection to get top 10?

	 -- Need to work out most efficient way of doing it.

*/

exports.add = function (hex) {

	console.log('Beige added');
	
	var indexOfBeigeCollection = find(hex, beigeCollection);
	//var indexOfBeigeBoard = find(hex, beigeBoard);

	if(index === -1) {
		var biege = new beigeObj(hex);
		beigeCollection.push(biege);
		//beigeBoard.push(biege);
	}
	else {
		beigeCollection[i].votes ++;
	}

	beigeBoard.sort(compare);
	
	// deletes item 10 (11) from the beige board so that only the top 10 are listed.
	if(beigeBoard.length > 10) {
		delete beigeBoard[10];
	}

	console.log(beigeBoard);
}

/*--------------------------------*/
// $result = query("SELECT COUNT(*) as noofent FROM 'tblname'");
// $numberOfBeiges = mysql_fetch_array($result);
// $selectedBeige = rand(0,$numberOfBeiges[noofent]);
// $result = query("SELECT * FROM 'tblname'
// 									LIMIT 1, '".$selectedBeige."'");


/*--------------------------------*/

function compare (a, b) {
  if (a.rank < b.rank)
     return -1;
  if (a.rank > b.rank)
    return 1;
  return 0;
}

function find (hex, array) {
	for (var i=0; i<array.length; i++) {
		if(array[i].hex === hex) {
			return i;
		}
	}
	return -1;
}

// Not sure about this one. Idea was to re-place an object within an array based on number of votes.
function place (obj, array) {
	for (var i=0; i<array.length; i++) {
		if(array[i].votes > obj.votes) {
			return i;
		}
	}
}