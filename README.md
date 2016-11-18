# lighthouse-mocha-example

> Using lighthouse and lighthouse-core with Mocha to run tests on your project/site.

Basic example that gathers performance metrics via [Lighthouse](https://github.com/GoogleChrome/lighthouse/) and tests them in Mocha. Tested against Chrome headless_shell (available via my [Docker container](https://hub.docker.com/r/justinribeiro/chrome-headless/))

![image](https://cloud.githubusercontent.com/assets/643503/20443540/1862bbac-ad82-11e6-8874-7a6559d4a561.png)

## Try it out!
```sh
$ docker pull justinribeiro/chrome-headless
$ docker run -d --net host justinribeiro/chrome-headless
$ git clone git@github.com:justinribeiro/lighthouse-mocha-example.git
$ cd lighthouse-mocha-example
$ npm install
$ npm test
```
