var db2 = [];
var found = [];
var start = 0;
var content = document.getElementById('content');

function hasWord(word, letters) {
	word = word.split('');
	for(var i=0; i<word.length; i++) {
		if(letters.indexOf(word[i]) != -1) {
			letters.splice(letters.indexOf(word[i]), 1);
		} else {
			return false;
		}
	}
	return true;
}


function contains(word, let_arr) {
	for (var i = let_arr.length - 1; i >= 0; i--) {
		if(word.indexOf(let_arr[i]) != -1) return true;
	};
	return false;
	
}
document.getElementById('mainForm').addEventListener('submit', function(e) {
	e.preventDefault();
	//content.innerHTML = "";
	found = [];
	var len = document.getElementById('len').value;
	var letter = document.getElementById('letter').value;
	var words = document.getElementById('words').value;
	if(parseInt(len)<2 || parseInt(len)>20) {
		alert('введите длину от 2 до 20');
		return;
	}
	if(letter.length != 1 || !(/^[а-яА-Я]$/).test(letter)) {
		alert('введите одну русскую первую букву');
		return;
	}
	words = words.replace(/[^а-яА-Я]/g, "").toLowerCase();
	if(words.length<1 || words.length>30 ) {
		alert('введите множество букв длиной от 1 до 30');
		return;
	}
	words = words.split("");
	letter = letter.toLowerCase();
	len = len.toLowerCase();
	console.log(words, letter, len, db2.length);
	handleData(words, letter, len);
})

function handleData(words, letter, len) {
	start = Date.now();
	db2 = db.filter(function(el) { return (el.length==len && el.substr(0,1)==letter && contains(el, words)) });
	db2.forEach(function(el) {
		if(hasWord(el.substr(1), words.slice())) {
			console.log(el);
			found.push(el);
			addWord(el);
		}
	});
	addWord("finished, found "+found.length+" words");
	addWord("time is "+(Date.now()-start)+"ms<br>");
	//generateWords(letter, len-1, words);
}



function generateWords(firstLetter, len, letters) {
	var w;
	var si;
	var cmb2;
	var cmb = Combinatorics.combination(letters, len);
	console.log(cmb.toArray().length);
	var i = 0;
	while(a = cmb.next()) {
		cmb2 = Combinatorics.permutation(a);
		while(b = cmb2.next()) {
			w = b.join('');
			if(findWord(firstLetter+w)) {
				if(found.indexOf(firstLetter+w)==-1) {
					console.log(firstLetter+w);
					found.push(firstLetter+w);
					addWord(firstLetter+w);
				}
			}
		}
	}
	addWord("finished, found "+found.length+" words<br>");
	addWord(Date.now()-start);
}

function addWord(word) {
	content.innerHTML = content.innerHTML + '<br>' + word;
}

