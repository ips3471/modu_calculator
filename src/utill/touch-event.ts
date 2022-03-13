import { UpdatingState } from './../assets/interfaces/interfaces';
class TouchEvent {
	private tick: number;
	private timer: ReturnType<typeof setInterval> | undefined;
	constructor(longEnough: number = 300) {
		this.tick = longEnough;
	}

	touchStart(callback: UpdatingState<boolean>) {
		this.timer = setInterval(() => {
			if (this.tick <= 0) {
				this.timer && clearInterval(this.timer);
				callback(true);
			} else {
				this.tick -= 100;
			}
		}, 100);
	}

	touchEnd() {
		this.timer && clearInterval(this.timer);
	}
}

export default TouchEvent;
