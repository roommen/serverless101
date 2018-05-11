REGLOG = regLog.node

binding:
	node-gyp configure build
	mkdir node_modules
	cp build/Release/$(REGLOG) node_modules/.

clean:
	rm -Rf build
	rm -f $(REGLOG)
	rm -rf node_modules
