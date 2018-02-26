import mysql.connector

def register_login(name, email, password, location, comments):
    try:
        #Database Connection Parameters - Replace this with your DB endpoint
        lambda101_cnx_str = {'host': 'dbnode.cemnrzna330w.ap-south-1.rds.amazonaws.com',
           'username': 'user',
           'password': 'password',
           'db': 'dbname'}
        user = 0
        connection = mysql.connector.connect(host=lambda101_cnx_str['host'], user=lambda101_cnx_str['username'],
                                             password=lambda101_cnx_str['password'], database=lambda101_cnx_str['db'])
        sql = "SELECT User_ID FROM Users WHERE Email_Address='%s'" % (email)
        cursor = connection.cursor()
        cursor.execute(sql)
        user_id = cursor.fetchall()
        if user_id:
            return {"result" : "user exists"}
        else:
            query = "INSERT INTO Users(FullName,Email_Address,Password,Location,Comments) VALUES ('" + name + "','" + email + "','" + password + "','" + location + "','" + comments + "')"
            cursor = connection.cursor()
            cursor.execute(query)
            connection.commit()

            return {"result": "true"}
    except mysql.connector.Error as err:
        return {"result" : err}
    finally:
        if connection:
            connection.close()
        if cursor:
            cursor.close()


def lambda_handler(event, context):
    name = event['name']
    email = event['email']
    password = event['password']
    location = event['location']
    comments = event['comments']
    return register_login(name, email, password, location, comments)
