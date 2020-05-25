var width = [20, 25, 33.333, 50, 100];
var index = 3
var currentWidth = width[index];
var tmp = index;
var column = [1, 2, 3, 4, 5];
var colorNumber = [1, 2, 3, 4, 5];

for (var i = 0; i <= column.length - 1; i++) {
	column[i] = document.getElementById("col-" + (i + 1));
	colorNumber[i] = document.getElementById("color-code" + (i + 1));
}

//Function generates random color and assigns it to variable
var r, g, b;


(function colorsGenerator() {
	for (var i = 0; i < column.length; i++) {
		r = Math.floor(Math.random() * 256);
		g = Math.floor(Math.random() * 256);
		b = Math.floor(Math.random() * 256);
		if (column[i].querySelector('i.locked')) {

		} else {
			column[i].style.backgroundColor = "rgb(" + r + ", " + g + ", " + b + ")";
			colorNumber[i].value = column[i].style.backgroundColor;
		}
		colGen = colorsGenerator;
	}
	
})();

function addNewColumn() {
	if (index != 1) {
		index--;
		for (var i = 0; i < column.length; i++) {
			column[i].style.width = width[index] + "%";
			
		}
		column[tmp].classList.remove("hide");
		currentWidth = width[index];
		tmp += 1;
	}
}

function removeColumn() {
	if (index != 5) {
		index++;
		for (var i = 0; i < column.length; i++) {
			column[i].style.width = width[index] + "%";
		}
		column[tmp - 1].classList.add("hide");
		currentWidth = width[index];
		tmp -= 1;
	}

}

function swapColorNext(m) {
	var tempBg, tempTx;
	//swap columns
	tempBg = column[m + 1].style.backgroundColor
	column[m + 1].style.backgroundColor = column[m].style.backgroundColor;
	column[m].style.backgroundColor = tempBg;

	//swap rgb values
	tempTx = colorNumber[m + 1].value;
	colorNumber[m + 1].value = colorNumber[m].value;
	colorNumber[m].value = tempTx;

	//check if column is locked
	var isLocked, isLockedFirstCol, isLockedNext;

	isLocked = column[m].querySelectorAll('i')[1].classList.contains("locked");
	isLockedNext = column[m+1].querySelectorAll('i')[1].classList.contains("locked");
	isLockedFirstCol = column[m].querySelectorAll('i')[0].classList.contains("locked");
	

	if(isLocked !== true && isLockedNext){
		if(m !== 0){
			lock(column[m].querySelectorAll('i')[1]);
			lock(column[m+1].querySelector('i.locked'));
		}else if(m === 0){
			lock(column[m].querySelectorAll('i')[0]); 
			lock(column[m + 1].querySelectorAll('i')[1]);
		}
	}else if(isLocked && isLockedNext !== true){
		if(m !== 0){
			lock(column[m].querySelector('i.locked')); 
			lock(column[m + 1].querySelectorAll('i')[1]); 
		}else if(m === 0){
			lock(column[m].querySelector('i.locked')); 
			lock(column[m + 1].querySelectorAll('i')[1]);
		}
	}else if(isLockedFirstCol && isLockedNext === false){
		lock(column[m].querySelectorAll('i')[0]);
		lock(column[m + 1].querySelectorAll('i')[1]);
	}
	
}

function swapColorPrev(value) {
	var tempBg, tempTx;

	//swap columns
	tempBg = column[value].style.backgroundColor
	column[value].style.backgroundColor = column[value - 1].style.backgroundColor;
	column[value - 1].style.backgroundColor = tempBg;

	//swap rgb values
	tempTx = colorNumber[value].value;
	colorNumber[value].value = colorNumber[value - 1].value;
	colorNumber[value - 1].value = tempTx;

	isLocked = column[value].querySelectorAll('i')[1].classList.contains("locked");

	isLockedPrev = column[value-1].querySelectorAll('i')[1].classList.contains("locked");

	isLockedFirstCol = column[value].querySelectorAll('i')[0].classList.contains("locked");

	
	if(isLocked && isLockedPrev === false && value !== 1){
		lock(column[value].querySelector('i.locked')); 
		lock(column[value-1].querySelectorAll('i')[1]); 
	} else if(isLocked === false && isLockedPrev && value !== 1){
		lock(column[value].querySelectorAll('i')[1]);
		lock(column[value-1].querySelector('i.locked')); 
	} else if(isLockedFirstCol === false && isLocked === true && value === 1){
		lock(column[value].querySelector('i.locked')); 
		lock(column[value-1].querySelectorAll('i')[0]);
	} else if(isLockedFirstCol === true && isLocked === false && value === 1){
		lock(column[value].querySelectorAll('i')[0]);
		lock(column[value-1].querySelector('i.locked')); 
	}



}


function lock(value) {
	//lock icon animation
	var lockIcon = ['icon-lock-open-alt', 'icon-lock', 'locked'];
	for(var i=0; i< lockIcon.length; i++){
		value.classList.toggle(lockIcon[i]);
	}
}

addEventListener("keyup", function (event) {
	if (event.keyCode === 13 || event.which === 13) {
		for (var i = 0; i < column.length; i++) {
			if (column[i].querySelector('i.locked')) {
				colorNumber[i].value = column[i].style.backgroundColor;
			} else {
				column[i].style.backgroundColor = colorNumber[i].value;
			}
		}
	}
});

function saveFile(){
	var saveFileWindow = document.querySelector(".overlay");
	saveFileWindow.classList.add("show");
}
//export function
function exportFile(data, filename, type) {
	var file = new Blob([data], { type: type });
	if (window.navigator.msSaveOrOpenBlob) // IE10+
		window.navigator.msSaveOrOpenBlob(file, filename);
	else { // Others
		var a = document.createElement("a"),
			url = URL.createObjectURL(file);
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		setTimeout(function () {
			document.body.removeChild(a);
			window.URL.revokeObjectURL(url);
		}, 0);
	}
}