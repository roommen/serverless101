import mysql.connector

def users(user_id):
    connection, cursor = None, None
    try:
        #Database Connection Parameters - Replace this with your DB endpoint
        lambda101_cnx_str = {'host': 'dbnode.cemnrzna330w.ap-south-1.rds.amazonaws.com',
           'username': 'user',
           'password': 'password',
           'db': 'dbname'}
        users = []
        connection = mysql.connector.connect(host=lambda101_cnx_str['host'], user=lambda101_cnx_str['username'],
                                             password=lambda101_cnx_str['password'], database=lambda101_cnx_str['db'])
        # Get user info
        sql = "SELECT FullName,Email_Address,Location,Comments FROM Users WHERE User_ID='%s'" % (user_id)
        cursor = connection.cursor()
        cursor.execute(sql)
        (user_details, ) = cursor.fetchall()
        if user_details:
            return {"result": "true", "values": {"name": user_details[0], "email": user_details[1],
                                                 "location": user_details[2], "comments": user_details[3]}}
        else:
            return {"result": "false"}
    except mysql.connector.Error as err:
        return {"result": err}
    finally:
        if connection:
            connection.close()
        if cursor:
            cursor.close()

def lambda_handler(event, context):
    user_id = event['user_id']
    return users(user_id)
