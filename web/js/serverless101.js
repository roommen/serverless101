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
                // console.log(userinfo[i]['FullName']);
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
                // console.log(userinfo[i]['FullName']);
                htmlcode += '<tr><td>'+ (i+1) + '</td><td>' + userinfo[i]['FullName'] +
                    '</td><td>' + userinfo[i]['EmailAddress'] +
                    '</td><td>' + userinfo[i]['Location'] +
                    '</td><td>' + userinfo[i]['Comments'] +
                    '</td><td><div class="tooltip"><span class="tooltiptext">Allow</span><a href="" class="block-user" style="color:green;"><span class="fa fa-check"></span></a></div></td></tr>';
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
            type: 'POST',
            data: jsonObj,
            dataType: 'json',
            success: function(result)
            {
                loginsuccess = result['result'];
                //store userid in browser local storage
                // if (typeof(Storage) !== "undefined") {
                //     localStorage.setItem("user_id", result['uid']);
                // }

                if(loginsuccess === true){
                    uid = result['uid']
                    window.location = './activeusers.html';
                }else{
                    $("#error").text("*Invalid credentials");
                    $("#error").css('visibility', 'visible');
                }
            },
        });
    }
}

/* Login Register */
function loginregister(loginregister) {
    console.log("hello");
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
        console.log(jsonObj);
        $.ajax({
            url: loginregisterurl,
            headers: {"Content-Type": "application/json"},
            type: 'POST',
            data: jsonObj,
            dataType: 'json',
            success: function(resp)
            {
                loginsuccess = resp['result'];
                if(loginsuccess === true){
                    $("#error").text('Your login registration successful. You may now login.').css({'visibility':'visible','color':'green'});;
                    setTimeout(function(){ window.location = './index.html'; }, 5000);
                }
                else if(loginsuccess === false){
                    $("#error").text('Error : User already exists with this Email Address.').css('visibility','visible');
                }
            },
        });
    }
}
