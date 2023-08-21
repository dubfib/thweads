const { Suite } = require('benchmark');
const Thweads = require('./index.js');

const suite = new Suite();

suite
    .add('Array#Single', () => {
        const array = new Array(10000000).fill(1);
        array.reduce(async (sum, num) => sum + num, 0);
    })
    .add('Array#Multi', async () => {
        const thweads = new Thweads();

        thweads.addAction(async () => {
            const array = new Array(10000000).fill(1);
            array.reduce(async (sum, num) => sum + num, 0);
        });

        thweads.startActions();
    })
    .on('cycle', event => {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
.run({ async: true });