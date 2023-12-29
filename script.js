window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu'),
    menuItem = document.querySelectorAll('.menu_item'),
    hamburger = document.querySelector('.hamburger'),
    galery = document.querySelector('.galery'),
    galery_1 = document.querySelector('.galery_1'),
    photoImg = document.querySelectorAll('.photo_img'),
    namelabel = document.querySelector('.name'),
    phonelabel = document.querySelector('.phonel');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('menu_active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('menu_active');
        })
    })
    
    if(window.innerWidth>=767){
        galery.classList.add('none')
        galery_1.classList.remove('none')
    }
    else{
        galery.classList.remove('none')
        galery_1.classList.add('none')
    }

    window.addEventListener('resize', (e) => {
        if(window.innerWidth>=767){
            galery.classList.add('none')
            galery_1.classList.remove('none')
        }
        else{
            galery.classList.remove('none')
            galery_1.classList.add('none')
        }
      });
    galery.addEventListener('touchstart', handleTouchStart, false);    
    galery.addEventListener('touchmove', handleTouchMove, false);
    let xDown = null;                                                        
    let yDown = null;                                                        
    function handleTouchStart(evt){                                    
        xDown = evt.touches[0].clientX;                                      
        yDown = evt.touches[0].clientY;                                      
    };
    let x = 0;
    let y = 0;                                       
    function handleTouchMove(evt) {
        let xUp = evt.touches[0].clientX;                                    
        let yUp = evt.touches[0].clientY;

        let xDiff = xDown - xUp;
        let yDiff = yDown - yUp;
        if ( ! xDown || ! yDown ) {
            return;
        }
        else if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
            if ( xDiff > 0 ) {
                if(x<photoImg.length-1){
                photoImg.forEach((el)=>el.style.transform = `translateX(-${(x+1)*90}%)`)
                ++x
                if(y>0){--y}
                }
                console.log('left')
                console.log(x)
                console.log(y)
                xUp, yUp, xDown, yDown = null;         
            } if ( xDiff < 0 ) {
                if(y<photoImg.length-1){
                    if(x==y){
                        photoImg.forEach((el)=>el.style.transform = `translateX(0%)`)
                    }
                    else{
                photoImg.forEach((el)=>el.style.transform = `translateX(${(y+1)*90-(x+1)*90+90}%)`)
                    }
                ++y
                if(x>0){--x}
                }
                console.log('right')  
                console.log(x)
                console.log(y)
                xUp, yUp, xDown, yDown = null;  
            }                                                
        }
    };

    const formElement = document.getElementById('consultation-form');
    formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(formElement);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const email = formData.get('email');
    console.log(name)
    console.log(phone.length)
    if(name.length<2){
        namelabel.classList.remove('none')
    }
    else{
        namelabel.classList.add('none')
    }
    if(phone.length<18){
        phonelabel.classList.remove('none')
    }
    else{
        phonelabel.classList.add('none')
    }
    if(name.length<2 && phone.length==18){
        sendEmail(name, phone)
    }
    });

    function sendEmail(name, phone) {
        var subject = "Новое сообщение от " + name;
        var body = "Имя: " + name + "";
        body += "Email: " + phone + "";
        body += "Сообщение:" + phone;
        window.open("mailto:youremail@example.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body));   
        }

        [].forEach.call( document.querySelectorAll('.phone'), function(input) {
        var keyCode;
        function mask(event) {
          event.keyCode && (keyCode = event.keyCode);
          var pos = this.selectionStart;
          if (pos < 3) event.preventDefault();
          var matrix = "+375 (__) ___ ____",
              i = 0,
              def = matrix.replace(/\D/g, ""),
              val = this.value.replace(/\D/g, ""),
              new_value = matrix.replace(/[_\d]/g, function(a) {
                  return i < val.length ? val.charAt(i++) : a
              });
          i = new_value.indexOf("_");
          if (i != -1) {
              i < 5 && (i = 3);
              new_value = new_value.slice(0, i)
          }
          var reg = matrix.substr(0, this.value.length).replace(/_+/g,
              function(a) {
                  return "\\d{1," + a.length + "}"
              }).replace(/[+()]/g, "\\$&");
          reg = new RegExp("^" + reg + "$");
          if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
            this.value = new_value;
          }
          if (event.type == "blur" && this.value.length < 5) {
            this.value = "";
          }
        }
    
        input.addEventListener("input", mask, false);
        input.addEventListener("focus", mask, false);
        input.addEventListener("blur", mask, false);
        input.addEventListener("keydown", mask, false);
      });

      const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

})