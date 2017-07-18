(function(){

    var totalItems,
        currentIndex = 0,
        currentActiveElement = document.getElementById('carouselItem0');

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

        //mouse right event
    }

    function init() {
        bindEvents();
        createCarouselList();
    }

    init();
})()