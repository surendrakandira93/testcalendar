(function ($) {

    function Index() {
        var $this = this; $activeList = 'limonth'; activeLink = 'limonth'; $activeView = 2; $calendar = null; $selectedDate = new Date();
        function InitializeCalendar() {

            var Calendar = FullCalendar.Calendar;
            var calendarEl = document.getElementById('calendar');

            // initialize the external events
            // -----------------------------------------------------------------
            var date = new Date()
            var d = date.getDate(),
                m = date.getMonth(),
                y = date.getFullYear()

            $calendar = new Calendar(calendarEl, {
                headerToolbar: {
                    center: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
                    left: 'title',
                    right: 'prev,next today'
                },

                themeSystem: 'bootstrap',
                defaultDate: new Date(),
                navLinks: true, // can click day/week names to navigate views
                selectable: false,
                selectMirror: false,
                refetchResourcesOnNavigate: true,
                select: function (arg, view) {
                    
                    var allowdate = new Date();
                    allowdate.setDate(allowdate.getDate() - 1);
                    var startdate = moment(arg.startStr).format("MM/DD/YYYY");
                    var startTime = moment(arg.startStr).format("HH:mm:ss");
                },
               // slotDuration: '00:15:00',
                eventTimeFormat: { // like '14:30:00'
                    hour: 'numeric',
                    minute: '2-digit',
                    meridiem: 'short'
                },
                displayEventEnd: true,
                eventRender: function (event, element) {
                 
                    $(element).tooltip({ title: event.title });
                },
                editable: true,
                eventLimit: true,
                events: bindEvents(),

                eventClick: function (calEvent, jsEvent, view) {
                   
                    $selectedDate = calEvent.event.start;
                    var selecteddateValue = null;
                    if ($selectedDate == undefined || $selectedDate == '') { $selectedDate = null }
                    else { selecteddateValue = moment(new Date($selectedDate)).format('MM/DD/YYYY') }
                    var id = calEvent.event.groupId;
                    //if (id != 'block2' && id != 'avail1') {
                    //    $('.dynamicLinkEdit').remove();
                    //    $("body").append('<a class="dynamicLinkEdit" id="link" title="" data-toggle="modal" data-target="#modal-add-edit-appointment" data-backdrop="static"  href="' + domain + "users/manageappointment/AddAppointment/?startDate=" + selecteddateValue + "&id=" + id + '"> &nbsp</a>')
                    //    $('#link')[0].click();
                    //}

                },
            });

            $calendar.render();
            $calendar.gotoDate($selectedDate);

            $(document).off("click", ".fc-timeGridDay-button").on("click", ".fc-timeGridDay-button", function (event) {
                refreshCalendar();
            });

            $(document).off("click", ".fc-timeGridWeek-button").on("click", ".fc-timeGridWeek-button", function (event) {
                refreshCalendar();
            });

            $(document).off("click", ".fc-dayGridMonth-button").on("click", ".fc-dayGridMonth-button", function (event) {
                refreshCalendar();
            });

            $(document).off("click", ".fc-prev-button").on("click", ".fc-prev-button", function (event) {
                refreshCalendar();
            });

            $(document).off("click", ".fc-next-button").on("click", ".fc-next-button", function (event) {
                refreshCalendar();
            });

            $(document).off("click", ".fc-today-button").on("click", ".fc-today-button", function (event) {
                refreshCalendar();
            });

            $("#txt_date").change(function () {
                var date = $(this).val();
                $calendar.gotoDate(date);
                refreshCalendar();
            });

            // fc-prev-button
        }

        function getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        function getRandomDate(from, to) {
            from = from.getTime();
            to = to.getTime();
            return new Date(from + Math.random() * (to - from));
        }

        function bindEvents() {
            var date = new Date()
            var d = date.getDate(),
                m = date.getMonth(),
                y = date.getFullYear()

            var arr = [
                {
                    title: 'All Day Event',
                    start: new Date(y, m, 1),
                    backgroundColor: '#f56954', //red
                    borderColor: '#f56954' //red
                   
                },
                {
                    title: 'Long Event',
                    start: new Date(y, m, d - 5),
                    end: new Date(y, m, d - 2),
                    backgroundColor: '#f39c12', //yellow
                    borderColor: '#f39c12' //yellow
                },
                {
                    title: 'Meeting',
                    start: new Date(y, m, d, 10, 30),
                  
                    backgroundColor: '#0073b7', //Blue
                    borderColor: '#0073b7' //Blue
                },
                {
                    title: 'Lunch',
                    start: new Date(y, m, d, 12, 0),
                    end: new Date(y, m, d, 14, 0),
                  
                    backgroundColor: '#00c0ef', //Info (aqua)
                    borderColor: '#00c0ef' //Info (aqua)
                },
                {
                    title: 'Birthday Party',
                    start: new Date(y, m, d + 1, 19, 0),
                    end: new Date(y, m, d + 1, 22, 30),
                 
                    backgroundColor: '#00a65a', //Success (green)
                    borderColor: '#00a65a' //Success (green)
                },
                {
                    title: 'Click for Google',
                    start: new Date(y, m, 28),
                    end: new Date(y, m, 29),
                    url: 'https://www.google.com/',
                    backgroundColor: '#3c8dbc', //Primary (light-blue)
                    borderColor: '#3c8dbc' //Primary (light-blue)
                }
            ];
            return arr;


        }

        function bindEvents1() {
            var date = new Date()
            var ss = $calendar.getCurrentData().dateProfile.activeRange;
            var vie = $calendar.getCurrentData().currentViewType;            
            var arr = [];
            let noOfDay = 1;
            let interval = 30;
            if (vie == 'dayGridMonth') {
                noOfDay = 60;
                interval = (Math.random()*(1440-10));
            } else
                if (vie == 'timeGridWeek') {
                    noOfDay = 10;
                    interval = 90;
                } else {
                    noOfDay = 5;
                    interval = 30;
                }

            for (var i = 0; i < noOfDay; i++) {
                var d1 = getRandomDate(ss.start, ss.end);
                var d2 = new Date(d1);
                d2.setMinutes(d1.getMinutes() + interval);
                var colorCode = getRandomColor();
                arr.push({
                    title: `Title Event ${d1.getDate()} - ${d2.getDate()}`,
                    start: d1,
                    end: d2,                   
                    backgroundColor: colorCode, //yellow
                    borderColor: colorCode //yellow                        
                });
            }

            return arr;


        }


        function refreshCalendar() {
            $selectedDate = $calendar.getDate();

            var source = $calendar.getEventSources();
            source[0].remove();
            source[0].refetch();
            $calendar.addEventSource(bindEvents1());
        }


        this.init = function () {

            InitializeCalendar();
            $(".fc-dayGridMonth-button").trigger("click");
            // $('#limonth').addClass("active");

        }
    }


    $(function () {

        var self = new Index();
        self.init();

    })    

})(jQuery)
