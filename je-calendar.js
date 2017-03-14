var JECalendar = (function(){

	var initialDate = moment();
	var dateToday = initialDate.format("D");

	function init(){				// initialize the table for plotting
		$("<div style='clear:both;'></div>").appendTo("#je-calendar");
		$("<table cellspacing='5px'></table>").appendTo("#je-calendar");
		$("<tr><td id='calprevious'>&lt</td><td colspan='5' id='calheader'>APril 2010</td><td id='calnext'>&gt;</td></tr>").appendTo("#je-calendar table");
		$("<tr><th>S</th><th>M</th><th>T</th><th>W</th><th>T</th><th>F</th><th>S</th></tr>").appendTo("#je-calendar table");

		for(var i = 0; i <= 7; i++){
			$("<tr><td class='caltiles'></td><td class='caltiles'></td><td class='caltiles'></td><td class='caltiles'></td><td class='caltiles'></td><td class='caltiles'></td><td class='caltiles'></td></tr>").appendTo("#je-calendar table");
		}

		$("#calprevious").on("click", gotoPrevious);
		$("#calnext").on("click", gotoNext);
		$("#calheader").on("click", gotoCurrent);

		plotCalendar();
	}

	function plotCalendar(){		// plot the calendar
		$("#calheader").html(initialDate.format("MMMM YYYY"));
		var selectedDate = parseInt(initialDate.format("D"));	// get the day of current month
		var firstDay = initialDate;								// pass initdate value
		var daysinmonth = firstDay.daysInMonth();				// get the total days of the selected month
		firstDay.subtract(selectedDate-1, "days");				// get the dayy of week of the fisrt day

		var ctr = 1, ctr2 = 1;
		$(".caltiles").each(function(){
			$(this).css("background", "#b7b7b7");
			$(this).html("&nbsp;");
		});
		$(".caltiles").each(function(){
			if(ctr >= parseInt(firstDay.format("d"))+1 && ctr2 <= parseInt(daysinmonth)){
				$(this).html(ctr2);
				if(ctr2 == parseInt(dateToday) && moment().format("YYYY-M") == initialDate.format("YYYY-M"))
				{
					$(this).css("fontWeight", "bold");
					$(this).css("background", "#23b45d");
				}
				else{
					$(this).css("fontWeight", "100");
				}
				ctr2++
			}
			else{
				$(this).css("background", "#757276");
			}
			ctr++;
		});
	}

	function gotoPrevious(){		// go to previous month
		initialDate.subtract(1, 'M');
		plotCalendar();
	}

	function gotoNext(){			// go to next month
		initialDate.add(1, 'M');
		plotCalendar();
	}

	function gotoCurrent(){			// go to current month
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
