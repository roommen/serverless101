import mysql.connector
from common.CommonDefs import lambda101_cnx_str


def users(user_id):
    connection, cursor = None, None
    try:
        users = []
        connection = mysql.connector.connect(host=lambda101_cnx_str['host'], user=lambda101_cnx_str['username'],
                                             password=lambda101_cnx_str['password'], database=lambda101_cnx_str['db'])
        # Get user info
        sql = "SELECT FullName,Email_Address,Location,Comments FROM Users WHERE User_ID='%s'" % (user_id)
        cursor = connection.cursor()
        cursor.execute(sql)
        # Work on this
        # columns = [column[0] for column in cursor.description]
        # for row in cursor.fetchall():
        #     users.append(dict(zip(columns, row)))
        # if len(users) > 0:
        #     return {"result": users}
        # else:
        #     return {"result": None}
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
