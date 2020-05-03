$(function(){
  function addUser(user){
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div
      </div>
      `
      $("#user-search-result").append(html);
  }
  function addNoUser(){
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">ユーザーが見つかりません</p>
      </div>
      `
      $("#user-search-result").append(html);
  }
  function addDeleteUser(name, id){
    let html = `
      <div class="chat-group-user clearfix" id="${id}">
        <p class="chat-group-user__name">${name}</p>
        <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn"  data-user-id="${id}" data-user-name="${name}">削除</div>
      </div>
    `;
    $(".js-add-user").append(html);
  }
  function addMember(userId){
    let html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`;
    $(`#${userId}`).append(html);
  }
  function isInMember(user,ids){
    var rslt = true;
    ids.forEach(function(id){
      if(user.id == id)rslt = false;
    });
    return rslt;
  }


  $('#user-search-field').on('keyup',function(){
    var input = document.getElementById('user-search-field').value
    var userName=$(this)
    $.ajax({
      type: 'GET',
      url: '/users',
      dataType: 'json',
      data: {keyword: input}
    })
    .done(function(users){
      $("#user-search-result").empty();
      if(users.length != 0){
        var users_in_add_area = document.querySelectorAll('.js-add-user > .chat-group-user');
        var users_in_member = document.querySelectorAll('.js-chat-member > input');
        var userIds = new Array();
        users_in_add_area.forEach(function(item){
          userIds.push(item.getAttribute('id'));
        });
        users_in_member.forEach(function(item){
          userIds.push(item.getAttribute('value'));
        });
        users = users.filter(function(user){
          return isInMember(user,userIds);
        });
        users.forEach(function(user){
          addUser(user);
        });
      }else if (input.length == 0){
        return false;
      } else{
        addNoUser();
      }
    })
    .fail(function(){
      alert("通信エラーです。ユーザーが表示できません。")
    })
  })
  $(document).on('click',".chat-group-user__btn--add",function(){
    const userName= $(this).attr("data-user-name");
    const userId = $(this).attr("data-user-id");
    $(this).parent().remove();
    addDeleteUser(userName,userId);
    addMember(userId);
  })
  $(document).on('click','.chat-group-user__btn--remove',function(){
    $(this).parent().remove();
  });
});