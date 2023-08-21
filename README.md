<div align="center">
    <p>
        <a href="https://github.com/dubfib/thweads">
            <img width="512" height="512" src="https://github.com/dubfib/thweads/blob/main/thweads.png"/>
        </a>
        <strong>
            <h2>Simple multithreading for Node.js</h2>
        </strong>
        <a href="https://github.com/dubfib/thweads"><img src="https://img.shields.io/npm/v/thweads.svg?maxAge=3600"/></a>
        <a href="https://github.com/dubfib/thweads"><img src="https://img.shields.io/npm/dt/thweads.svg?maxAge=3600"/></a>
        <a href="https://github.com/dubfib/thweads"><img src="https://img.shields.io/npm/l/thweads">
    </p>
</div>

## Installation
```bash
npm install --save thweads
```

## Usage
```js
const Thweads = require('thweads');
const thweads = new Thweads({ thweads: 4 });
//or Thweads() to automatically set thweads

thweads.addAction(async () => {
    const workerData = new Array(10000000).fill(1);
    workerData.reduce(async (sum, num) => sum + num, 0);
});

thweads.startActions();
```

##### © Copyright 2023 dubfib - MIT License
