window.addEventListener('DOMContentLoaded', function() {
    
    'use strict';

    //Об'являємо змінні 
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    //Функція, яка ховає таби
    let hideTabContent = (a) => {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    };

    // Показує перший таб
    hideTabContent(1);

    //Функція, яка показує таби
    let showTabContent = (b) => {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    };

    // Перебір кнопок та табів
    info.addEventListener('click', function(event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    // Створення таймеру зворотнього відліку
    let deadline = '2021-03-01'; // Оголошення кінцевої дати
    
    // Функція, яка вираховує з мілісекунд секунди, хвилини та години
    let getTimeRemaining = (endtime) => {
        let t = Date.parse(endtime) - Date.parse(new Date()),
        seconds = Math.floor( (t/1000) % 60 ),
        minutes = Math.floor( (t/1000/60) % 60 ),
        hours = Math.floor( (t / (1000*60*60) ) );

        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    };

    //Функція, яка вставляє таймер на сайт
    let setClock = (id, endTime) =>  {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

            // Функція, яка оновлює таймер кожної секунди
            function updateClock() {
                let t = getTimeRemaining(endTime);
                hours.textContent = t.hours;
                minutes.textContent = t.minutes;
                seconds.textContent = t.seconds;

                if (t.total <= 0) {
                    clearInterval(timeInterval);
                    hours.textContent = '00';
                    minutes.textContent = '00';
                    seconds.textContent = '00';
                }

                if (t.hours >=0 && t.hours <= 9) {
                    hours.textContent = '0' + t.hours;
                }

                if (t.minutes >=0 && t.minutes <= 9) {
                    minutes.textContent = '0' + t.minutes;
                }
                
                if (t.seconds >=0 && t.seconds <= 9) {
                    seconds.textContent = '0' + t.seconds;
                }
            }
    };

    setClock('timer', deadline);

    // Модальне вікно для "Дізнатися більше" під таймером
    let more = document.querySelector('.more'),
        descrTab = document.querySelectorAll('.description-btn'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

        more.addEventListener('click', function() {
            overlay.style.display = 'block';
            this.classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        });

        // Модальне вікно для "Дізнатися детальніше" в табах
        for (let i = 0; i < descrTab.length; i++) {
            descrTab[i].addEventListener('click', function() {
                overlay.style.display = 'block';
                this.classList.add('more-splash');
                document.body.style.overflow = 'hidden';
            });
       }

        close.addEventListener('click', function() {
            overlay.style.display = 'none';
            more.classList.remove('more-splash');
            document.body.style.overflow = '';
        });

    // Відправка даних з форми
    let message = {
        loading: 'Завантаження...',
        success: "Дякуємо! Скоро ми з вами зв'яжемось",
        failure: 'Щось пішло не так...'
    };

    let form = document.querySelector('.main-form'),
        formContact = document.querySelector('.form-contact'),
        input = form.getElementsByTagName('input'),
        //inputContact = formContact.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

    statusMessage.classList.add('status');

    function sendForm(elem) {
        elem.addEventListener('submit', function(event) {
            event.preventDefault();
            elem.appendChild(statusMessage);
            let formData = new FormData(elem);
            function postData(data) {
                return new Promise(function(resolve, reject) {
                    let request = new XMLHttpRequest();
                    request.open('POST', 'server.php');
                    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
                    request.onreadystatechange = function() {
                        if (request.readyState < 4) {
                            resolve()
                        } else if (request.readyState == 4) {
                            if (request.status == 200 && request.status < 3) {
                                resolve()
                            } else {
                                reject()
                            }
                        }
                    }

                    let obj = {};
                    data.forEach(function(value, key) {
                        obj[key] = value;
                    });

                    let json = JSON.stringify(obj);

                    request.send(json);
                });
            }
            
            function clearInput() {
                for (let i = 0; i < input.length; i++) {
                    input[i].value = '';
                }
            }

            postData(formData)
                    .then(() => statusMessage.innerHTML = message.loading)
                    .then(() => statusMessage.innerHTML = message.success)
                    .catch(() => statusMessage.innerHTML = message.failure)
                    .then(clearInput);
        });
    }

    sendForm(form);
    sendForm(formContact);

    // Модальне вікно
    // form.addEventListener('submit', function(event) {
    //     event.preventDefault();
    //     form.appendChild(statusMessage);

    //     let request = new XMLHttpRequest();
        
    //     request.open('POST', 'server.php');
    //     request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

    //     let formData = new FormData(form);

    //     let obj = {};
    //     formData.forEach(function(value, key) {
    //         obj[key] = value;
    //     });

    //     let json = JSON.stringify(obj);

    //     request.send(json);
       
    //     request.addEventListener('readystatechange', function() {
    //         if (request.readyState < 4) {
    //             statusMessage.innerHTML = message.loading;
    //         } else if (request.readyState === 4 && request.status == 200) {
    //             statusMessage.innerHTML = message.success;
    //         } else {
    //             statusMessage.innerHTML = message.failure;
    //         }
    //     });

    //     for (let i = 0; i < input.length; i++) {
    //         input[i].value = '';
    //     }
    // });

    // // Контактна форма
    // formContact.addEventListener('submit', function(eventContact) {
    //     eventContact.preventDefault();
    //     formContact.appendChild(statusMessage);

    //     let requestContact = new XMLHttpRequest();
        
    //     requestContact.open('POST', 'server.php');
    //     requestContact.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

    //     let formDataContact = new FormData(formContact);

    //     let objContact = {};
    //     formDataContact.forEach(function(valueContact, keyContact) {
    //         objContact[keyContact] = valueContact;
    //     });

    //     let jsonContact = JSON.stringify(objContact);

    //     requestContact.send(jsonContact);
       
    //     requestContact.addEventListener('readystatechange', function() {
    //         if (requestContact.readyState < 4) {
    //             statusMessage.innerHTML = message.loading;
    //         } else if (requestContact.readyState === 4 && requestContact.status == 200) {
    //             statusMessage.innerHTML = message.success;
    //         } else {
    //             statusMessage.innerHTML = message.failure;
    //         }
    //     });

    //     for (let i = 0; i < inputContact.length; i++) {
    //         inputContact[i].value = '';
    //     }
    // });

    // Слайдер
    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    function showSlides(n) {
        if (n > slides.length) {
            slideIndex = 1;
        }
        
        if (n < 1) {
            slideIndex = slides.length;
        }

        //slides.forEach((item) => item.style.display = 'none');
        dots.forEach((item) => item.classList.remove('dot-active'));
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = 'none';
        }

        // for (let i = 0; i < dots.length; i++) {
        //     dots[i].classList.remove('dot-active');
        // }
        slides[slideIndex -1].style.display = 'block';
        dots[slideIndex -1].classList.add('dot-active');
        
    }

    showSlides(slideIndex);

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    prev.addEventListener('click', function() {
        plusSlides(-1);
    });

    next.addEventListener('click', function() {
        plusSlides(1);
    });

    dotsWrap.addEventListener('click', function(event) {
        for (let i = 0; i < dots.length +1; i++) {
            if (event.target.classList.contains('dot') && event.target == dots[i - 1]) {
                currentSlide(i);
            }
        }
    });
});