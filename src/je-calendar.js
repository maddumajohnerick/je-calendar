var JECalendar = (function(){

	var initialDate = moment();
	var dateToday = initialDate.format("D");

	/* ----------------------------------------------------------
	 * INITIALIZE CALENDAR TABLE
	 * -------------------------------------------------------- */
	function init(){
		var daysHeader = $("<tr></tr>");
		var days = ["S", "M", "T", "W", "T", "F", "S"];

		$("<div style='clear:both;'></div>").appendTo("#je-calendar");
		$("<table cellspacing='5px'></table>").appendTo("#je-calendar");
		$("<tr><td id='calprevious'>&lt</td><td colspan='5' id='calheader'>APril 2010</td><td id='calnext'>&gt;</td></tr>").appendTo("#je-calendar table");

		// setup calendar header
		for (var h = 0; h < 7; h++) {
			$("<th>"+ days[h] +"</th>").appendTo(daysHeader);
		}
		$(daysHeader).appendTo("#je-calendar table");

		// setup the tiles for days
		for(var i = 0; i <= 7; i++){
			var row = $("<tr></tr>");
			for (var j = 0; j < 7; j++) {
				$("<td class='caltiles'></td>").appendTo(row);
			}
			$(row).appendTo("#je-calendar table");
		}

		// add listeners for specific parts
		$("#calprevious").on("click", gotoPrevious);
		$("#calnext").on("click", gotoNext);
		$("#calheader").on("click", gotoCurrent);

		plotCalendar();
	}

	/* ----------------------------------------------------------
	 * PLOTS THE DATES ON THE CALENDAR
	 * -------------------------------------------------------- */
	function plotCalendar(){
		$("#calheader").html(initialDate.format("MMMM YYYY"));
		// get the current date
		var selectedDate = parseInt(initialDate.format("D"));
		// get the day of the 1st of the month
		var firstDay = initialDate.subtract(selectedDate-1, "days");
		// get the total days of the selected month
		var daysinmonth = firstDay.daysInMonth();

		var ctr = 1, ctr2 = 1;
		$(".caltiles").each(function(){
			$(this).removeClass("tile-active");
			$(this).removeClass("tile-filled");
			$(this).removeClass("tile-empty");
			$(this).html("&nbsp;");
		});
		$(".caltiles").each(function(){
			// fill tiles with dark gray if not between said dates
			if(ctr >= parseInt(firstDay.format("d"))+1 && ctr2 <= parseInt(daysinmonth)){
				$(this).html(ctr2);
				// fill tiles with green if date and matches current
				if(ctr2 == parseInt(dateToday) && moment().format("YYYY-M") == initialDate.format("YYYY-M"))
				{
					$(this).addClass("tile-active");
				}
				else{
					$(this).addClass("tile-filled");
				}
				ctr2++
			}
			else{
				$(this).addClass("tile-empty");
			}
			ctr++;
		});
	}

	// go to previous month
	function gotoPrevious(){
		initialDate.subtract(1, 'M');
		plotCalendar();
	}

	// go to next month
	function gotoNext(){
		initialDate.add(1, 'M');
		plotCalendar();
	}

	// go to current month
	function gotoCurrent(){
		initialDate = moment();
		plotCalendar();
	}


	var publicAPI = {
		init: init,
		prevMonth: gotoPrevious,
		nextMonth: gotoNext
	}

	return publicAPI;
})();
