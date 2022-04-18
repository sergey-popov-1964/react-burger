Проект выполнен в процессе обучения в Яндекс.Практикуме на курсе React разработчик.

Первоначально проект был создан для реального заказчика. Но планы заказчика изменились. В данный момент проект свободен.


# Используемые технологии

Проект представляет собой веб-приложение с использованием следующих технологий.
- React 17;
- TypeScript;
- react-router-dom;
- react-redux;
- Ограничение доступа к некоторым страницам для не зарегистрированных пользователей;
- Регистрация м авторизация пользователей
- Использование технологии Drag and Drop при создании заказа (библиотека react-dnd);
- Плавное открытие и закрытие попапа;
- Закрытие попапов при клике на область оверлея и при нажатии на клавишу Esc;
- Валидация формы на правильность ввода данных;

# Структура сайта

- Приложение не адаптировано для мобильных версий;
- Сайт состоит из нескольких секций;
- Header;
- Секция с элементами бургера;
- Секция с собранным заказом;
- Элементы переносятся в заказ мышью с помощью Drag and Drop;
- Элементы заказа можно перетаскивать внутри заказа с помощью мыши и удалять из заказа;
- Происходит автоматический подсчет итоговой суммы заказа;
- Когда заказ сформирован его можно отправить на исполнение кликом на кнопку "Оформить заказ";
- При отправке автоматически формируется номер заказа и его наименование
- Формирование номера и наименование происходит на бэкэнде. Разработка бэкэнда не входила в рамки проектной работы;
- По клику на кнопке "Личный кабинет" происходит переход на страницу личного кабинета;
- Если пользователь еще не авторизовался, происходит переадресация на страницу где можно авторизоваться или зарегистрироваться;
- Просмотри и сборка заказа возможна для неавторизованных пользователей. Но при клике на кнопке "Оформить заказ" неавторизованный пользователь переадресуется на страницу авторизаци и после авторизации возобновляется процесс оформления заказа


