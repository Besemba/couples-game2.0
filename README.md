# Couples2.0 - игра в пары
Модифицированная версия игры в пары.<br>
Ссылка на репозиторий предыдущей версии https://github.com/Besemba/couples-game <br>
Сыграть можно по ссылке https://besemba.github.io/couples-game2.0/<br>
### Список обновлений:
- В этой версии игра реализована по методологии ООП с помощью классов и объектов.<br>
- Добавлена возможность выбора отображения на карточках чисел или картинок<br>
- Поле настраивается с помощью селекта, можно выбрать из 4, 16 или 36 карточек<br>
- Таймер меняется в зависимости от количества карточек<br>

### Задание
Напишите игру в пары в браузере.

В этом задании нужно будет разработать простую игру в "пары". Вы, вполне вероятно, с ней уже сталкивались в том или ином виде в настольных или видеоиграх. Игрок видит квадратное поле из карточек, расположенных "рубашкой" вверх, и находит пары одинаковых карточек, открывая их в произвольном порядке. На открытых карточках могут быть картинки, буквы, цифры, пиктограммы и что угодно ещё. Игрок открывает сначала одну карточку, затем вторую. Если обе открытые карточки одинаковы, они остаются открытыми до конца партии. В противном случае они переворачиваются обратно.

Начальное состояние игры при открытии в браузере. На странице рисуется с помощью HTML элементов выводится поле 4 на 4 из квадратных карточек. Каждая карточка содержит цифру от 1 до 8. Пользователь не видит цифры на карточках, то есть карточки расположены "рубашкой" вверх. На поле должно быть строго по 2 карточки с одинаковой цифрой, именно так образуются пары. Все карточки расположены в случайном порядке.

Ход игры. Игрок может нажать на любую карточку. После нажатия карточка открывается, то есть на ней пишется её цифра (карточка "переворачивается"). Далее игрок может открыть вторую карточку. Если обе открытые карточки содержат одинаковую цифру, они остаются открытыми до конца игры. Если же вторая карточка содержит отличную от первой цифру, обе они закрываются, как только игрок откроет следующую карточку. Таким образом на поле остаются открытыми только найденные пары или 1-2 карточки, открытые игроком.

Конец игры. Как только игрок открыл все пары на поле, игра считается завершённой. Под полем с открытыми карточками появляется кнопка "Сыграть ещё раз", при нажатии на которую игра сбрасывается до начального состояния с заново перемешанными карточками.

### Заключение
В ходе выполнения работы была написана игра в пары на языке Javascript. Дизайна в тз не было, поэтому придуман собственный. При открытии игры предлагается выбрать количество карточек на поле, по нажатию на кнопку "Начать игру" запускается игра и таймер, по истечению которого игра заканчивается. Игрок видит квадратное поле из карточек, расположенных "рубашкой" вверх, и находит пары одинаковых карточек, открывая их в произвольном порядке. На открытых карточках располагаются цифры от 1 до 8 или картинки. Игрок открывает сначала одну карточку, затем вторую. Если обе открытые карточки одинаковы, они остаются открытыми до конца партии. В противном случае они переворачиваются обратно. При успешном открытии всех карточек таймер останавливается и на экран выводится сообщение с поздравлением и кнопка, перезапускающая игру.
