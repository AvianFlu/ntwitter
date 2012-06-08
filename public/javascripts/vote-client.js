$(function() {
	$('.vote').click(function(e) {
		e.preventDefault();

		var hex = $(this).attr('data-hex');
		$.ajax({
			url: '/vote',
			data: {'hex': hex},
			type: 'post'
		}).done(function (data) {
			console.log(data);
			console.log('voted', hex);

			if(data.voted === false) {
				console.log('Vote not counted');
			}
			else {
				window.location = '/';
			}
		})	
	})
})

