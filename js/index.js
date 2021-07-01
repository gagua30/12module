// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления
const minWeight = document.querySelector('.minweight__input'); //поле с минимальным значением
const maxWeight = document.querySelector('.maxweight__input');//поле с максимальным значением
// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
function display(){
     
  
  
  fruitsList.innerHTML = '';
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits

  for (let i = 0; i < fruits.length; i++) {
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild
    const li = document.createElement("li");
    //создаем div c class="fruit__info"
    const divBlock = document.createElement("div");
    divBlock.classList.add("fruit__info");
    //создаем дивы со значениями
    const div1 = document.createElement("div");
    const div2 = document.createElement("div");
    const div3 = document.createElement("div");
    const div4 = document.createElement("div");
    //заполняем divs инфой
    div1.textContent = `index: ${i}`;
    div2.textContent = `kind: ${fruits[i].kind}`;
    div3.textContent = `color: ${fruits[i].color}`;
    div4.textContent = `weight: ${fruits[i].weight}`;
    //добавляем элементы по порядку
    divBlock.appendChild(div1);
    divBlock.appendChild(div2);
    divBlock.appendChild(div3);
    divBlock.appendChild(div4);
    li.appendChild(divBlock);
    fruitsList.appendChild(li);
    switch (fruits[i].color) {
      case "фиолетовый":
        li.className = "fruit__item fruit_violet";
        break;
      case "зеленый":
        li.className = "fruit__item fruit_green";
        break;
      case "розово-красный":
        li.className = "fruit__item fruit_carmazin";
        break;
      case "желтый":
        li.className = "fruit__item fruit_yellow";
        break;
      case "светло-коричневый":
        li.className = "fruit__item fruit_lightbrown";
        break;
      case "серый":
        li.className = "fruit__item fruit_gray";
        break;
      case "черный":
        li.className = "fruit__item fruit_black";
        break;
      case "красный":
        li.className = "fruit__item fruit_red";
        break;
    }
  }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
function shuffleFruits(){
  let result = [];
    
    while (fruits.length > 0){
    let random = getRandomInt(0, fruits.length - 1 );
    let elem = fruits.splice(random, 1);
    let el = elem[0];
    result.push(el);
    
  } 
  fruits = result;
  console.log(fruits)
  return fruits;
  

} 
 
//кнопка перемешивания
shuffleButton.addEventListener('click', () => {
  
  shuffleFruits();
  display();
});




/*** ФИЛЬТРАЦИЯ ***/

// Функция фильтрация массива
const filterFruits = () => {
  let itemFilter = fruits.filter((item) => {
      
    return item.weight >= minWeight.value  && item.weight <= maxWeight.value;
    
    
  });
  fruits = itemFilter;
  
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

//сортирую по алфавиту цвета :)
const comparationColor = (a, b) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
  fruits.sort(function (a, b){
    if (a.color > b.color){
      return 1;
    }
    if(a.color < b.color){
      return -1;
    }
    return 0;
  })
};

//пузырьковая сортировка
const sortAPI = {
  bubbleSort(arr, comparation) {
    const n = arr.length;
    for(let i = 0; i < n-1; i++){
      for(let j = 0; k < n-1-i; j++){
        if(comparation(arr[j].color, arr[j+1].color)){
          let temp = arr[j+1]; 
                   arr[j+1] = arr[j]; 
                   arr[j] = temp; 
        }
      }
    }
    


  },

  quickSort(arr, comparation) {
    // TODO: допишите функцию быстрой сортировки
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
    if (sortKind == 'bubbleSort')
    {
      sortKind = 'quickSort';
      sortKindLabel.textContent = sortKind;
    }
    else
    {
      sortKind = 'bubbleSort';
      sortKindLabel.textContent = sortKind;
    }
  });


sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  // TODO: вывести в sortTimeLabel значение sortTime
});


//запускаю сортировку
sortActionButton.addEventListener('click', () => {
  comparationColor();
  display();
  
});


/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  let fruit = {
    "kind": kindInput.value,
    "color": colorInput.value,
    "weight": weightInput.value,
  }
  
  fruits.push(fruit);
  
  display();
});


