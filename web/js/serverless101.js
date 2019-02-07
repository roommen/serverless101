/* Show Active Users */
function showactiveusers() {
    //get userid from browser local storage
    // var user_id = localStorage.getItem("user_id");
    //API Endpoint - Replace this with endpoint you created
    var activeusersurl = ' https://123abcdef789.execute-api.ap-south-1.amazonaws.com/lambda101/users';

    $.ajax({
        url: activeusersurl,
        type: 'GET',
        // data : {"user_id" : user_id},
        dataType: 'html',
        async: false,
        success: function(data)
        {
            var result = $.parseJSON(data);
            userinfo = result['values'];
            htmlcode = "";

            htmlcode += '<td>' + userinfo['name'] +
                    '</td><td>' + userinfo['email'] + '</td><td>' + userinfo['location'] + '</td><td>' + userinfo['comments']
                    '</td><td><span style="color:#4ef71b;text-align:center;" class="fa fa-circle"></span>' +
                    '</td><td><div class="tooltip"><span class="tooltiptext">Block</span><a href="" class="block-user" style="color:red;"><span class="fa fa-ban"></span></a></div></td></tr>';

            $('#users-list tbody').html(htmlcode);
        }
    });
}

/* Show Blocked Users */
function showblockedusers() {

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
        loginurl = 'https://123abcdef789.execute-api.ap-south-1.amazonaws.com/lambda101/login';
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

/* Login Registration */
function loginregistration(loginregistration) {
	if((loginregistration.email) && (loginregistration.password) && (loginregistration.name) && (loginregistration.comments) && (loginregistration.location))
    {
        passwordValue = SHA256(login_registration.password)
        //API Endpoint - Replace this with endpoint you created
        loginregistrationurl = 'https://123abcdef789.execute-api.ap-south-1.amazonaws.com/lambda101/register-login';
        var obj = new Object();
        obj.name = loginregistration.name;
        obj.email = loginregistration.email;
        obj.password = passwordValue;
        obj.location = loginregistration.location;
        obj.comments = loginregistration.comments;

        var jsonObj = JSON.stringify(obj);
        $.ajax({
            url: loginregistrationurl,
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
