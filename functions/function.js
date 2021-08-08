// Code By Webdevtrick ( https://webdevtrick.com )
var btn = document.querySelector('.add');
var remove = document.querySelector('.draggable');

//Cuando le haces clik a una card empieza el drag
function dragStart(e) {
  this.style.opacity = '0.4';
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text', this.innerHTML);
  e.dataTransfer.setData('text2', this.className);

  
  // var dataList = e.dataTransfer.items;

  // dataList.add(this.innerHTML,'text');
  // dataList.add(this.className,'classname');
  // dataList.add(this.id, 'value');

  // e.dataTransfer.setData('text/html', this);

};

//cuando pasa por arriba de uno hace un efecto
function dragEnter(e) {
  this.classList.add('over');
}

// saca el efecto de over cuando sale 
function dragLeave(e) {
  e.stopPropagation();
  this.classList.remove('over');
}

function dragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  return false;
}

function dragDrop(e) {
  if (dragSrcEl != this) {
    // console.log(this.className) // nuevo
    // console.log(dragSrcEl.className) // ant

    dragSrcEl.innerHTML = this.innerHTML;
    dragSrcEl.className = this.className;

    console.log(e.dataTransfer.getData('text2'))
   
    this.innerHTML = e.dataTransfer.getData('text');

    this.className = e.dataTransfer.getData('text2');


    // btns = dragSrcEl.innerHTML
    // console.log(this) // nuevo
    // console.log(dragSrcEl) // ant
    // nuevo = dragSrcEl;

    // dragSrcEl.value = this.value;
    // this.value = nuevo.value;

    // dragSrcEl.innerHTML = this.innerHTML;
    // this.innerHTML = e.dataTransfer.getData('text/html');

  }
  return false;
}

function dragEnd(e) {
  var listItens = document.querySelectorAll('.draggable');
  [].forEach.call(listItens, function(item) {
    item.classList.remove('over');
  });
  this.style.opacity = '1';
}



function addEventsDragAndDrop(el) {
  el.addEventListener('dragstart', dragStart, false);
  el.addEventListener('dragenter', dragEnter, false);
  el.addEventListener('dragover', dragOver, false);
  el.addEventListener('dragleave', dragLeave, false);
  el.addEventListener('drop', dragDrop, false);
  el.addEventListener('dragend', dragEnd, false);
}

var listItens = document.querySelectorAll('.draggable');
[].forEach.call(listItens, function(item) {
  addEventsDragAndDrop(item);
});

var listItens = document.querySelectorAll('.empty');
[].forEach.call(listItens, function(item) {
  addEventsDragAndDrop(item);
});


//-----------------------------------------

function addNewItem() {
  // var ul = document.querySelectorAll('ul');
  var newItem = document.querySelector('.input').value;
  if (newItem != '') {
    document.querySelector('.input').value = '';
    var li = document.createElement('li');
    var attr = document.createAttribute('draggable');
    var ul = document.querySelector('ul');
    console.log(ul);
    li.className = 'draggable';
    attr.value = 'true';
    li.setAttributeNode(attr);
    li.appendChild(document.createTextNode(newItem));
    ul.appendChild(li);
    addEventsDragAndDrop(li);
  }
}

btn.addEventListener('click', addNewItem);