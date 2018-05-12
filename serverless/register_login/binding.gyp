# Define the target to be created
{
	"targets": [
	{
		'target_name': 'regLog',
		'sources': [ 'register_login.cpp', 'main_register_login.cpp' ],
		'include_dirs': [ './cppcon' ],
		'libraries': [ '-L. -static -lmysqlcppconn' ],
		'cflags': [ '-Wall', '-std=c++1y', '-fexceptions', '-fPIC'],
	}
	]
}
