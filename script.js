var fs = require('fs');
var Combinatorics = require('js-combinatorics');

var arr = [];
var found = [];
fs.readFile('./pldb-win.txt', 'utf8', (err, data) => {
  if (err) throw err;
  handleData(data);
});

function handleData(res) {
	arr = res.split('\r\n')
	.map((el) => el.replace(/\s|\./g, ''));
	generateWords(5, ['у','р','з','г','ч','ь','ч','м','у','н','щ','е','а','ф','п','т','т','т',]);
}

function findWord(word) {
	return arr.indexOf(word)!=-1;
}


function generateWords(len, letters) {
	var w;
	var cmb2;
	var cmb = Combinatorics.combination(letters, len);
	console.log(cmb.toArray().length);
	var i = 0;
	while(a = cmb.next()) {
		cmb2 = Combinatorics.permutation(a);
		while(b = cmb2.next()) {
			w = b.join('');
			if(findWord("к"+w)) {
				console.log("к"+w);
				found.push("к"+w);
			}
		}
	}
	fs.writeFile('res.txt', found.join('\n '), (err) => {
	  if (err) throw err;
	  console.log('It\'s saved!');
	});

}

