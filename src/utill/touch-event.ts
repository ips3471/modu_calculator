import { UpdatingState } from './../assets/interfaces/interfaces';
class TouchEvent {
	private readonly longEnough: number;
	private timer: ReturnType<typeof setInterval> | undefined;
	constructor(longEnough: number = 300) {
		this.longEnough = longEnough;
	}

	touchStart(callback: UpdatingState<boolean>) {
		let tick = this.longEnough;
		this.timer = setInterval(() => {
			if (tick <= 0) {
				this.touchEnd();
				callback(true);
			} else {
				tick -= 100;
			}
		}, 100);
	}

	touchEnd() {
		this.timer && clearInterval(this.timer);
	}
}

export default TouchEvent;
