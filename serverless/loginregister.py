import mysql.connector

def loginregister(fullname, email, password, location, comments):
    try:
        # Database connection parameters - replace this with your DB endpoint
        serverless101cnxstr = {'host': 'serverless101.cemnrzna330w.ap-south-1.rds.amazonaws.com', 'user': 'root', 'password': 'password', 'database': 'serverless101'}
        connection = mysql.connector.connect(host=serverless101cnxstr['host'], user=serverless101cnxstr['user'], password=serverless101cnxstr['password'], database=serverless101cnxstr['database'])
        # Check if email already exists
        sql = "SELECT UserID FROM Users WHERE EmailAddress='%s'" % (email)
        cursor = connection.cursor()
        cursor.execute(sql)
        userid = cursor.fetchall()
        if userid:
            return {"result" : False}
        else:
            # Add the new user
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
    name = event['name']
    email = event['email']
    password = event['password']
    location = event['location']
    comments = event['comments']
    return loginregister(name, email, password, location, comments)
