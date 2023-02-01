let images = [{
    url: "https://my-loo.ru/wp-content/uploads/2021/12/sochi-2021.jpg",
    title: "Морпорт Сочи"
}, {
    url: "https://sportishka.com/uploads/posts/2022-02/1645557616_1-sportishka-com-p-krasnaya-polyana-roza-khutor-turizm-krasiv-1.jpg",
    title: "Горнолыжный курорт Роза Хутор"
}, {
    url: "https://avatars.dzeninfra.ru/get-zen_doc/112297/pub_5de4f16adf944400b256de6d_5de4f20c06cc4600ad7c76cb/scale_1200",
    title: "Горнолыжный курорт Газпром"
}, {
    url: "https://alians-tour.ru/wp-content/uploads/2020/06/imeret.jpg",
    title: "Имеретинский курорт, Олимпийский парк"
}, {
    url: "http://adler-lacosta.ru/wp-content/uploads/2016/05/%D1%81%D0%BE%D1%87%D0%B8-%D0%BF%D0%B0%D1%80%D0%BA2.jpg",
    title: "Сочи Парк"
}, {
    url: "https://new.get-me-tour.ru/images/cache/ProductRoutePlans/ProductRoutePlan328/7263bc993e-1.jpeg",
    title: "Каньон Псахо"
}, {
    url: "https://mir-tourista.ru/wp-content/uploads/6087dfa32afdb362345ef750.1280x960.jpeg",
    title: "33 водопада"
}, {
    url: "https://www.travelblacksea.ru/img/resorts/sochi/landmarks/tiso/3.jpg",
    title: "Тисо-самшитовая роща"
}, {
    url: "https://www.eurolux-rostov.ru/wp-content/uploads/2020/06/becb6cb15e269a57d941cd1f24a1b951.jpg",
    title: "Воронцовские пещеры"
}, {
    url: "https://xcourse.me/images/showplaces/190/c54a067ca4b6c99ffdf2f677eaac7561.jpg",
    title: "Орлиные скалы"
}];

function initSlider(options) {
    if (!images || !images.length) return;

    options = options || {
        titles: false,
        dots: true,
        autoplay: false
    };

    let sliderImages = document.querySelector(".slider__images");
    let sliderArrows = document.querySelector(".slider__arrows");
    let sliderDots = document.querySelector(".slider__dots");

    initImages();
    initArrows();

    if (options.dots) {
        initDots();
    }

    if (options.titles) {
        initTitles();
    }

    if (options.autoplay) {
        initAutoplay();
    }

    function initImages() {
        images.forEach((image, index) => {
            let imageDiv = `<div class="image n${index} ${index === 0? "active" : ""}" style="background-image:url(${images[index].url});" data-index="${index}"></div>`;
            sliderImages.innerHTML += imageDiv;
        });
    }

    function initArrows() {
        sliderArrows.querySelectorAll(".slider__arrow").forEach(arrow => {
            arrow.addEventListener("click", function() {
                let curNumber = +sliderImages.querySelector(".active").dataset.index;
                let nextNumber;
                if (arrow.classList.contains("left")) {
                    nextNumber = curNumber === 0? images.length - 1 : curNumber - 1;
                } else {
                    nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
                }
                moveSlider(nextNumber);
            });
        });
    }

    function initDots() {
        images.forEach((image, index) => {
            let dot = `<div class="slider__dots-item n${index} ${index === 0? "active" : ""}" data-index="${index}"></div>`;
            sliderDots.innerHTML += dot;
        });
        sliderDots.querySelectorAll(".slider__dots-item").forEach(dot => {
            dot.addEventListener("click", function() {
                moveSlider(this.dataset.index);
            })
        })
    }

    function moveSlider(num) {
        sliderImages.querySelector(".active").classList.remove("active");
        sliderImages.querySelector(".n" + num).classList.add("active");
        if (options.dots) {
            sliderDots.querySelector(".active").classList.remove("active");
            sliderDots.querySelector(".n" + num).classList.add("active");
        }
        if (options.titles) changeTitle(num);
    }

    function initTitles() {
        let titleDiv = `<div class="slider__images-title">${images[0].title}</div>`;
        sliderImages.innerHTML += cropTitle(titleDiv, 50);
    }

    function changeTitle(num) {
        if (!images[num].title) return;
        let sliderTitle = sliderImages.querySelector(".slider__images-title");
        sliderTitle.innerText = cropTitle(images[num].title, 50);
    }

    function cropTitle(title, size) {
        if (title.length <= size) {
            return title;
        } else {
            return title.substr(0, size) + "...";
        }
    }

    function initAutoplay() {
        setInterval(() => {
            let curNumber = +sliderImages.querySelector(".active").dataset.index;
            let nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
            moveSlider(nextNumber);
        }, options.autoplayInterval);
    }
}

let sliderOptions = {
    dots: true,
    titles: true,
    autoplay: true,
    autoplayInterval: 5000
};

document.addEventListener("DOMContentLoaded", function() {
    initSlider(sliderOptions);
});