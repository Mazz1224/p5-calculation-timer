class Button {
	constructor(x, y, w, h, text) {
		this.pos = {x: x - (w / 2), y: y - (h / 2)};
		this.width = w;
		this.height = h;

		this.text = text;
	}

	render() {
		if(mouseX > this.pos.x && mouseX < this.pos.x + this.width && mouseY > this.pos.y && mouseY < this.pos.y + this.height) {
			fill(200);
		} else {
			fill(255);
		}

		rect(this.pos.x, this.pos.y, this.width, this.height);

		fill(0);
		textAlign(CENTER, CENTER);
		text(this.text, this.pos.x + (this.width / 2), this.pos.y + (this.height / 2));
	}

	click(callbackFn) {
		if(mouseX > this.pos.x && mouseX < this.pos.x + this.width && mouseY > this.pos.y && mouseY < this.pos.y + this.height) {
			callbackFn();
		}
	}
}