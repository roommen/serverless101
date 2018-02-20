import mysql.connector
from common.CommonDefs import lambda101_cnx_str


def login(email, password):
    connection, cursor = None, None
    try:
        connection = mysql.connector.connect(host=lambda101_cnx_str['host'], user=lambda101_cnx_str['username'],
                                             password=lambda101_cnx_str['password'], database=lambda101_cnx_str['db'])
        # Check if user exists
        sql = "SELECT User_ID FROM Users WHERE Email_Address='%s'" % (email)
        cursor = connection.cursor()
        cursor.execute(sql)
        user_id = cursor.fetchall()
        if user_id:
            return {"result": "true"}
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
    email = event['email']
    password = event['password']
    return login(email, password)
