#ifndef REGISTER_LOGIN_H_
#define REGISTER_LOGIN_H_

#include <cstdlib>
#include <iostream>
#include <string>
#include <exception>

// #include "dbparams.h"
#include "dbparams_.h"

#include "mysql_connection.h"
#include "cppconn/driver.h"
#include "cppconn/exception.h"
#include "cppconn/resultset.h"
#include "cppconn/statement.h"

std::string register_login(std::string email);

#endif /* REGISTER_LOGIN_H_ */
