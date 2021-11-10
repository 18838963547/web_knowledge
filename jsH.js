// 停车场类
class ParkingLot {
    constructor(n) {
        // 停车位
        this.parkSites = []
            // 剩余停车位个数
        this.leftSites = n
        this.board = new DisplayBoard()
            // 初始化停车位
        for (let i = 1; i <= n; i++) {
            this.parkSites.push(new ParkingSpace(i))
        }
        console.log('停车场初始化完毕')
        this.showLeftSites()
    }

    // 进停车场停车
    inPark(car) {
        if (this.leftSites === 0) {
            console.log('停车位已满')
            return
        }
        if (car.site) {
            console.log(car.carId + '车辆已经在停车场了')
            return
        }
        let len = this.parkSites.length
        for (let i = 0; i < len; i++) {
            const site = this.parkSites[i]
                // 如果停车位是空的
            if (site.car === null) {
                site.car = car
                car.site = site
                this.leftSites--
                    console.log(car.carId + '车辆停入' + site.id + '号停车位')
                this.showLeftSites()
                return
            }
        }
    }

    // 出停车场
    outPark(car) {
        if (car.site === null) {
            console.log(car.carId + '本来就没在停车场')
            return;
        }
        let len = this.parkSites.length
        for (let i = 0; i < len; i++) {
            const site = this.parkSites[i]
                // 如果停车位是空的
            if (site.car.carId === car.carId) {
                site.car = null
                car.site = null
                this.leftSites++
                    console.log(car.carId + '车辆已从' + site.id + '号停车位，出停车场')
                this.showLeftSites()
                return
            }
        }
    }

    // 显示剩余的停车位数量
    showLeftSites() {
        this.board.showLeftSapce(this.leftSites)
    }

}


// 停车位
class ParkingSpace {
    constructor(id) {
        // 停车位编号
        this.id = id
            // 停入的车辆
        this.car = null
    }
}

// 车 类
class Car {
    constructor(carId) {
            // 车牌号
            this.carId = carId
                // 停入的车位
            this.site = null
        }
        // 进入停车场
    inPark(park) {
        park.inPark(this)
    }
    outPark(park) {
        park.outPark(this)
    }
}

// 展示牌类
class DisplayBoard {
    constructor() {}
        // 展示剩余停车位
    showLeftSapce(n) {
        console.log(`当前剩余${n}个停车位`)
    }
}


const park = new ParkingLot(3)

const car1 = new Car('京A1XXX')
const car2 = new Car('京A2XXX')
const car3 = new Car('京A3XXX')
const car4 = new Car('京A4XXX')
car1.inPark(park)
car1.inPark(park)
car1.outPark(park)
car1.outPark(park)
car1.inPark(park)

car2.inPark(park)
car3.inPark(park)
car4.inPark(park)

car2.outPark(park)
car4.inPark(park)

console.log(park.parkSites)