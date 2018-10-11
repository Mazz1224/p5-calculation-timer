let problem,
	ans = '',
	flash =[],
	log = [],
	button,
	gameState = 'mainMenu',
	gameOverScreen;
//

function setup() {
	width = windowWidth;
	height = windowHeight;
	createCanvas(width, height);

	button = new Button(width / 2, height * (3 / 4), width / 4, height / 5, 'I understand\nand know the controls');

	problem = new Problem();
}

function draw() {
	background(0);

	flash.forEach(function(e, i) {
		if(e.frame < e.duration) {
			e.render();
		} else {
			flash.splice(i, 1);
		}
	});

	switch(gameState) {
		case 'mainMenu':
			textSize(height / 30);
			colorMode(HSB)
			fill(136, 100, 50 + (((sin(frameCount / 10) + 1) / 2) * 50));
			textAlign(CENTER, BOTTOM);
			text('ENTER: submit answer, SPACE: regenerate problem, ESCAPE: finish', width / 2, height - 10);

			colorMode(RGB);

			fill(255);
			textAlign(CENTER);
			textSize(height / 20);
			text('Calculation Timer', width / 2, height / 5);
			
			fill(249, 216, 29);
			textAlign(CENTER, TOP);
			textSize(height / 30);
			text(
				'This test is an infinite stream of math problems that increase in\n' +
				'difficulty (term count) as you solve problems.\n' +
				'The objective of this experiment is to see whether using a calculator to solve\n' +
				'math problems is faster or not.' +
				'To give the best results, try this with and without a calculator in separate runs\n' +
				'but please don\'t switch your method of calculation in the middle of a session because\n' +
				'that messes up the data.', width / 2, height / 4);
				
			fill(252, 46, 10);
			textAlign(CENTER, BOTTOM);
			text('Please know that the data gathered from this experiment will be saved and processed.', width / 2, height * (5 / 8));

			button.render();

			break;
		//

		case 'game':
			textSize(height / 30);
			colorMode(HSB)
			fill(136, 100, 50 + (((sin(frameCount / 10) + 1) / 2) * 50));
			textAlign(CENTER, BOTTOM);
			text('ENTER: submit answer, SPACE: regenerate problem, ESCAPE: finish', width / 2, height - 10);

			fill(255);
			textAlign(CENTER, CENTER);
			textSize(height / 20);
			text(problem.question + ' = ' + ans, width / 2, height / 2);

			textAlign(LEFT, TOP);
			text(floor((millis() - problem.startTime)) / 1000, 0, 0);
			
			textAlign(CENTER, TOP);
			text('Difficulty: 2 - ' + (problem.difficulty - 1), width / 2, 0);
			

			colorMode(HSB);
			textAlign(RIGHT, TOP);

			let tempLog = log.slice(-5);
			for(let i = 0; i < tempLog.length; i++) {
				if(tempLog[i].correct) {
					fill(140, 100, 75);
				} else {
					fill(0, 100, 75);
				}

				text(tempLog[i].question + ' = ' + tempLog[i].subjectAnswer + ': ' + tempLog[i].time, width, i * (height / 20) + 5);
			}

			break;
		//

		case 'gameOver':
			gameOverScreen.render();

			break;
		//
	}
}


function mousePressed() {
	if(gameState == 'mainMenu') {
		button.click(function() {
			problem.generate();

			gameState = 'game';
		});
	}
}


function keyPressed() {
	switch(gameState) {
		case 'mainMenu':
			break;
		//
		
		case 'game':
			if(keyCode == 8) {
				ans = ans.slice(0, -1);
			} else if(keyCode == 13) {
				if(ans == '') {
					ans = 0;
				}

				if(flash.length < 3) {
					if(problem.check(ans)) {
						flash.push(new Flash(140, 45));
					} else {
						flash.push(new Flash(0, 45));
					}
				}

				log.push({
					question: problem.question,
					subjectAnswer: ans,
					answer: problem.answer,
					difficulty: problem.difficulty,
					terms: problem.term.length,
					time: floor((millis() - problem.startTime)) / 1000,
					correct: problem.check(ans)
				});
				
				// console.log(log[log.length - 1]);
		
				problem.generate();
				ans = '';
				
				if(floor(random(8)) == 0) {
					problem.difficulty++;
				}
			} else if(keyCode == 32) {
				problem.generate();
			} else if(keyCode == 27) {
				if(log.length > 0) {
					gameOverScreen = new GameOverScreen();
					gameState = 'gameOver';
				} else {
					if(flash.length < 3) {
						flash.push(new Flash(0, 45));
					}
				}
			}

			break;
		//
		
		case 'gameOver':
			if(keyCode == 8) {
				switch(gameOverScreen.stage) {
					case 0:
						gameOverScreen.name = gameOverScreen.name.slice(0, -1);
						break;
					//

					case 1:
						gameOverScreen.calculator = gameOverScreen.calculator.slice(0, -1);
						break;
				}
			} else if(keyCode == 13) {
				switch(gameOverScreen.stage) {
					case 0:
						gameOverScreen.name == 'anonymous';
						gameOverScreen.stage++;

						break;
					//

					case 1:
						if(gameOverScreen.calculator == '') {
							gameOverScreen.calculator = 'none';
						}

						gameOverScreen.stage++;
						
						break;
					//

					case 2:
						$.post("save.php", {
							name: gameOverScreen.name + '-' + gameOverScreen.calculator,
							json: JSON.stringify(log)
						});

						gameOverScreen.stage++;

						break;
				}
			}

			break;
		//
	}
}

function keyTyped() {
	switch(gameState) {
		case 'mainMenu':
			break;
		//
		
		case 'game':
			if(key.match(/([0-9])|(-)/g)) {
				ans += key;
			}

			break;
		//
		
		case 'gameOver':
			switch(gameOverScreen.stage) {
				case 0:
					if(key.match(/([a-zA-Z])/g)) {
						gameOverScreen.name += key;
					}

					break;

				case 1:
					if(key.match(/([a-zA-Z0-9]|(\-))/g)) {
						gameOverScreen.calculator += key;
					}
					
					break;
			}


			break;
	}
}


function windowResized() {
	width = windowWidth;
	height = windowHeight;
	resizeCanvas(width, height, true);
}
