var GuestService = {
    
    list: [],
    
    add: function(guest) {
        GuestService.list.push(guest);
        GuestService.saveToLocalStorage();
    },
    
    remove: function(guest) {
        //TODO to implement
    },
    
    getList: function() {
        GuestService.retriveFromLocalStorage();
        return GuestService.list;
    },
    
    saveToLocalStorage: function () {
        var listJson = JSON.stringify(GuestService.list);
        window.localStorage.setItem('guestList', listJson);
    },
    
    retriveFromLocalStorage: function() {
        var listJson = window.localStorage.getItem('guestList');
        if(listJson) {
            GuestService.list = JSON.parse(listJson);
        }
    }
}