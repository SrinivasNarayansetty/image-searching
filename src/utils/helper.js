var HelperObject = {

    /**
     * @name getRandomKey
     * @description Method will return random key using date value
     * @method HelperObject
     */
    getRandomKey() {
        let now = new Date();
        let timestamp = now.getUTCMilliseconds();
        timestamp = now.getFullYear().toString();
        timestamp += (now.getMonth < 9 ? '0' : '') + now.getMonth().toString();
        timestamp += ((now.getDate < 10) ? '0' : '') + now.getDate().toString();
        return timestamp;
    },

    /**
     * @name debouncing
     * @description Method will implements javascript debouncing technique
     * @method HelperObject
     */
    debouncing(fn, delay) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
        fn();
        },delay);
    },

    /**
     * @name setDataToLocalStorage
     * @description Sets data to localstorage
     * @method HelperObject
     */
    setToLocalStorage(itemName, data) {
        if(localStorage) {
            localStorage.setItem(itemName, JSON.stringify(data));
        }   
    },

    /**
     * @name getFromLocalStorage
     * @description Used to read data from localstorage
     * @method HelperObject
     */
    getFromLocalStorage(itemName) {
        if(localStorage && localStorage.getItem(itemName)) {
            return JSON.parse(localStorage.getItem(itemName));
        }
        return false;
    },


    /**
     * @name fetchData
     * @description Fetches data from given url
     * @method HelperObject
     */
    fetchData(url) {
        if(!url) {
            return false;
        } else {
            fetch(url)
            .then(function(response){
                return response.json();
            })      
            .then(function(res){
                return res;
            })
        }
    }
}


export default HelperObject;