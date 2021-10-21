class _Event {
    constructor() {
            this.eventList = {}
        }
        // 订阅
    addListenter(type, fn) {
            if (!this.eventList[type]) {
                this.eventList[type] = []
            }
            this.eventList[type].push(fn)
        }
        // 发布
    trigger(type, ...params) {
        if (this.eventList[type]) {
            this.eventList[type].forEach(callback => {
                callback(...params)
            });
        } else {
            return new Error('暂无订阅者订阅此事件')
        }
    }
    remove(type, fn) {
        if (!this.eventList[type]) return new Error('暂无此事件');
        else {
            var idx = this.eventList[type].findIndex(callback => callback === fn)
            if (idx === -1) {
                return new Error('暂无此订阅者')
            }
            this.eventList[type].splice(idx, 1)
            if (this.eventList[type].length === 0) {
                delete this.eventList[type]
            }
        }
    }
}