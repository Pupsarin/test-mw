import axios from 'axios';

class Singleton {
    constructor() {
        if (!!Singleton.instance) {
            return Singleton.instance;
        }
        Singleton.instance = this;
        this.session = axios.create({
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': `Bearer ${localStorage.chatToken}`,
            },
        });
    }
    get = (...params) => this.session.get(...params).then(data => console.log(data));
}

const singleton =  new Singleton();

export default singleton;

