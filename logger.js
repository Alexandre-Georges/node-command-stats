const Transform = require('stream').Transform;

class myTransform extends Transform {

    constructor (argv) {
        super({});

        this.shouldDisplayLines = false;
        this.shouldDisplayBytes = false;
        this.shouldDisplayTime = false;
        this.shouldDisplayThroughput = false;

        for (var index = 2; index < argv.length; index++) {
            if (argv[index] === 'lines') {
                this.shouldDisplayLines = true;
            } else if (argv[index] === 'bytes') {
                this.shouldDisplayBytes = true;
            } else if (argv[index] === 'time') {
                this.shouldDisplayTime = true;
            } else if (argv[index] === 'throughput') {
                this.shouldDisplayThroughput = true;
            }
        }
        this.startTime = Date.now();
    }

    _transform (buffer, encoding, callback) {
        const data = JSON.parse(buffer.toString());
        var output = '';
        if (this.shouldDisplayLines === true) {
            output += 'number of lines: ' + data.totalLines + '\n';
        }
        if (this.shouldDisplayBytes === true) {
            output += 'number of bytes: ' + data.totalLength + '\n';
        }
        if (this.shouldDisplayTime === true) {
            output += 'time elapsed (in ms): ' + data.elapsedTime + '\n';
        }
        if (this.shouldDisplayThroughput === true) {
            output += 'throughput rate: ' + Math.round(data.totalLength * 1000 / data.elapsedTime) + ' bytes per second\n';
        }
        callback(null, output);
    }
}

var transform = new myTransform(process.argv);
process.stdin.pipe(transform, { end: false }).pipe(process.stdout, { end: false });