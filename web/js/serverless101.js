/* Logout */
$("#logout").click(function(){
    window.location = './index.html';
});

$(document).on('click', '.allow-user', function(){
    var email = ($(this).parent().parent().parent().find("td:eq(2)").text()).trim();
    var isyes = confirm('Are you sure, you want to allow user?');
    var allowuserurl = 'https://jthp9bhj27.execute-api.ap-south-1.amazonaws.com/serverless101/allowuser';

    var obj = new Object();
    obj.email = email;

    var jsonObj = JSON.stringify(obj);

    if(isyes) {
        $.ajax({
            url: allowuserurl,
            headers: {"Content-Type": "application/json"},
            type: 'PUT',
            data: jsonObj,
            dataType: 'json',
            async: false,
            success: function(data)
            {
                if(data['result']==="success")
                {
                    return true;
                }
            }
        });
    }
    else {
       return false;
    }
})

$(document).on('click', '.block-user', function(){
    var email = ($(this).parent().parent().parent().find("td:eq(2)").text()).trim();
    var isyes = confirm('Are you sure, you want to block user?');
    var blockuserurl = 'https://jthp9bhj27.execute-api.ap-south-1.amazonaws.com/serverless101/blockuser';
    var obj = new Object();
    obj.email = email;

    var jsonObj = JSON.stringify(obj);

    if(isyes) {
        $.ajax({
            url: blockuserurl,
            headers: {"Content-Type": "application/json"},
            type: 'PUT',
            data: jsonObj,
            dataType: 'json',
            async: false,
            success: function(data)
            {
                if(data['result']==="success")
                {
                    return true;
                }
            }
        });
    }
    else {
       return false;
    }
})

/* Show Active Users */
function showactiveusers() {
    var activeusersurl = 'https://jthp9bhj27.execute-api.ap-south-1.amazonaws.com/serverless101/activeusers';

    $.ajax({
        url: activeusersurl,
        type: 'GET',
        dataType: 'html',
        async: false,
        success: function(data)
        {
            var result = $.parseJSON(data);
            userinfo = result['users'];
            htmlcode = "";

            for(i=0; i<userinfo.length; i++){
                htmlcode += '<tr><td>'+ (i+1) + '</td><td>' + userinfo[i]['FullName'] +
                    '</td><td>' + userinfo[i]['EmailAddress'] +
                    '</td><td>' + userinfo[i]['Location'] +
                    '</td><td>' + userinfo[i]['Comments'] +
                    '</td><td><div class="tooltip"><span class="tooltiptext">Block</span><a href="" class="block-user" style="color:green;"><span class="fa fa-ban"></span></a></div></td></tr>';
            }
            $('#users-list tbody').html(htmlcode);
        }
    });
}

/* Show Blocked Users */
function showblockedusers() {
    var blockedusersurl = 'https://jthp9bhj27.execute-api.ap-south-1.amazonaws.com/serverless101/blockedusers';

    $.ajax({
        url: blockedusersurl,
        type: 'GET',
        dataType: 'html',
        async: false,
        success: function(data)
        {
            var result = $.parseJSON(data);
            userinfo = result['users'];
            htmlcode = "";

            for(i=0; i<userinfo.length; i++){
                htmlcode += '<tr><td>'+ (i+1) + '</td><td>' + userinfo[i]['FullName'] +
                    '</td><td>' + userinfo[i]['EmailAddress'] +
                    '</td><td>' + userinfo[i]['Location'] +
                    '</td><td>' + userinfo[i]['Comments'] +
                    '</td><td><div class="tooltip"><span class="tooltiptext">Allow</span><a href="" class="allow-user" style="color:green;"><span class="fa fa-check"></span></a></div></td></tr>';
            }
            $('#users-list tbody').html(htmlcode);
        }
    });
}

/* Login */
function login(authdetails)
{
	var result = null;
    if((authdetails.email) && (authdetails.password))
    {
        $("#error").css('visibility', 'hidden');
        passwordValue = SHA256(authdetails.password)
        //API Endpoint - Replace this with endpoint you created
        loginurl = 'https://jthp9bhj27.execute-api.ap-south-1.amazonaws.com/serverless101/login';
        var obj = new Object();
        obj.email = authdetails.email;
        obj.password = passwordValue;

        var jsonObj = JSON.stringify(obj);
        $.ajax({
            url: loginurl,
            headers: {"Content-Type": "application/json"},
            type: 'POST',
            data: jsonObj,
            dataType: 'json',
            success: function(result)
            {
                loginsuccess = result['result'];
                if(loginsuccess === true){
                    uid = result['uid']
                    window.location = './activeusers.html';
                } else {
                    $("#error").text("Invalid credentials or user blocked");
                    $("#error").css('visibility', 'visible');
                }
            },
        });
    }
}

/* Login Register */
function loginregister(loginregister) {
	if((loginregister.email) && (loginregister.password) && (loginregister.fullname) && (loginregister.comments) && (loginregister.location))
    {
        passwordValue = SHA256(loginregister.password)
        //API Endpoint - Replace this with endpoint you created
        loginregisterurl = 'https://jthp9bhj27.execute-api.ap-south-1.amazonaws.com/serverless101/loginregister';
        var obj = new Object();
        obj.fullname = loginregister.fullname;
        obj.email = loginregister.email;
        obj.password = passwordValue;
        obj.location = loginregister.location;
        obj.comments = loginregister.comments;

        var jsonObj = JSON.stringify(obj);
        $.ajax({
            url: loginregisterurl,
            headers: {"Content-Type": "application/json"},
            type: 'POST',
            data: jsonObj,
            dataType: 'json',
            success: function(resp)
            {
                loginregistersuccess = resp['result'];
                if(loginregistersuccess === true){
                    $("#error").text('Your login registration is successful.').css({'visibility':'visible','color':'green'});
                    $("#error").css('visibility', 'visible');
                    setTimeout(function(){ window.location = './index.html'; }, 5000);
                }
                else if(loginregistersuccess === false){
                    $("#error").text('User already exists with this Email Address.').css('visibility','visible');
                    $("#error").css('visibility', 'visible');
                }
            },
        });
    }
}
