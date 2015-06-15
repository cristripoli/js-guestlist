var GuestController = {
    
    init: function() {
          GuestController.setForm();
          GuestController.showList();
    },
    
    setForm: function() {
        var form = document.querySelector('form');
        form.addEventListener('submit', function(event){
            GuestController.addGuest(form);
            //it is to avoid form submission
            event.preventDefault();
        });
    },
    
    setFocus: function() {
		var inputName = document.getElementById('name');
		inputName.focus();
	},
	
	clearForm: function() {
		var form = document.querySelector('form');
		form.reset();
		GuestController.setFocus();
	},
    
    addGuest: function(form){
        var guest = {
            name: form.name.value,
            email: form.email.value
        };
        
		GuestService.add(guest);
		GuestController.addToHTML(guest);
        GuestController.clearForm();
    },
    
    removeGuest: function(imgDelete) {
        var 
        guestName = imgDelete.dataset.guestname,
        guestEmail = imgDelete.dataset.guestemail,
        dlToRemove = imgDelete.parentNode.parentNode;  
        
        if(confirm('Are you sure to delete ' + guestName + '?')) {
			if(GuestService.remove(guestEmail)){
                var section = dlToRemove.parentNode;
                section.removeChild(dlToRemove);
            }
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
            imgDelete = GuestController.createDelete(guest),
            ddEmail = GuestController.createDD(guest.email, 'email');
        
        ddName.appendChild(imgDelete);
        dl.appendChild(dt);
        dl.appendChild(ddName);
        dl.appendChild(ddEmail);
        
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
            emailCrypted = hex_md5(guest.email),
            img = GuestController.createImage('http://www.gravatar.com/avatar/' + emailCrypted);
        dt.appendChild(img);
        dt.className = "photo";
        return dt;
    },
    
    createDD: function(value, className){
        var dd = document.createElement('dd'),
            textValue = document.createTextNode(value);
        
        dd.appendChild(textValue);
        dd.className = className;
        
        return dd;
    },
    
	createDelete: function(guest) {
		var imgDelete = GuestController.createImage('assets/images/delete.gif');
		
		imgDelete.setAttribute('data-guestid', guest.id);
		imgDelete.setAttribute('data-guestname', guest.name);
        imgDelete.setAttribute('data-guestemail', guest.email);
		
		imgDelete.addEventListener('click', function() {
			GuestController.removeGuest(this);
		});
		
		return imgDelete;
	}
    
};

//initialization
GuestController.init();