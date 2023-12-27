window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu'),
    menuItem = document.querySelectorAll('.menu_item'),
    hamburger = document.querySelector('.hamburger'),
    galery = document.querySelector('.galery'),
    photoImg = document.querySelectorAll('.photo_img');

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

    window.addEventListener('click', function (event) {
        console.log(event.target) // напечатает количество кликов
      })

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
})