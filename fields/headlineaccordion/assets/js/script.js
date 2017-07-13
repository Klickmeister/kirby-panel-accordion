(function($) {
	$.fn.headlineaccordion = function() {

		return this.each(function() {
			var $field = $(this);
			var fieldname = 'headlineaccordion';
			var headlineSelector = '.field-with-headline';
			var page = window.location.href.split('/panel/pages/').pop().split('/edit').shift(); // assume that the page is located here: /panel/pages/%_page_%/edit

			if($field.data(fieldname)) {
				return true;
			}
			else {
				$field.data(fieldname, true);
			}

			var $headlines = $(headlineSelector);
			var headlineCounter = 1; // we'll start with 1 instead of 0 here, becuase of headline enumeration equality reasons...

			if($headlines.length) {
				$("fieldset.fieldset").addClass('contains-headlineaccordion');
			}

			// Wrap the content between headlines into a new element
			$headlines.each(function(index, el) {
				var $headline = $(el);
				var $trigger = $headline.find('h2').first();

				$headline.attr("id", "headline-" + headlineCounter);
				$trigger.attr('data-headline-id', headlineCounter);

				// Headline has been clicked
				$trigger.on('click', function(e) {
					var id = $(this).attr('data-headline-id');
					var $this = $(this);

					// make sure modals etc work when the panel gets a reload...
					if(history.replaceState) {
						history.replaceState(null, null, '?' + fieldname + '=' + id);
					}

					var cookie = {
						'page': page,
						'headline': id
					};

					document.cookie = fieldname + "=" + JSON.stringify(cookie) + ";path=/panel";

					// Hide other content-panels
					$('.headline-content').each(function(index, el) {
						// always show fields with errors
						if($(el).find('.field-with-error').length > 0) {
							$(el).show();
						}
						else {
							if($(el).attr('data-headline-content') == id) {
								$(el).show(300);
							}
							else {
								$(el).hide();
							}
						}
					});

					var scrolltop = $this.offset().top - $('.topbar').height();

					$(".mainbar").animate({
						scrollTop: $(".mainbar").scrollTop() + scrolltop
					});
				});

				var $headlineContent = $headline.nextUntil(headlineSelector);
				$headlineContent.wrapAll("<div class='headline-content headline-content-" + headlineCounter + "' data-headline-content='" + headlineCounter + "'></div>");

				headlineCounter++;
			});

			var activeHeadline = 1;
			var urlHeadline = getQueryVariable(fieldname);
			var cookieData = getCookieValue(fieldname);

			if(urlHeadline) {
				activeHeadline = urlHeadline;
			}
			else if(cookieData) {
				var cookieData = JSON.parse(cookieData);

				if(page == cookieData.page) {
					activeHeadline = cookieData.headline;
				}
			}

			// Trigger first element << url << cookie
			$('#headline-' + activeHeadline + " > h2").delay(1000).trigger('click');

		});
	};
})(jQuery);

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
	}

	return false;
}

function getCookieValue(a) {
  var b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
  return b ? b.pop() : '';
}
