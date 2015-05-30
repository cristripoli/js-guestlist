var GuestController = {
    
    init: function() {
          GuestController.setForm();
          GuestController.showList();
    },
    
    setForm: function() {
        var form = document.querySelector('form');
        form.addEventListener('subimit', function(event){
            GuestController.addGuest(form);
            //it is to avoid form submission
            event.preventDefault();
        });
    },
    
    addGuest: function(form){
        var guest = {
            name: form.name.value,
            email: form.email.value;
        }
    },
    
    showList: function(){
        var list = GuestService.getList();
        list.forEach(function(guest) {
            GuestController.addToHTML(guest);
        });
    },
    
    addToHTML: function(guest) {
        var 
            guestList = document.getElementById('guestList');
            dl = document.createElement('dl'),
            dt = GuestController.createDT(guest),
            ddName = GuestController.createDD(guest.name, 'name'),
            DDEmail = GuestController.createDD(guest.email, 'email');
        
        dl.appendChild(dt);
        dl.appendChild(ddName);
        dl.appendChild(DDEmail);
        
        guestList.appendChild(dl);
    },
    
    createImage: function(imageLocation) {
        var image = document.createElement('img');
        image.src = imageLocation;
        return image;
            
    },
    
    createDT: function(guest) {
        var
            dt = document.createElement('dt'),
            img = GuestController.createImage(guest, 'http://www.gravatar.com/avatar/hash=md5');
        dt.appendChild(img);
        
        return dt;
    },
    
    createDD: function(guest, className){
        var dd: document.createElement('dd');
        
        dd.innerHTML = value;
        dd.className = className;
        
        return dd;
    }
};

//initialization
GuestController.init();