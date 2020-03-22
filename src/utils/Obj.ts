class Obj {

    public deepClone<T>(o: T): T {
        return JSON.parse(JSON.stringify(o));
    }

}

export default new Obj();
