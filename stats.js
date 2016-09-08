const Transform = require('stream').Transform;

class myTransform extends Transform {

    constructor () {
        super({});
        this.startTime = Date.now();
    }

    _transform (buffer, encoding, callback) {
        const data = buffer.toString();
        callback(null, JSON.stringify({
            elapsedTime: Date.now() - this.startTime,
            totalLength: buffer.length,
            totalLines: (data.match(new RegExp('\n[^\n]+', 'g')) || []).length + 1
        }));
        this.startTime = Date.now();
    }
}

var transform = new myTransform();
process.stdin.pipe(transform).pipe(process.stdout);