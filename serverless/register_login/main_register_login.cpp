#include <v8.h>
#include <node.h>
#include <uv.h>

#include "register_login.h"

using namespace v8;
using namespace std;

struct Work {
	uv_work_t  request;
	Persistent<Function> callback;
	string reqJSON;
	string result;
};

string registerLoginWrapper(string email) {
	string result = register_login(email);
	cout << "result is " << result << endl;
	return result;
}

/* Called by libuv worker in separate thread */
static void WorkAsync(uv_work_t *req)
{
	Work* work = static_cast<Work *>(req->data);

	/* This is the worker thread, lets build up the results */
	/* Allocated results from the heap because we'll need to access in the event loop later to send back */
	work->result = registerLoginWrapper((string)work->reqJSON.data());
}

/* Called by libuv in event loop when async function completes */
static void WorkAsyncComplete(uv_work_t *req, int status)
{
	Isolate* isolate = Isolate::GetCurrent();

	/* Fix for Node 4.x - thanks to https://github.com/nwjs/blink/commit/ecda32d117aca108c44f38c8eb2cb2d0810dfdeb */
	v8::HandleScope handleScope(isolate);

	Work* work = static_cast<Work*>(req->data);

	/* Set up return arguments after the work been done by transfering the result into a local value on the event-thread's stack */
	Handle<Value> argv[] = {String::NewFromUtf8(Isolate::GetCurrent(), work->result.c_str())};

	/* Execute the callback - https://stackoverflow.com/questions/13826803/calling-javascript-function-from-a-c-callback-in-v8/28554065#28554065 */
	Local<Function>::New(isolate, work->callback)->Call(isolate->GetCurrentContext()->Global(), 1, argv);

	/* Free up the persistent function callback */
	work->callback.Reset();
	delete work;
}

void registerLoginASync(const v8::FunctionCallbackInfo<v8::Value>& args) {
	Isolate* isolate = args.GetIsolate();

	Work* work = new Work();
	work->request.data = work;

	string paramArgs(*v8::String::Utf8Value(args[0]));
	work->reqJSON = paramArgs;

	/* Store the callback from JS in the work package so we can invoke it later */
	Local<Function> callback = Local<Function>::Cast(args[1]);
	work->callback.Reset(isolate, callback);

	/* Kick off the worker thread */
	uv_queue_work(uv_default_loop(), &work->request, WorkAsync, WorkAsyncComplete);

	args.GetReturnValue().Set(Undefined(isolate));
}

/* registerLogin is the call issued from js which then leads to calling the method registerLoginASync() */
void init(Handle <Object> exports, Handle<Object> module) {
	NODE_SET_METHOD(exports, "registerLogin", registerLoginASync);
}

NODE_MODULE(custDec, init)
