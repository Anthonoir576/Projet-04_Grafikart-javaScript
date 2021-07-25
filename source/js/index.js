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
            slidesVisible: 1

        }, options)

        
        // permet de recupere les elements enfants item a ce moment du script sinon le carousel, et caoursel__container aurait etait considéré comme element enfant
        let children = [].slice.call(element.children);
        this.currentItem = 0;
        this.root = this.createDivWithClass('carousel');

        this.container = this.createDivWithClass('carousel__container');
        
        this.root.appendChild(this.container);
        this.element.appendChild(this.root);

        this.items = children.map( (child) => {
            
            let item = this.createDivWithClass('carousel__item');
            
            item.appendChild(child);
            this.container.appendChild(item);

            return item

        });

        this.setStyle();
        this.createNavigation();

    };

    /**
     * 
     * Applique les bonnes dimension au carousel
     */
    setStyle () {

        let ratio = this.items.length / this.options.slidesVisible;
        this.container.style.width = (ratio * 100) + "%";
        this.items.forEach(item => {item.style.width = ((100 / this.options.slidesVisible) / ratio) + "%"});

    };

    createNavigation () {

        let nextButton = this.createDivWithClass('carousel__next');
        let prevButton = this.createDivWithClass('carousel__prev');

        this.root.appendChild(nextButton);
        this.root.appendChild(prevButton);

        nextButton.addEventListener('click', this.next.bind(this));
        prevButton.addEventListener('click', this.prev.bind(this));

    };

    next () {

        this.goToItem(this.currentItem + this.options.slidesToScroll)

    };

    prev () {

        this.goToItem(this.currentItem - this.options.slidesToScroll)

    };

    /**
     * Deplace le carousel vers lelement ciblé
     * @param {} index 
     */
    goToItem (index) {

        if (index < 0) {

            index = this.items.length - this.options.slidesVisible;

        } else if (index >= this.items.length || this.items[this.currentItem + this.options.slidesVisible] === undefined) {

            index = 0;

        };

        let translateX = index * -100 / this.items.length;
        this.container.style.transform = 'translate3d(' + translateX + '%, 0, 0)';
        this.currentItem = index;

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

};




document.addEventListener('DOMContentLoaded', () => {

    new Carousel(document.querySelector('#carousel1'), {

        slidesVisible: 1,
        slidesToScroll: 1
        

    })

    new Carousel(document.querySelector('#carousel2'), {

        slidesVisible: 2,
        slidesToScroll: 2
        

    })

    
    new Carousel(document.querySelector('#carousel3'), {

        slidesVisible: 3,
        slidesToScroll: 3
        

    })



});