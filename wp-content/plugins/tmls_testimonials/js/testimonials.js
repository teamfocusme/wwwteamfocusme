(function($){
$(window).ready(function(){
	
	/*======================== Slider ========================*/
	
	tmls_sliders = $('.tmls_slider');
	tmls_style3_names = $('.style3 .tmls_name');
	tmls_visible_slider_buttons = $('.tmls_next_prev.tmls_visible');

	if (tmls_sliders.length )
	{
		tmls_sliders.each(function(){
			
			tmls_slider_play($(this));
			
			$(this).parent().parent().mouseenter(function(){
				$(this).children('.tmls_show_on_hover').slideToggle();
			});
			
			$(this).parent().parent().mouseleave(function(){
				$(this).children('.tmls_show_on_hover').slideToggle();
			});
			
		});
		
		tmls_visible_slider_buttons.fadeIn();
		
		$(window).resize(function() {
			tmls_sliders.each(function(){
				tmls_slider_play($(this));
			});
		});

		
	}
	
	if(tmls_style3_names.length) {
		tmls_style3_names.each(function(){
			$(this).css('padding-top', ($(this).parent().height()/2) - (($(this).height()+ 2.5 + $(this).parent().children('.tmls_position').height())/2));
		});
	}
		
});

$(window).load(function(){
	tmls_sliders.each(function(){
		tmls_slider_play($(this));
	});
});

function tmls_slider_play(tmls_slider) {
	
	tmls_slider.carouFredSel({
		responsive: true,
		width:'variable',
		height:'variable',
		prev: {
			button: function() {
				return $(this).parents().children(".tmls_next_prev").children(".tmls_prev");
			}
		},
		next: {
			button: function() {
				return $(this).parents().children(".tmls_next_prev").children(".tmls_next");
			}
		},
		scroll: {
			items:1,          
			duration: tmls_slider.data('scrollduration'),
			fx:'crossfade'
		},
		auto: {
			play: tmls_slider.data('autoplay'),
			pauseDuration:tmls_slider.data('pauseduration'),
			pauseOnHover:tmls_slider.data('pauseonhover')
		},
		items: {
			width:700
		}
				
	});
			
}

}) (jQuery);