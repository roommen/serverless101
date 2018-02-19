/* Show User Info */
function showUserInfo(){
    var info_url = 'https://dd7fy5cwa9.execute-api.ap-south-1.amazonaws.com/snauth/' + env_value + 'ActiveUsers';
    $.ajax({
        url: info_url,
        type: 'GET',
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
        login_url = " https://dd7fy5cwa9.execute-api.ap-south-1.amazonaws.com/snauth/" + env_value + "Login";
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
        login_reg_url = "https://dd7fy5cwa9.execute-api.ap-south-1.amazonaws.com/snauth/" + env_value + "RequestLogin";
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
