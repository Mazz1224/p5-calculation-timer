class Problem {
	constructor() {
		this.difficulty = 3;

		this.symbol = ['+', '-', '*', '/'];

		this.question = 'not generated';
	}

	generate() {
		this.startTime = millis();

		this.term = [];
		for(let i = 0; i < math.floor(math.random(2, this.difficulty)); i++) {
			this.term[i] = math.floor(math.random(1, 11));
		}

		this.answer = 1.1;

		while(!Number.isInteger(this.answer)) {
			this.question = '';

			for(let i = 0; i < this.term.length; i++) {
				if(i < this.term.length - 1) {
					this.question += this.term[i] + ' ';
					this.question += this.symbol[math.floor(math.random(4))] + ' ';
				} else {
					this.question += this.term[i];
				}
			}

			this.answer = math.eval(this.question);
		}
	}

	check(ans) {
		return ans == this.answer;
	}
}
