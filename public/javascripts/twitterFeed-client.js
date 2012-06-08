/* twitterFeed-client.js */
$(function() {
	var socket = io.connect('http://localhost:3001');
	socket.on('latestTweet', function (data) {
		var tweetContainer = $('#tweet');
		//console.log(tweetContainer, data);

		tweetContainer.children('span').html(data.name);
		tweetContainer.children('p').html(data.text);
		tweetContainer.children('.img_wrapper').children('img').attr('src',data.profile_pic);
	})
})