#include "register_login.h"

using namespace std;

string register_login(string email) {
    string result;
    // try {
        sql::Driver *driver;
        sql::Connection *con;
        sql::Statement *stmt;
        sql::ResultSet *res;
        cout << "place 1" << endl;
        /* Create a connection */
        driver = get_driver_instance();
        con = driver->connect(MYSQL_HOSTNAME, MYSQL_USERNAME, MYSQL_PASSWORD);
        cout << "place 2" << endl;
        /* Connect to the MySQL database */
        con->setSchema(MYSQL_DATABASE);
        cout << "place 3" << endl;
        stmt = con->createStatement();
        res = stmt->executeQuery("SELECT User_ID FROM Users WHERE Email_Address=" + email);
        while (res->next()) {
            cout << "\t... MySQL replies: ";
            /* Access column data by numeric offset, 1 is the first column */
            result = res->getString(1); 
            cout << result << endl;
        }
        delete res;
        delete stmt;
        delete con;
    // } catch (sql::SQLException &e) {
        // cout << "# ERR: SQLException in " << __FILE__;
        // cout << "(" << __FUNCTION__ << ") on line " << __LINE__ << endl;
        // cout << "# ERR: " << e.what();
        // cout << " (MySQL error code: " << e.getErrorCode();
        // cout << ", SQLState: " << e.getSQLState() << " )" << endl;
    // }

    return result;
}
