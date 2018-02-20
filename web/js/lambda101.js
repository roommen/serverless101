/* Show User Info */
function showUserInfo(){
    var user_id = localStorage.getItem("snauth_user_id");
    var info_url = 'https://arnid.execute-api.ap-south-1.amazonaws.com/lambda101/UserInfo?uid=' + user_id;

    // var obj = new Object();
    // obj.username = username;
    // var jsonObj = JSON.stringify(obj);

    $.ajax({
        url: info_url,
        type: 'GET',
        data: jsonObj,
        dataType: 'html',
        async: false,
        success: function(data)
        {
            var result = $.parseJSON(data);
            users = result['result'];
            html_code = "";

            for(i=0;i<users.length;i++){
                html_code += '<tr><td>'+ (i+1) + '</td><td>' + users[i]['FullName'] +
                        '</td><td>' + users[i]['Email_Address'] + '</td><td>' + users[i]['Comments'] +
                        '</td><td><span style="color:#4ef71b;text-align:center;" class="fa fa-circle"></span>' +
                        '</td><td><div class="tooltip"><span class="tooltiptext">Block</span><a href="" class="block-user" style="color:red;"><span class="fa fa-ban"></span></a></div></td></tr>';
            }

            $('#users-list tbody').html(html_code);
        }
    });
}

/* Login */
function login(auth_details)
{
	var result = null;
    if((auth_details.email) && (auth_details.password))
    {
        $("#error").css('visibility', 'hidden');
        passwordValue = SHA256(auth_details.password)
        login_url = 'https://arnid.execute-api.ap-south-1.amazonaws.com/lambda101/Login';
        var obj = new Object();
        obj.email = auth_details.email;
        obj.password = passwordValue;

        var jsonObj = JSON.stringify(obj);

        $.ajax({
            url: login_url,
            type: 'POST',
            data: jsonObj,
            dataType: 'json',
            success: function(result)
            {
                login_success = result['result'];
                //store userid in browser local storage
                if (typeof(Storage) !== "undefined") {
                    localStorage.setItem("snauth_user_id", userid);
                }
                
                if(login_success === "true"){
                    window.location = './users.html';
                }else{
                    $("#error").text("*Invalid credentials");
                    $("#error").css('visibility', 'visible');
                }
            },
        });
    }
}

/* Login Registration */
function loginRegistration(login_registration){
	if((login_registration.email) && (login_registration.password) && (login_registration.name) && (login_registration.comments) && (login_registration.location))
    {
        passwordValue = SHA256(login_registration.password)
        login_reg_url = 'https://arnid.execute-api.ap-south-1.amazonaws.com/lambda101/LoginRegister';
        var obj = new Object();
        obj.name = login_registration.name;
        obj.email = login_registration.email;
        obj.password = passwordValue;
        obj.location = login_registration.location;
        obj.comments = login_registration.comments;

        var jsonObj = JSON.stringify(obj);
        $.ajax({
            url: login_reg_url,
            type: 'POST',
            data: jsonObj,
            dataType: 'json',
            success: function(resp)
            {
                login_success = resp['result'];
                if(login_success === "true"){
                    $("#error").text('Your login registration successful. You may now login.').css({'visibility':'visible','color':'green'});;
                    setTimeout(function(){ window.location = './index.html'; }, 5000);
                }
                else if(login_success === "user exists"){
                    $("#error").text('Error : User already exists with this Email Address.').css('visibility','visible');
                }
            },
        });
    }
}
