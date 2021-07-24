// class
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

        let root = this.createDivWithClass('carousel');
        let container = this.createDivWithClass('carousel__container');
        
        root.appendChild(container);
        this.element.appendChild(root);

    };


    createDivWithClass (className) {

        let div = document.createElement('div');
        div.setAttribute('class', className)
        return div

    }

};




document.addEventListener('DOMContentLoaded', () => {

    new Carousel(document.querySelector('#carousel1'), {

        slidesToScroll: 3,
        slidesVisible: 3,

    })


});