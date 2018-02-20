import mysql.connector
from common.CommonDefs import lambda101_cnx_str


def drop_users():
    connection, cursor = None, None
    try:
        connection = mysql.connector.connect(host=lambda101_cnx_str['host'], user=lambda101_cnx_str['username'],
                                             password=lambda101_cnx_str['password'], database=lambda101_cnx_str['db'])
        cursor = connection.cursor()
        cursor.execute('DROP TABLE Users;')
        print("Table Users dropped successfully.")
    except mysql.connector.Error as err:
        print(err)
    finally:
        if connection:
            connection.close()
        if cursor:
            cursor.close()


if __name__ == '__main__':
    drop_users()
