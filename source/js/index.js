// class

// THIS REF : #CAROUSEL1, #CAROUSEL2, ou #CAROUSEL3
class Carousel {

    /*
     *
     * ELEMENT correspond au carousel
     * OPTION les différentes options, tel que les passés 3 par 3, etc
     *  
     */

    constructor(element, options = {}) {

        this.element = element,

        this.options = Object.assign({}, {

            slidesToScroll: 1,
            slidesVisible: 1,
            loop : false

        }, options)

        // permet de recupere les elements enfants item a ce moment du script sinon le carousel, et caoursel__container aurait etait considéré comme element enfant
        let children = [].slice.call(element.children);

        this.isMobile = false;
        this.currentItem = 0;
        this.root = this.createDivWithClass('carousel');

        this.container = this.createDivWithClass('carousel__container');
        this.root.setAttribute('tabindex', '0');
        
        this.root.appendChild(this.container);
        this.element.appendChild(this.root);
        this.moveCallBacks = [];

        this.items = children.map( (child) => {
            
            let item = this.createDivWithClass('carousel__item');
            
            item.appendChild(child);
            this.container.appendChild(item);

            return item

        });

        this.setStyle();
        this.createNavigation();
        this.moveCallBacks.forEach(cb => cb(0));

        this.onWindowResize();

        // Accessibilité
        this.root.addEventListener('keyup', (e) => {

            if (e.key === 'ArrowRight' || e.key === 'Right') {

                this.next();

            } else if (e.key === 'ArrowLeft' || e.key === 'Left') {

                this.prev();

            };

        });



        window.addEventListener('resize', this.onWindowResize.bind(this));

    };





    /**
     * 
     * Applique les bonnes dimension au carousel
     */
    setStyle () {

        let ratio = this.items.length / this.slidesVisible;
        this.container.style.width = (ratio * 100) + "%";
        this.items.forEach(item => {item.style.width = ((100 / this.slidesVisible) / ratio) + "%"});

    };





    createNavigation () {

        let nextButton = this.createDivWithClass('carousel__next');
        let prevButton = this.createDivWithClass('carousel__prev');

        this.root.appendChild(nextButton);
        this.root.appendChild(prevButton);

        nextButton.addEventListener('click', this.next.bind(this));
        prevButton.addEventListener('click', this.prev.bind(this));

        if (this.options.loop === true) {

            return

        };

        this.onMove(index => {

            if (index === 0) {

                prevButton.classList.add('carousel__prev--hidden');

            } else {

                prevButton.classList.remove('carousel__prev--hidden');

            };

            // ##################################################################

            if (this.items[this.currentItem + this.slidesVisible] === undefined) {

                nextButton.classList.add('carousel__next--hidden');

            } else {

                nextButton.classList.remove('carousel_next--hidden');

            };

        });

    };



    next () {

        this.goToItem(this.currentItem + this.slidesToScroll)

    };


    prev () {

        this.goToItem(this.currentItem - this.slidesToScroll)

    };



    /**
     * Deplace le carousel vers lelement ciblé
     *
     */
    goToItem (index) {

        if (index < 0) {

            index = this.items.length - this.options.slidesVisible;

        } else if (index >= this.items.length || (this.items[this.currentItem + this.options.slidesVisible] === undefined && index > this.currentItem)) {

            index = 0;

        };

        let translateX = index * -100 / this.items.length;
        this.container.style.transform = 'translate3d(' + translateX + '%, 0, 0)';
        this.currentItem = index;
        this.moveCallBacks.forEach(cb => {cb(index)});

    };




    onMove(cb) {

        this.moveCallBacks.push(cb);

    };

    onWindowResize () {

        let mobile = window.innerWidth < 800;

        if (mobile != this.isMobile) {

            this.isMobile = mobile;
            this.setStyle();
                    
            this.moveCallBacks.forEach(cb => cb(this.currentItem));
        };

    };


    /**
     * 
     * @param retourne une div avec une class
     *
     */
    createDivWithClass (className) {

        let div = document.createElement('div');
        div.setAttribute('class', className)
        return div

    };



    get slidesToScroll () {

        return this.isMobile ? 1 : this.options.slidesToScroll

    };

    get slidesVisible () {

        return this.isMobile ? 1 : this.options.slidesVisible

    };


};




document.addEventListener('DOMContentLoaded', () => {

    new Carousel(document.querySelector('#carousel1'), {

        slidesVisible: 1,
        slidesToScroll: 1,
        loop : false

    });


    new Carousel(document.querySelector('#carousel2'), {

        slidesVisible: 2,
        slidesToScroll: 2,

    });

    
    new Carousel(document.querySelector('#carousel3'), {

        slidesVisible: 3,
        slidesToScroll: 3,

    });

});