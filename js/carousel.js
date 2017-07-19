(function(){

    var totalItems,
        currentIndex = 0,
        currentActiveElement = document.getElementById('carouselItem0'),
        activePosition = currentActiveElement.getBoundingClientRect(),
        activeLeftPosition = activePosition.left,
        activeRightPosition = activePosition.right,
        listUpdated = false;

    //create list array
    function createCarouselList() {
        var tempItems = document.getElementsByClassName('carousel-item');
        totalItems = tempItems.length;
    }

    //change to left or right
    function updateList() {
        currentActiveElement.classList.remove('active');
        currentActiveElement = document.getElementById('carouselItem'+currentIndex);
        currentActiveElement.classList.add('active');
        activePosition = currentActiveElement.getBoundingClientRect(),
        activeLeftPosition = activePosition.left,
        activeRightPosition = activePosition.right;
    }


    //update current slide
    function updateCurrentIndex(direction) {
        if(direction==='left') {
            if(currentIndex===0) {
                currentIndex = totalItems-1;
            }
            else {
                currentIndex--;
            }
        }
        if(direction==='right') {
            if(currentIndex===totalItems - 1) {
                currentIndex = 0;
            }
            else {
                currentIndex++;
            }
        }
    }

    function bindEvents() {
        //next event 
        document.getElementById('nextItem').addEventListener('click', function() {
            updateCurrentIndex('right');
            updateList();
        })
        //previous event
        document.getElementById('previousItem').addEventListener('click', function() {
            updateCurrentIndex('left');
            updateList();
        })
        //mouse left event
        $('.carousel').on('dragstart', 'img', function(event){
            activeLeftPosition = event.originalEvent.screenX;
            listUpdated = false;
        })
        $('.carousel').on('drag', 'img', function(event) {
            if(((activeLeftPosition - event.originalEvent.screenX)>$(this).width()/2)&& !listUpdated) {
                updateCurrentIndex('right');
                updateList();
                listUpdated = true;
            }
            else if(((event.originalEvent.screenX - activeLeftPosition)>$(this).width()/2)&& !listUpdated) {
                updateCurrentIndex('left');
                updateList();
                listUpdated = true;
            }
        })
        //zoom in/out
        $('.carousel').on('mousewheel', 'img', function(event) {
            var width = $(this).width();
            var height = $(this).height();
            if (event.originalEvent.wheelDelta > 0) {
                width += 20;
                height += 20;
            } else if (event.originalEvent.wheelDelta < 0) {
                if (width > 20) {
                    width -= 20;
                    height -= 20;
                }
            }
            $(this).width(width);
            $(this).height(height);
        })
    }

    function init() {
        bindEvents();
        createCarouselList();
    }

    init();
})()