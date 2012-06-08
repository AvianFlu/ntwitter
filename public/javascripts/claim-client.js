$(function() {
	$('.claim').click(function(e) {
		e.preventDefault();

		var hex = $(this).attr('data-hex');
		$.ajax({
			url: '/claim-a-beige',
			data: {'hex': hex},
			type: 'post'
		}).done(function () {
			console.log('claimed', hex);
		})	
	})
})