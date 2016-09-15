var level = 1;
var numberOfFaces = 5;
// set to div dimensions minus 100 since smiley.png resolution is 100x100
var maxHeight = 400;
var maxWidth = 400;
function generateFaces() {
  for (var i = 0; i < numberOfFaces; i++) {
	var img = document.createElement("img");
	img.src = "http://home.cse.ust.hk/~rossiter/mooc/matching_game/smile.png";
	// img.id = i; for debugging reason to make sure similies added by order to DOM
	img.style.top = Math.floor(Math.random() * maxHeight) + "px";
	img.style.left = Math.floor(Math.random() * maxWidth) + "px";
	// two ways of adding the smilies: inserting every smiley before last child of leftSide
	//document.getElementById("leftSide").insertBefore(img,document.getElementById("leftSide").lastChild);
	// or just appending current smile (adding him to the end of leftSide)
	document.getElementById("leftSide").appendChild(img);
  }
  // copy left side smilies to right side
  document.getElementById("rightSide").appendChild(document.getElementById("leftSide").cloneNode(true));
  // delete last child (last smiley on the right). rightSide's child is another div (leftSide)
  document.getElementById("rightSide").lastChild.removeChild(document.getElementById("rightSide").lastChild.lastChild);
	// add function that gets you to next level when you click the right smiley
  document.getElementById("leftSide").lastChild.onclick = function nextLevel(event) {
  event.stopPropagation();
  numberOfFaces += 5;
  level += 1;
	  deleteFaces();
  generateFaces();
  };
	document.getElementsByTagName("body")[0].onclick = function gameOver(event) {
	document.getElementById("leftSide").lastChild.src = "smile-hover.png";
	alert("Game Over!\nYou reached to level " + level + "!\nGood job :)");
		document.getElementsByTagName("body")[0].onclick = null;
		document.getElementById("leftSide").lastChild.onclick = null;
	if (confirm("Play again?")) {
	  level = 1;
	  numberOfFaces = 5;
	  deleteFaces();
	  generateFaces();
	};
  };
};
function deleteFaces() {
  // delete left side smilies - all of them under the leftSide div
  while (document.getElementById("leftSide").firstChild) {
		document.getElementById("leftSide").removeChild(document.getElementById("leftSide").firstChild);
  }
  // delete right side smilies - all of them under rightSide div under leftSide divs (level divs)
  while (document.getElementById("rightSide").firstChild) {
		document.getElementById("rightSide").removeChild(document.getElementById("rightSide").firstChild);
  }
}
