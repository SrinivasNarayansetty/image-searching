var HelperObject = {
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
    }
}


export default HelperObject;