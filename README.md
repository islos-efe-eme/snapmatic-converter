## GTA Snapmatic image converter

[![CircleCI](https://circleci.com/gh/islos-efe-eme/snapmatic-converter/tree/master.svg?style=svg)](https://circleci.com/gh/islos-efe-eme/snapmatic-converter/tree/master)
![codecov](https://codecov.io/gh/islos-efe-eme/snapmatic-converter/branch/master/graph/badge.svg)
[![npm version](https://badge.fury.io/js/snapmatic-converter.svg)](https://badge.fury.io/js/snapmatic-converter)

### Description

Scan for Snapmatic images in a source directory, convert them into JPEG format and place them into the destination source.

### Installation

You can install it as a global NPM package:

```sh
$ sudo yarn global add snapmatic-converter
```

Or you can install it locally to a project:

```sh
$ yarn add snapmatic-converter
```

### Usage

```
$ snapmatic-converter <source-dir> <destination-dir>
```

Also you can use as an usual module:

```js
import { SnapConverter } from 'snapmatic-converter';
const snapToJpg = new SnapConverter('srcdir','dstdir')
snapToJpg.convertAllFiles()
snapToJpg.processSingleFile('PGTA51876361281')
snapToJpg.convertSomeFiles(['PGTA52078400596','PGTA51370982198','PGTA5916100621'])
```

### Tests

If you're using this software from NPM, it's already tested. You can pass the tests with:

```sh
$ yarn install
$ yarn test:unit
# To see coverage, add the proper flag
$ yarn test:unit --coverage
```

## Contribute

If you want to contribute to this project please don't hesitate to send a pull request. You can also open new issues to ask questions and participate in discussions.

## Software and libraries used

- https://nodejs.org
- https://yarnpkg.com
- https://www.typescriptlang.org
- https://npmjs.com

## Copyright & License


This program is free software; you can redistribute it and/or modify it under the terms of the MIT license.
Find more information about this on the [LICENSE](LICENSE) file.

# Upload to NPM

```sh
$ yarn install
$ yarn publish
```
