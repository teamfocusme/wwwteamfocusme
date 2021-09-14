(function($) {
	$("[name='tfsignup']").ready( function() {
		console.log('ready for everything');
		var tz = getTimezone();
		$("[name='tfsignup_timezone']").val(tz);

//		if ($('.tfsignup_email_error').html().length) {
//			$('.tfsignup_email_error').show();
//		}
//		else tfsignup_popup($("[name='tfsignup_register_error']"), {});	//only shows if non-empty

		$("[name='tfsignup_email']").on("keyup", function(e) {
			var tfsignup = $(this).parents("[name='tfsignup']");
			tfsignup.find('.tfsignup_register_error').hide();
			if (/^([a-zA-Z0-9_']([a-zA-Z0-9\-_\.'\+]+)?(@([a-zA-Z0-9]+([a-zA-Z0-9\-\.]+)?)?)?)$/i.test($(this).val())) {	//this regex is different to final regex because it allows the email address to be built (but it's not 100% accurate, so still need to check the final address)
				tfsignup.find('.tfsignup_email_error').hide();
			}
			else {
				tfsignup.find('.tfsignup_email_error').html('invalid email address').show();
			}
		});
		
		$("[name='tfsignup_form']").on('submit', function(e){
			
			var tfsignup = $(this).parents("[name='tfsignup']");
			if (tfsignup.find('.tfsignup_email_error').is(':visible')) {
				tfsignup.find('.tfsignup_email_error').html('please enter your email address').show();
				//tfsignup.find('.tfsignup_email_error').hide();
				return false;
			}
			if (/^([a-zA-Z0-9_']+([a-zA-Z0-9\-_\.'\+]+)?@[a-zA-Z0-9]+([a-zA-Z0-9\-\.]+)?\.[a-zA-Z]{2,5})$/i.test(tfsignup.find("[name='tfsignup_email']").val())) {}
			else {
				tfsignup.find('.tfsignup_email_error').html('please enter a valid email address').show();
				//tfsignup.find('.tfsignup_email_error').hide();
				return false;
			}

			var args = {action: 'tfsignup_register'};
			tfsignup.find("input[name^='tfsignup_']").each(function(i,fld){
				if (fld.value.length)
					args[fld.name] = fld.value;
			});
			
			$.ajax({
				url: tfajaxurl,
				dataType: 'json',
				data: args,
				timeout: 60000,
				type: 'POST',
				beforeSend: function (jqXHR) {
					
					tfsignup.find("[name='tfsignup_register_error']").hide();
					tfsignup.find('.tfsignup_email_error').hide();
					tfsignup.find("[name='tfsignup_buttons']").hide();
					tfsignup.find('.tfsignup_spinny').show();
					tfsignup.find('.tfsignup_spinny img').css("padding-top", ((tfsignup.find('.tfsignup_spinny').height()-tfsignup.find('.tfsignup_spinny img').height())/2)+"px");					
				},
				success: function (data) {
						
					tfsignup.find("[name='tfsignup_buttons']").show();
					tfsignup.find('.tfsignup_spinny').hide();
					
					//data = JSON.parse(data);
					if (data.result === true) {
						tfsignup_popup(tfsignup.next("[name='tfsignup_thanks']"), data);
						$("[name='tfsignup_email']").val('');
						
						_gaq.push(['_trackEvent', 'TFSignup', 'submit']);
						_gaq.push(['_trackPageview', '/plugin/tfsignup/tfsignup.php']);
					}
					else {
						if (data["error_message"].hasOwnProperty('error_register')) {
							tfsignup.find('[name="tfsignup_register_error"]').html(data["error_message"]['error_register']);
							tfsignup_popup(tfsignup.find("[name='tfsignup_register_error']"), data);
							if (data["error_message"].hasOwnProperty('Location')) location.href = data["error_message"]["Location"];
						}
						else if (data["error_message"].hasOwnProperty('error_email'))tfsignup.find('.tfsignup_email_error').html(data["error_message"]['error_email']).show();
	
						_gaq.push(['_trackEvent', 'TFSignup', 'fail', tfsignup.parents('[id]:first').attr('id')]);
					}
				},
				complete: function (jqXHR, status) {
					
				},
				error: function (jqXHR, textStatus, errorThrown) {
					
				}
			});
			
			/*$.post(tfajaxurl, args, function(response) {
				
				tfsignup.find("[name='tfsignup_buttons']").show();
				tfsignup.find('.tfsignup_spinny').hide();

				var data = JSON.parse(response);
				if (data.result === true) {
					tfsignup_popup(tfsignup.next("[name='tfsignup_thanks']"), data);
					$("[name='tfsignup_email']").val('');
					console.log('_trackEvent'+ 'TFSignup'+ 'submit'+ tfsignup.parents('[id]:first').attr('id'));
					_gaq.push(['_trackEvent', 'TFSignup', 'submit', tfsignup.parents('[id]:first').attr('id')]);
					_gaq.push(['_trackPageview', '/plugin/tfsignup/tfsignup.php']);
				}
				else {
					if (data["error_message"].hasOwnProperty('error_register')) {
						tfsignup.find('[name="tfsignup_register_error"]').html(data["error_message"]['error_register']);
						tfsignup_popup(tfsignup.find("[name='tfsignup_register_error']"), data);
						if (data["error_message"].hasOwnProperty('Location')) location.href = data["error_message"]["Location"];
					}
					else if (data["error_message"].hasOwnProperty('error_email'))tfsignup.find('.tfsignup_email_error').html(data["error_message"]['error_email']).show();

					console.log('_trackEvent'+ 'TFSignup'+ 'fail'+ tfsignup.parents('[id]:first').attr('id'));
					_gaq.push(['_trackEvent', 'TFSignup', 'fail', tfsignup.parents('[id]:first').attr('id')]);
				}
			});
			tfsignup.find("[name='tfsignup_register_error']").hide();
			tfsignup.find('.tfsignup_email_error').hide();
			tfsignup.find("[name='tfsignup_buttons']").hide();
			tfsignup.find('.tfsignup_spinny').show();
			tfsignup.find('.tfsignup_spinny img').css("padding-top", ((tfsignup.find('.tfsignup_spinny').height()-tfsignup.find('.tfsignup_spinny img').height())/2)+"px");*/
			return false;
		});

		$("[name='tfsignup']").each(function() {
			//console.log($(this).find('input[type=submit]:first').css(["height","width","margin-top", "margin-left", "margin-bottom","margin-right"]));
			//$(this).find('.tfsignup_spinny').css($(this).find('input[type=submit]:first').css(["height","width","margin-top", "margin-left", "margin-bottom","margin-right"]));
		});
		//console.log($(window).width()+" "+$(window).height()+" "+$(window)[0].innerHeight+" "+$(window)[0].innerWidth);
		if ($('#tfsignup_mask').length == 0) $('.container.scroll_container').append('<div id="tfsignup_mask" style="display:none"></div>');
	});

	function tfsignup_popup(popupDiv, data) {
		
		if (popupDiv.length == 0) return;	//no response required
		
		$('#tfsignup_mask').show();

		var data_div = popupDiv.attr('data-div');
		if (data_div.length) {
			// thanks div overlays data-div
			var dataDiv = $(data_div);
			if (dataDiv.css("position") != 'absolute') dataDiv.css("position", "relative");
			var size = {"width": dataDiv.width()+parseInt(dataDiv.css('padding-left'))+parseInt(dataDiv.css('padding-right')), "height": dataDiv.height()+parseInt(dataDiv.css('padding-top'))+parseInt(dataDiv.css('padding-bottom'))};
			popupDiv.height(size.height);
			popupDiv.width(size.width);
		}
		else {
			//popupDiv.appendTo('body');
			//var size = {"width": popupDiv.width(), "height": popupDiv.height()};
			//var pos = {"left": ($(window)[0].innerWidth-size.width)/2, "top": ($(window)[0].innerHeight-size.height)/2};
			//if (pos.left < 30) pos.left = 30;
			//if (pos.top < 30) pos.top = 30;
			//popupDiv.css("top", pos.top);
			//popupDiv.css("left", pos.left);
		}
		//popupDiv.height(size.height);
		//popupDiv.width(size.width);
			
		//popupDiv.html(popupDiv.html().replace('#email#', data.tfsignup_email));
		popupDiv.show();
		popupDiv.append('<span name="tfsignup_close" class="icon-remove"></span>');
		
		popupDiv.find('[name="tfsignup_close"]').on('click touchend', function(e) {
			console.log('clicking jhide of thanks div');
			popupDiv.hide();
			$('#tfsignup_mask').hide();
			if (data_div.length == 0) {
				console.log('no data div pop = null');
				popupDiv.html('');
			} 
		});
	}
})(jQuery);

function getTimezone() {
	var d = new Date();
	var tz = d.getTimezoneOffset();
	tz = tz * -60;
	//console.log('timezone='+tz);
	return tz;
}
