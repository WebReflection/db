all:
	@mkdir -p build
	@npm install
	./node_modules/wrapup/bin/wrup.js -c -r asyncStorage ./src/asyncStorage.js > ./build/asyncStorage.js
	./node_modules/wrapup/bin/wrup.js -r asyncStorage ./src/asyncStorage.js > ./build/asyncStorage.max.js

