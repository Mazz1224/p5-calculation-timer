class GameOverScreen {
	constructor() {
		this.stage = 0;
		this.name = '';
		this.calculator = '';
	}

	render() {
		noStroke();
		textSize(height / 20);
		colorMode(RGB);
		textAlign(CENTER);

		fill(255);

		switch(this.stage) {
			case 0:
				if(log.length > 0) {
					if(log.length > 1) {
						text('You answered ' + log.length + ' questions', width / 2, height / 8);
					} else {
						text('You answered ' + log.length + ' question', width / 2, height / 8);
					}

					text('Please enter your name (or nothing to remain anonymous): ' + this.name, width / 2, height / 4);
				} else {
					text('You didn\'t answer any questions.', width / 2, height / 8);
				}
				
				break;
			//
			
			case 1:
				text('Enter your calculator type/model or press ENTER for none:\n' + this.calculator, width / 2, height / 4);
				
				break;
				//
				
			case 2:
				text(
					'Press ENTER to submit your data to the server\n' +
					'with the understanding that it will be processed.', width / 2, height / 4);
				
				break;
			//

			case 3:
				text(
					'Thank you for participating', width / 2, height / 4);
		}
	}
}