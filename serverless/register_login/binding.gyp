# Define the target to be created
{
	"targets": [
	{
		'target_name': 'regLog',
		'sources': [ 'register_login.cpp', 'main_register_login.cpp' ],
		# 'include_dirs': [ './cppcon' ],
		# 'libraries': [ '-lmysqlcppconn' ],
		'libraries': [ '-L/usr/lib/libmysqlcppconn.so.7.1.1.3' ],
		'cflags': [ '-Wall', '-g', '-std=c++11']
	}
	]
}
