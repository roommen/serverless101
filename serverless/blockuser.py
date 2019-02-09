import mysql.connector

def blockuser(email):
    connection, cursor = None, None
    try:
        # Database connection parameters - replace this with your DB endpoint
        serverless101cnxstr = {'host': 'serverless101.cemnrzna330w.ap-south-1.rds.amazonaws.com', 'user': 'root', 'password': 'password', 'database': 'serverless101'}
        connection = mysql.connector.connect(host=serverless101cnxstr['host'], user=serverless101cnxstr['user'], password=serverless101cnxstr['password'], database=serverless101cnxstr['database'])
        # Block user
        sql = "UPDATE Users SET Enabled=0 WHERE EmailAddress='" + email + "';"
        cursor = connection.cursor()
        cursor.execute(sql)
        connection.commit()
        return {"result": "success"}
    except mysql.connector.Error as err:
        return {"result": err}
    finally:
        if connection:
            connection.close()
        if cursor:
            cursor.close()

def lambda_handler(event, context):
    email = event['email']
    return blockuser(email)
