#include "new.h"

using namespace std;

int main(int argc, char **argv) {
    //First way
    // Session sess(MYSQL_HOSTNAME, 33060, MYSQL_USERNAME, MYSQL_PASSWORD);
    // Schema db = sess.getSchema(MYSQL_DATABASE);

    // Collection myColl = db.getCollection("my_collection");

    // An alternative way of defining session settings.

    mysqlx::SessionSettings settings(mysqlx::SessionOption::HOST, MYSQL_HOSTNAME, mysqlx::SessionOption::PORT, 3306);

    settings.set(mysqlx::SessionOption::USER, MYSQL_USERNAME);
    settings.set(mysqlx::SessionOption::PWD, MYSQL_PASSWORD);

    //string url = "mysqlx://f1.cemnrzna330w.ap-south-1.rds.amazonaws.com:33060/test?user=runcy&password=enternow123";

    mysqlx::Session mySession(settings);
    //mysqlx::Session mySession(url);

    mysqlx::Schema myDb = mySession.getSchema(MYSQL_DATABASE);

    // Get a list of all available schemas
    //list<mysqlx::Schema> schemaList = mySession.getSchemas();

    cout << "Available schemas in this session:" << endl;

    cout << myDb.getName() << endl;
    // Loop over all available schemas and print their name
    //for (mysqlx::Schema schema : schemaList) {
    //    cout << schema.getName() << endl;
    //}

    return 0;
}
