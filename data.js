
/*
 1. сетка. массив лет/месяцев/недель/дней/часов... (размерность сетки) от начальной до конечной точки
 -выкидываем из массива часть точек (опр. периоды размерности сетки (пн-пт) и тп.)
 -если нужно выкидываем из остатка точки по ФУНКЦИИ ЧАСТОТЫ. Тогда нужна еще
 СУПЕРРАЗМЕРНОСТЬ. Напр размерность день суперразмерность неделя. Функция частоты от 0 до 1. 
 Считаем ее значение в начале каждого интервала суперразмерности
 кол во точек которые надо оставить в интервале равно этой частоте умножить на кол во точек в интервале
 эти точки раскидываем по интервалу равномерно начиная с заполненной точки и через равные промежутки
 -в результате остается массив действующих точек. По нему считаем выдавать сообщение или нет. 
 По нему же считаем ОБЪЕМ СЕТКИ = ОБЪЕМ ВРЕМЕНИ

 2. Величина нагрузки. Размерность величины. Считанм по ФОРМУЛЕ-ПОСЛЕДОВАТЕЛЬНОСТИ НАГРУЗКИ 
 */



//============================================================ 
//============================================================ 
//============================================================ 
//============================================================ 
var TABLE_aCalendar=[
	//===  значения колонок  ====
	["id"
		,"parentid"
		,"globalsid"
		,"level"
		,"formula"
		,"popravka"
		,"dimension"
		,"name"
		,"period_description"
		,"period_formula"
		,"button_onclick"
		,"style"
	],
	//доступ по имени поля а не по индексу такой:  item[ Gl_aDeals[0].indexOf('name') ]
	//!!! нужно делать доступ по имени поля чтобы всегда можно было добавить поля
	["id"
		,"дело-родитель"
		,"поле для правильной сортировки в дереве(не заполнять,рассчитается в процессе)"
		,"уровень в дереве (не заполнять)"
		,"формула нагрузки дела"
		,"поправка к формуле. например формула - линейный ритм, а поправка - синусоидальный множитель или добавок "
		,"размерность нагрузки"
		,"наименование дела"
		,"описание периодичности"
		,"'функция выводить либо не выводить в тек. список'==''"
		,"функция вызова онлайн ритма, если нужно вывести в виде кнопки"
		,"можно задать особый стиль, подставится в атрибут тэга элемента"
	],
	//зашифрована либо не зашифрована
	["0","","","","","","scripted","scripted","scripted","","",""],
	//===========================

	//workout
	[1,0,0,0,"","","","отжимания вниз головой","по понедельникам","glOcalendar.currDate.getDay()==1","",""],
	[2,0,0,0,"","","","подтягивания на одной руке", "по вторникам","glOcalendar.currDate.getDay()==2","",""],
	[3,0,0,0,"","","","флаг_", "по четвергам","glOcalendar.currDate.getDay()==4","",""],
	[4,0,0,0,"","","","флаг", "по пятницам","glOcalendar.currDate.getDay()==5","",""],
	[5,0,0,0,"","","","спичаги с брусьев на количество", "по субботам","glOcalendar.currDate.getDay()==6","",""],
	[6,0,0,0,"","","","спичаги с рук на количество. ходьба на руках.", "по воскресеньям","(glOcalendar.currDate.getDay()==0)","","font-size:100%"],
    [7,0,0,0,"","","","5 и 5 минут дриблинг с бросками. легкий бег либо ролики либо степ","утро раб. дня на удаленке","(( [1,2,4,5].indexOf(glOcalendar.currDate.getDay())>=0))&&(glOcalendar.currDate.getHours()<11 )","",""],
    [8,0,0,0,"","","","5 и 5 минут дриблинг с бросками. степ с резиной","вечер раб. дня на удаленке","(( [1,2,4,5].indexOf(glOcalendar.currDate.getDay())>=0))&&(glOcalendar.currDate.getHours()>11 )","",""],

	//health and imp
	[101,0,0,0,"switch (4){case 4: '17';case 6: '18';default: '19';}",""," часов дня","не есть до", "по средам","glOcalendar.currDate.getDay()==3","alert('100500')",""],
    [102,0,0,0,"Math.round(glOcalendar.rithmLinear(glOcalendar.toNum(glOcalendar.currDate,'date'),{x:20200101,y:12},{x:20211212,y:20}))"
		 ,"+Math.round((glOcalendar.rithmSin(glOcalendar.toNum(glOcalendar.currDate,'date'),20200101,20200128,2,0,4)))"
		,"раз(вдох и столько же выдох)","дых. в обед равномерно увелич по шагам","","true","",""],

	//imp
	[100001,0,0,0,"","","","6 мин из 60 стоп", "по выходным","true","",""],

	//imp
	[100002,0,0,0,"","","","придумать ритм переноса еды с вечера на пораньше", "","glOcalendar.rithmFrequency(glOcalendar.toNum(glOcalendar.currDate,'date'),{numerator:1,denominator:5})","","font-size:200%"],
    [100003,0,0,0,"","","","придумать ритм без сахара", "","glOcalendar.rithmFrequency(glOcalendar.toNum(glOcalendar.currDate,'date'),{numerator:1,denominator:7})","","font-size:200%"],
    [100004,0,0,0,"","","","придумать ритм физмат", "","glOcalendar.rithmFrequency(glOcalendar.toNum(glOcalendar.currDate,'date'),{numerator:1,denominator:8})","","font-size:200%"],
    [100005,0,0,0,"","","","придумать эволюцию Трз-ритма. Чтобы с удов.", "","glOcalendar.rithmFrequency(glOcalendar.toNum(glOcalendar.currDate,'date'),{numerator:1,denominator:9})","","font-size:200%"],

	//тест 
	/*
	 [1000200,2,0,0,"","","222 ТЕСТ + switch (4){case 4: '17';case 6: '18';default: '19';}", "всегда","","true","alert('100500')"],
	 [1000300,8,0,0,"","","888 ТЕСТ + switch (4){case 4: '17';case 6: '18';default: '19';}", "всегда","","true","alert('100500')"],
	 [1000400,2,0,0,"","","222 ТЕСТ + switch (4){case 4: '17';case 6: '18';default: '19';}", "всегда","","true","alert('100500')"],
	 [1000500,1000200,0,0,"","","потомок 222 ТЕСТ + switch (4){case 4: '17';case 6: '18';default: '19';}", "всегда","","true","alert('100500')"],
	 */

];
//============================================================ 
//============================================================ 
//============================================================ 
//============================================================ 

