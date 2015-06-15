var GuestService = {
    
    list: [],
    
    add: function(guest) {
        GuestService.list.push(guest);
        GuestService.saveToLocalStorage();
    },
    
    remove: function(email) {
        
		var list = GuestService.getList(),
		    contact;
		for (var i = 0; i < list.length; i++) {
			contact = list[i];
			if(contact.email == email) {
				list.splice(i,1);
				GuestService.saveToLocalStorage();
                return true;
			}
		}
        return false;
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