import Vinyl from 'vinyl'
import minimatch from 'minimatch'
import queue from 'ethical-utility-queue'

const FileQueue = function () {
    queue(this)
    this.enqueue = (file) => {
        if (Vinyl.isVinyl(file)) return this.queue.push(file)
        throw new Error('Queue only accepts Vinyl files.')
    }
}

FileQueue.prototype = {
    isEnqueued (pattern) {
        for (var i = this.offset; i < this.queue.length; i++) {
            if (minimatch(this.queue[i].path, pattern)) return true
        }
        return false
    }
}

export default () => new FileQueue()
