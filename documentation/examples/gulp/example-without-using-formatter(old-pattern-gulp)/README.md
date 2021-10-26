# Example (old-pattern-gulp) without using a formatter (live-alert-bp)

**1.** Download or copy [example-without-using-formatter(old-pattern-gulp)](https://github.com/semiromid/live-alert-bp/tree/master/documentation/examples/gulp/example-without-using-formatter(old-pattern-gulp))

**2.** Go to the directory with `gulpfile.js` and run the command in console: 

```shell
npm install
```

**3.** Double-clisk on **start.bat** or run in console 

```shell
gulp watch
```
In the console you should see the following message:

> Server started | host: 127.0.0.1 | port: 8080

**4.** Set up a connection with the plugin. [Example of how to establish a connection to a plugin](https://github.com/semiromid/live-alert-bp/tree/master/documentation/examples/%D1%81onnect_to_server)

**5.** Change a file `.sass` (make a syntax error).

**Congratulation!**

You should hear a sound and see a visual notification on the browser page.



