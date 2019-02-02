import mysql.connector

def create_users():
	connection, cursor = None, None
	try:
		connection = mysql.connector.connect(host='serverless101.xyz123zbc987.ap-south-1.rds.amazonaws.com', user='root', password='P@$$w0rd', database='serverless101')
		cursor = connection.cursor()
		cursor.execute('CREATE TABLE Users (User_ID DOUBLE NOT NULL AUTO_INCREMENT PRIMARY KEY, FullName VARCHAR(35) NOT NULL, Email_Address VARCHAR(35) NOT NULL, Password VARCHAR(70) NOT NULL, Location VARCHAR(25) NOT NULL, Comments VARCHAR(155) NOT NULL));')
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
