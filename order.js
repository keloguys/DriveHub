document.getElementById('car-model').addEventListener('change', function() {
    var a = this.value;
    var b = document.getElementById('car-details');
    var c = document.getElementById('car-image');
    if (a) {
        b.style.display = 'flex';
        c.style.backgroundImage = `url('image2/${a}.jpg')`;
        b.classList.add('animated');
    } else {
        b.style.display = 'none';
    }
});

document.querySelectorAll('.color-option').forEach(function(d) {
    d.addEventListener('click', function() {
        var e = this.getAttribute('data-color').replace('#', '');
        var f = document.getElementById('car-model').value;
        if (f) {
            document.getElementById('car-image').style.backgroundImage = `url('image2/${f}-${e}.jpg')`;
        } else {
            alert('Пожалуйста, сначала выберите модель автомобиля.');
        }
    });
});

document.getElementById('submit-order').addEventListener('click', function(g) {
    g.preventDefault();
    var h = document.getElementById('car-model').value;
    var i = document.getElementById('car-configuration').value;
    var j = document.getElementById('winter-tires').checked;
    var k = document.getElementById('extended-warranty').checked;
    var l = document.getElementById('tinted-windows').checked;
    var m = document.getElementById('parking-sensors').checked;
    var n = document.getElementById('phone-number').value;
    var o = document.getElementById('email').value;
    if (!h) {
        alert('Пожалуйста, выберите модель автомобиля.');
        return;
    }
    if (!n || !o) {
        alert('Пожалуйста, заполните телефон и email.');
        return;
    }
    if (!n.startsWith('+7')) {
        alert('Номер телефона должен начинаться с +7.');
        return;
    }
    var p = `
        Модель: ${h}
        Комплектация: ${i}
        Зимняя резина: ${j ? 'Да' : 'Нет'}
        Расширенная гарантия: ${k ? 'Да' : 'Нет'}
        Тонированные стекла: ${l ? 'Да' : 'Нет'}
        Парковочные датчики: ${m ? 'Да' : 'Нет'}
        Телефон: ${n}
        Email: ${o}
    `;
    alert('Заказ оформлен!\n\n' + p);
    window.location.href = 'index.html';
});