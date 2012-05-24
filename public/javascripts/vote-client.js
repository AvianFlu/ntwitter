$(function() {
	$('.vote').click(function(e) {
		e.preventDefault();

		var hex = $(this).attr('data-hex');
		$.ajax({
			url: '/vote',
			data: {'hex': hex},
			type: 'post'
		}).done(function () {
			console.log('voted', hex);
		})	
	})
})

