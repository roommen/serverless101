import mysql.connector

def create_users():
	connection, cursor = None, None
	try:
		# Database connection parameters - replace this with your DB endpoint
		serverless101cnxstr = {'host': 'serverless101.cemnrzna330w.ap-south-1.rds.amazonaws.com', 'user': 'root', 'password': 'password', 'database': 'serverless101'}
		connection = mysql.connector.connect(host=serverless101cnxstr['host'], user=serverless101cnxstr['user'], password=serverless101cnxstr['password'], database=serverless101cnxstr['database'])
		cursor = connection.cursor()
		cursor.execute('CREATE TABLE Users (UserID DOUBLE NOT NULL AUTO_INCREMENT PRIMARY KEY, FullName VARCHAR(35) NOT NULL, EmailAddress VARCHAR(35) NOT NULL, Password VARCHAR(70) NOT NULL, Location VARCHAR(25) NOT NULL, Comments VARCHAR(155) NOT NULL, Enabled BOOLEAN NOT NULL);')
		print("Table Users created successfully.")
	except mysql.connector.Error as err:
		print(err)
	finally:
		if connection:
			connection.close()
		if cursor:
			cursor.close()


if __name__ == '__main__':
	create_users()
