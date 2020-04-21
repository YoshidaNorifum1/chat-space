$(function(){
  function buildHTML(message){
      debugger;
    if (message.image.url != null){
      var html = `<div class ="chat-main__message">
                    <div class="chat-main__message-header">
                      <div class="chat-main__message-header-name">
                      ${message.user_name}
                      </div>
                      <div class="chat-main__message-header-date">
                      ${message.created_at}
                      </div>
                    </div>
                    <div class="chat-main__message-content">
                      <div class="chat-main__message-content-text">
                      ${message.content}
                      </div>
                      <img src="${message.image.url}" class="chat-main__message-content-image">
                    </div>
                  </div>` 
    }else{
      var html = `<div class ="chat-main__message">
                    <div class="chat-main__message-header">
                      <div class="chat-main__message-header-name">
                      ${message.user_name}
                      </div>
                      <div class="chat-main__message-header-date">
                      ${message.created_at}
                      </div>
                    </div>
                    <div class="chat-main__message-content">
                      <div class="chat-main__message-content-text">
                      ${message.content}
                      </div>
                    </div>
                  </div>` 
    }
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $(".chat-main__messages").append(html);
    })
  });
});