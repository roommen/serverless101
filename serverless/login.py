import mysql.connector

def login(email, password):
    connection, cursor = None, None
    try:
        # Database connection parameters - replace this with your DB endpoint
        serverless101cnxstr = {'host': 'serverless101.cemnrzna330w.ap-south-1.rds.amazonaws.com', 'user': 'root', 'password': 'password', 'database': 'serverless101'}
        connection = mysql.connector.connect(host=serverless101cnxstr['host'], user=serverless101cnxstr['user'], password=serverless101cnxstr['password'], database=serverless101cnxstr['database'])
        # Check if email/password is a match
        sql = "SELECT UserID, Enabled FROM Users WHERE EmailAddress='%s' and Password='%s'" % (email, password)
        cursor = connection.cursor()
        cursor.execute(sql)
        (userid, enabled ) = cursor.fetchone()
        if userid and int(enabled) == 1:
            return {"result": True}
        else: 
            return {"result": False}
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
