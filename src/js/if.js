

//объект-наблюдатель, указать для него функцию для вызова и настройки отслеживания
var options = {
    root: document.querySelector('#scrollArea'),
    rootMargin: '0px',
    threshold: 1.0
}
var callback = function(entries, observer) {
    /* Content excerpted, show below */
};
var observer = new IntersectionObserver(callback, options);

//Параметр threshold со значением 1.0 означает что функция 
//будет вызвана при 100 % пересечении объекта(за которым мы следим) с объектом root


// Целевой элемент, который будет наблюдаться
var target = document.querySelector('#listItem');
observer.observe(target);

//Всякий раз, когда цель достигает порогового значения, указанного
//для IntersectionObserver, вызывается колбэк - функция callback.Где callback
//получает список объектов IntersectionObserverEntry(en - US) и наблюдателя:

var callback = function(entries, observer) {
    entries.forEach(entry => {
        entry.time;               // a DOMHightResTimeStamp indicating when the intersection occurred.
        entry.rootBounds;         // a DOMRectReadOnly for the intersection observer's root.
        entry.boundingClientRect; // a DOMRectReadOnly for the intersection observer's target.
        entry.intersectionRect;   // a DOMRectReadOnly for the visible portion of the intersection observer's target.
        entry.intersectionRatio;  // the number for the ratio of the intersectionRect to the boundingClientRect.
        entry.target;             // the Element whose intersection with the intersection root changed.
        entry.isIntersecting;     // intersecting: true or false
    });
};

//Обратите внимание,
//что колбэк - функция запускается в главном потоке и должна выполняться как можно быстрее, поэтому если
//что - то отнимает много времени, то используйте Window.requestIdleCallback().

//Также обратите внимание, что если вы указали опцию root,
//целевой элемент должен быть потомком корневого элемента.



let ul = document.querySelector('ul')
let n = 1

// функция создания элемента списка
function createLi(){
    li = document.createElement('li')
    li.innerHTML = `${++n} item`
    ul.append(li)
}

// для того, чтобы все время наблюдать за последним элементом списка
// мы используем нечто вроде замыкания
// прекращаем наблюдать за целевым элементом после создания очередного li
// и начинаем наблюдать за этим новым (последним) элементом
let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            createLi()
        }
        observer.unobserve(entry.target)
        observer.observe(document.querySelector('li:last-child'))
    })
}, {
    threshold: 1
})

observer.observe(document.querySelector('li'))