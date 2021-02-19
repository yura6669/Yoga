window.addEventListener('DOMContentLoaded', function() {
    
    'use strict';

    //Об'являємо змінні 
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    //Функція, яка ховає таби
    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    // Показує перший таб
    hideTabContent(1);

    //Функція, яка показує таби
    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

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
    let deadline = '2021-02-20'; // Оголошення кінцевої дати
    
    // Функція, яка вираховує з мілісекунд секунди, хвилини та години
    function getTimeRemaining(endtime) {
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
    }

    //Функція, яка вставляє таймер на сайт
    function setClock(id, endTime) {
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
    }

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
        
});