import mysql.connector

def activeusers():
    connection, cursor = None, None
    try:
        # Database connection parameters - replace this with your DB endpoint
        serverless101cnxstr = {'host': 'serverless101.cemnrzna330w.ap-south-1.rds.amazonaws.com', 'user': 'root', 'password': 'password', 'database': 'serverless101'}
        connection = mysql.connector.connect(host=serverless101cnxstr['host'], user=serverless101cnxstr['user'], password=serverless101cnxstr['password'], database=serverless101cnxstr['database'])
        # Get all active users
        users = []
        sql = "SELECT * FROM Users WHERE Enabled=1"
        cursor = connection.cursor()
        cursor.execute(sql)
        columns = [column[0] for column in cursor.description]
        for row in cursor.fetchall():
            users.append(dict(zip(columns, row)))
        if len(users) > 0:
            return {"users": users}
        else:
            return {"users": None}
    except mysql.connector.Error as err:
        return {"users": err}
    finally:
        if connection:
            connection.close()
        if cursor:
            cursor.close()

def lambda_handler(event, context):
    return activeusers()
