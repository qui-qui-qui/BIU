import Slider from "./slider";

export default class MiniSlider extends Slider {
    constructor(container, next, prev, activeClass, animate, autoplay) {
        super(container, next, prev, activeClass, animate, autoplay);
    }

    decorizeSlides() {
        this.slides.forEach(slide => {
            slide.classList.remove(this.activeClass);
            if (this.animate) {
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
            }
        });

        if (this.slides[0].tagName === 'DIV' ) {
            this.slides[0].classList.add(this.activeClass);
        }

        if (this.animate) {
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

    nextSlide() {
        let lastNum;

        if ([...this.slides].every(i => i.tagName == 'DIV')) {
            lastNum = this.slides.length - 1;
        } else {
            lastNum = this.slides.length - 3;
        }
        
        if (this.slides[lastNum + 1]) {
            this.container.insertBefore(this.slides[0], this.slides[lastNum + 1]);
        } else {
            this.container.appendChild(this.slides[0]);
        }
        
        this.decorizeSlides();
    }

    bindTriggers() {
        let lastNum;

        if ([...this.slides].every(i => i.tagName == 'DIV')) {
            lastNum = this.slides.length - 1;
        } else {
            lastNum = this.slides.length - 3;
        }

        this.next.addEventListener('click', () => this.nextSlide());

        this.prev.addEventListener('click', () => {
            let active = this.slides[lastNum];
            this.container.insertBefore(active, this.slides[0]);
            this.decorizeSlides();
        });
    }

    init() {
        this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;
        `;

        this.bindTriggers();
        this.decorizeSlides();

        if (this.autoplay) {
            setInterval(() => this.nextSlide(), 5000);
        }
    }
}