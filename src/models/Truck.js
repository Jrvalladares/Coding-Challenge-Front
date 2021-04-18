export default class Truck {
    constructor(truck) {
        if (truck)
        { this.assign(truck); }
        else
        { this.clear(); }
        this._truck = truck;
    }

    restore()
    { this.assign(this._truck); }

    assign(truck) {
        const {
            id    = null,
            name  = null,
            city  = null,
            state = null,
            zip   = null,
        } = truck;

        this.id    = id;
        this.name  = name;
        this.city  = city;
        this.state = state;
        this.zip   = zip;
    }

    clear() {
        this.id    = this.id ? this.id : null;
        this.name  = null;
        this.city  = null;
        this.state = null;
        this.zip   = null;
    }
}
  