class Flash {
	constructor(hue, duration) {
		this.hue = hue;
		this.duration = duration;

		this.frame = 0;
	}

	render() {
		colorMode(HSB);
		noStroke();
		
		fill(this.hue, 100, 50 - (100 * (this.frame / this.duration)));
		rect(0, 0, width, height);

		this.frame++;
	}
}