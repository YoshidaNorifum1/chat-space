$(function(){
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    formData = new FormData(this);
    url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
  });
});