preinstall:
	npm i -g typescript sass
	bon u -g http-server livereload

build:
	sass index.sass:index.css
	tsc

clean:
	rm index.js
	rm index.js.map
	rm index.css
	rm index.css.map

watch:
	sass index.sass:index.css --watch | tsc -w

server:
	livereload | http-server -c-1