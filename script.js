document.addEventListener('DOMContentLoaded', () =>{
	console.log("Loaded.")

	const fieldId = document.getElementById("field")
	const squares = []
	const saved = []
	const width = 4

	const colors = {
		"": "#EEE4DA",
		"2": "#cccccc",
		"4": "#b3b3b3",
		"8": "#ffaa80",
		"16": "#ff884d",
		"32": "#ff661a",
		"64": "#ff0000",
		"128": "#ffe066",
		"256": "#ffd633",
		"512": "#ffcc00",
		"1024": "#e6b800",
		"2048": "#cca300"
	}
	let prvic = false

	function changeValues(div, value) {
		div.innerHTML = value
		div.style.backgroundColor = colors[value]
	}

	function saveGrid() {
		const currentGrid = []
		for (const div of squares) {
			currentGrid.push(div.innerHTML)
		}
		saved.push(currentGrid)
	}

	function popSavedGrid() {
		if (saved.length > 0) {
			const lastGrid = saved.pop()
			for (let i = 0; i < squares.length; i++) {
				changeValues(squares[i], lastGrid[i])
			}
		}
	}

	function updateGrid() {
		const newGrid = []
		for (let i = 0; i < width*width; i++) {
			const div = document.createElement("div")
			div.classList.add("grid-item")
			if (prvic) {
				if(i == 5) {
					changeValues(div, 2)
				}
				else if (i==9) {
					changeValues(div, 2)
				}
			} 
			fieldId.appendChild(div)
			squares.push(div)
		}
		prvic = false
	}

	function randomNumber() {
		const emptySquares = []
		for (let div of squares) {
			if (div.innerHTML == "") {
				emptySquares.push(div)
			}
		}
		if (emptySquares.length == 0) {
			// TODO: RESET GAME
		} 
		else {
			const random = emptySquares[Math.floor(Math.random() * emptySquares.length)];
			changeValues(random, 2)
		}
	}

	function newLine(line) {
		let didMove = false;
		for (let i = 0; i < line.length; i++) {
			let value = Number(line[i].innerHTML)
			for (let j = i + 1; j < line.length; j++) {
				const value2 = Number(line[j].innerHTML)
				if (value2 != "") {
					if (value == "") {
						value = value2
						changeValues(line[i], value2)
						changeValues(line[j], "")
						didMove = true
					}
					else if (value == value2) {
						const newValue = value + value2
						changeValues(line[i], newValue)
						changeValues(line[j], "")
						didMove = true
						break	
					}
					else {
						break
					}
				}
			}
		}
		return didMove
	}

	function pressDown() {
		genNum = false
		for (let i = 0; i < width; i++) {
			line = [
				squares[(3*width+i)],
				squares[(3*width+i) - 4],
				squares[(3*width+i) - 8],
				squares[(3*width+i) - 12],
			]
			if (newLine(line)) {
				genNum = true
			}
		}
		if (genNum) {
			randomNumber()
		}
	}

	function pressUp() {
		genNum = false
		for (let i = 0; i < width; i++) {
			line = [
				squares[i],
				squares[i + 4],
				squares[i + 8],
				squares[i + 12],
			]
			if (newLine(line)) {
				genNum = true
			}
		}
		if (genNum) {
			randomNumber()
		}
	}

	function pressLeft() {
		genNum = false
		for (let i = 0; i < width; i++) {
			line = [
				squares[(width*i)],
				squares[(width*i) + 1],
				squares[(width*i) + 2],
				squares[(width*i) + 3],
			]
			if (newLine(line)) {
				genNum = true
			}
		}
		if (genNum) {
			randomNumber()
		}
	}

	function pressRight() {
		genNum = false
		for (let i = 1; i <= width; i++) {
			line = [
				squares[(width*i - 1)],
				squares[(width*i - 1) - 1],
				squares[(width*i - 1) - 2],
				squares[(width*i - 1)- 3],
			]
			if (newLine(line)) {
				genNum = true
			}
		}
		if (genNum) {
			randomNumber()
		}
	}

	updateGrid()
	randomNumber()
	randomNumber()




	document.addEventListener('keydown', keyAction);

	function keyAction(e) {
		const key = e.code
		switch (key) {
			case "KeyW":
			case "ArrowUp":
				console.log("Up")
				pressUp()
			break
			case "KeyS":
			case "ArrowDown":
				console.log("Down")
				pressDown()
			break
			case "KeyA":
			case "ArrowLeft":
				console.log("Left")
				pressLeft()
			break
			case "KeyD":
			case "ArrowRight":
				console.log("Right")
				pressRight()
			break
		}

	}
})