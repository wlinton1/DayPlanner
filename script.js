  const thisDate = moment().format('MMMM Do YYYY');

  let thisHour = moment().format();

  let dateHeader = $('#navbar-subtitle');
  dateHeader.text(thisDate);

  function updateRowColor(hourRow, hour) {

  if (hour < thisHour) {
    hourRow.css("background-color", "grey")
  } else if (hour > thisHour) {
    hourRow.css("background-color", "green")
  } else {
    hourRow.css("background-color", "red")
  }
};

  let storedInfo = JSON.parse(localStorage.getItem("stored"));

  $(document).on('click', 'i', function (event) {
  event.preventDefault();

  let $index = $(this).attr('save');

  let inputId = '#input-' + $index;
  let $value = $(inputId).val();

  TextArray[$index] = $value;

  localStorage.setItem("stored", JSON.stringify(TextArray));
});

  if (storedInfo !== null) {
    TextArray = storedInfo;
  } else {
    TextArray = new Array(9);
  }

  let schedulerDiv = $('#schedulerContainer');
  schedulerDiv.empty();

  for (let hour = 9; hour <= 17; hour++) {

    let index = hour - 9;
    let timeDiv = $('<div>');
    timeDiv.addClass('row');
    timeDiv.addClass('schedulerRow');
    timeDiv.attr('hr-index', hour);

    let tmDiv = $('<div>');
    tmDiv.addClass('col-md-2');

    const timeSpan = $('<span>');
    timeSpan.attr('class', 'time');

    let displayHour = 0;
    let ampm = "";
    if (hour > 12) {
      displayHour = hour - 12;
      ampm = "pm";
    } else {
      displayHour = hour;
      ampm = "am";
    }

    timeSpan.text(`${displayHour} ${ampm}`);
    timeDiv.append(tmDiv);
    tmDiv.append(timeSpan);

    let scheduleSpan = $('<input>');

    scheduleSpan.attr('id', `input-${index}`);
    scheduleSpan.attr('hr-index', index);
    scheduleSpan.attr('type', 'text');
    scheduleSpan.attr('class', 'schedulePlan');

    scheduleSpan.val(TextArray[index]);

    let inputDiv = $('<div>');
    inputDiv.addClass('col-md-8');
    timeDiv.append(inputDiv);
    inputDiv.append(scheduleSpan);

    let saveDiv = $('<div>');
    saveDiv.addClass('col-md-2');

    let saveBtn = $('<i>');
    saveBtn.attr('id', `save-${index}`);
    saveBtn.attr('save', index);
    saveBtn.attr('class', "far fa-save saveIcon");
    
    timeDiv.append(saveDiv);
    saveDiv.append(saveBtn);

    updateRowColor(timeDiv, hour);

    schedulerDiv.append(timeDiv);
  };

  $(document).on('change', 'input', function (event){
    event.preventDefault();

    let i = $(this).attr('hr-index');
  });