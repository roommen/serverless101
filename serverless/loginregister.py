import mysql.connector

def loginregister(fullname, email, password, location, comments):
    try:
        # Database connection parameters - replace this with your DB endpoint
        serverless101cnxstr = {'host': 'dbnode.cemnrzna330w.ap-south-1.rds.amazonaws.com',
           'user': 'user',
           'password': 'password',
           'database': 'dbname'}
        connection = mysql.connector.connect(host=serverless101cnxstr['host'], user=serverless101cnxstr['user'],
                                             password=serverless101cnxstr['password'], database=serverless101cnxstr['database'])
        sql = "SELECT UserID FROM Users WHERE EmailAddress='%s'" % (email)
        cursor = connection.cursor()
        cursor.execute(sql)
        userid = cursor.fetchall()
        if userid:
            return {"result" : "user exists"}
        else:
            query = "INSERT INTO Users(FullName,EmailAddress,Password,Location,Comments,Enabled) VALUES ('" + fullname + "','" + email + "','" + password + "','" + location + "','" + comments + "', 1)"
            cursor = connection.cursor()
            cursor.execute(query)
            connection.commit()

            return {"result": True}
    except mysql.connector.Error as err:
        return {"result" : err}
    finally:
        if connection:
            connection.close()
        if cursor:
            cursor.close()


def lambda_handler(event, context):
    fullname = event['name']
    email = event['email']
    password = event['password']
    location = event['location']
    comments = event['comments']
    return loginregister(name, email, password, location, comments)
