import { AnimationClip, BooleanKeyframeTrack, ColorKeyframeTrack, NumberKeyframeTrack, Vector3, VectorKeyframeTrack } from 'three';

class AnimationClipCreator {
	static CreateRotationAnimation(period, axis = 'x') {
		const times = [0, period], values = [0, 360], trackName = `.rotation[${axis}]`, track = new NumberKeyframeTrack(trackName, times, values);
		return new AnimationClip(null, period, [track]);
	}

	static CreateScaleAxisAnimation(period, axis = 'x') {
		const times = [0, period], values = [0, 1], trackName = `.scale[${axis}]`, track = new NumberKeyframeTrack(trackName, times, values);
		return new AnimationClip(null, period, [track]);
	}

	static CreateShakeAnimation(duration, shakeScale) {
		const times = [], values = [], tmp = new Vector3();

		for (let i = 0; i<duration * 10; i++) {
			times.push(i / 10);

			tmp.set(Math.random() * 2.0 - 1.0, Math.random() * 2.0 - 1.0, Math.random() * 2.0 - 1.0).multiply(shakeScale).toArray(values, values.length);
		}
		const trackName = '.position', track = new VectorKeyframeTrack(trackName, times, values);
		return new AnimationClip(null, duration, [track]);
	}

	static CreatePulsationAnimation(duration, pulseScale) {
		const times = [], values = [], tmp = new Vector3();

		for (let i = 0; i<duration * 10; i++) {
			times.push(i / 10);

			const scaleFactor = Math.random() * pulseScale;
			tmp.set(scaleFactor, scaleFactor, scaleFactor).toArray(values, values.length);
		}
		const trackName = '.scale', track = new VectorKeyframeTrack(trackName, times, values);
		return new AnimationClip(null, duration, [track]);
	}

	static CreateVisibilityAnimation(duration) {
		const times = [0, duration / 2, duration], values = [true, false, true], trackName = '.visible', track = new BooleanKeyframeTrack(trackName, times, values);
		return new AnimationClip(null, duration, [track]);
	}

	static CreateMaterialColorAnimation(duration, colors) {

		const times = [], values = [], timeStep = duration / colors.length;

		for (let i = 0; i<colors.length; i++) {
			times.push(i * timeStep);

			const color = colors[i];
			values.push(color.r, color.g, color.b);
		}
		const trackName = '.material.color', track = new ColorKeyframeTrack(trackName, times, values);
		return new AnimationClip(null, duration, [track]);
	}
}

export { AnimationClipCreator };