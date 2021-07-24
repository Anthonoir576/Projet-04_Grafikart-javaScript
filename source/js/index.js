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

        }, options),

        // permet de recupere les elements enfants item a ce moment du script sinon le carousel, et caoursel__container aurait etait considéré comme element enfant
        this.children = [].slice.call(element.children)

        let root = this.createDivWithClass('carousel');
        let container = this.createDivWithClass('carousel__container');
        
        root.appendChild(container);
        this.element.appendChild(root);

        this.children.forEach( (child) => {
            
            let item = this.createDivWithClass('carousel__item');
            item.appendChild(child)
            container.appendChild(item);

        });

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