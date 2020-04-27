$(function(){

  var reloadMessages = function(){
    var last_message_id = $('.chat-main__message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      if(messages.length !== 0){
        console.log('success');
        var insertHTML = '';
        $.each(messages, function(i, message){
          insertHTML += buildHTML(message)
        });
        $('.chat-main__messages').append(insertHTML);
        $(".chat-main__messages").animate({scrollTop: $('.chat-main__messages')[0].scrollHeight});
      }
    })
    .fail(function(){
      alert('error');
    });
  };

  function buildHTML(message){
    if (message.image.url != null){
      var html = `<div class ="chat-main__message" data-message-id=${message.id}>
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
      var html = `<div class ="chat-main__message" data-message-id=${message.id}>
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
      $("#new_message")[0].reset();
      $(".chat-main__messages").animate({scrollTop: $('.chat-main__messages')[0].scrollHeight});
      $(".chat-main__footer-send-btn").prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
      $(".chat-main__footer-send-btn").prop('disabled', false);
    });
  });
  if(document.location.href.match(/\/groups\/\d+\/messages/)){
    setInterval(reloadMessages, 7000);
  }
});