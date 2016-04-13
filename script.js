var fs = require('fs');

var arr = [];
fs.readFile('./pldb-win.txt', 'utf8', (err, data) => {
  if (err) throw err;
  handleData(data);
});

function handleData(res) {
	arr = res.split('\r\n')
	.map((el) => el.replace(/\s|\./g, ''));
	findWord('свинья');
	generateWords(5, ['у','р','з','г','ч','ь','ч','м','у','н','щ','е','а','ф','п','т','т','т',]);
}

function findWord(word) {
	return arr.indexOf(word)!=-1;
}


function generateWords(len, letters) {
	var a = 'к'+generateWord();
	if(findWord(a)) console.log(a);
}

function generateWord() {

}
