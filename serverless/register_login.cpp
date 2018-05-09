#include <stdlib.h>
#include <iostream>
#include "dbparams.h"
#include "mysql_connection.h"
#include <cppconn/driver.h>
#include <cppconn/exception.h>
#include <cppconn/resultset.h>
#include <cppconn/statement.h>

using namespace std;

int main(int argc, char **argv)
{
    cout << endl;
    cout << "Running 'SELECT FullName, Email_Address from Users'..." << endl;

    try {
        sql::Driver *driver;
        sql::Connection *con;
        sql::Statement *stmt;
        sql::ResultSet *res;

        /* Create a connection */
        driver = get_driver_instance();
        con = driver->connect(MYSQL_HOSTNAME, MYSQL_USERNAME, MYSQL_PASSWORD);
        
        /* Connect to the MySQL test database */
        con->setSchema("f1");

        stmt = con->createStatement();
        res = stmt->executeQuery("SELECT FullName, Email_Address from Users");
        while (res->next()) {
            cout << "\t... MySQL replies: ";
            /* Access column data by numeric offset, 1 is the first column */
            cout << res->getString(1) << " " << res->getString(2) << endl;
        }
        delete res;
        delete stmt;
        delete con;
    } catch (sql::SQLException &e) {
        cout << "# ERR: SQLException in " << __FILE__;
        cout << "(" << __FUNCTION__ << ") on line " << __LINE__ << endl;
        cout << "# ERR: " << e.what();
        cout << " (MySQL error code: " << e.getErrorCode();
        cout << ", SQLState: " << e.getSQLState() << " )" << endl;
    }

    cout << endl;

    return EXIT_SUCCESS;
}
