let uid = 0;

class Dep {
    constructor(name) {
        this.id = uid++;
        this.name = name; // 为了知道是哪个依赖
        this.subs = [];
    }

    addSub(sub) {
        this.subs.push(sub);
    }

    removeSub(sub) {
        remove(this.subs, sub);
    }

    depend() {
        // 只有有Watcher时才能收集依赖
        if (Dep.target) {
            Dep.target.addDep(this);
        }
    }

    notify() {
        this.subs.forEach((sub) => {
            sub.update();
        });
    }
}

Dep.target = null;

function remove(arr, item) {
    if (arr.length) {
        const index = arr.indexOf(item);
        if (index > -1) {
            arr.splice(index, 1);
        }
    }
}