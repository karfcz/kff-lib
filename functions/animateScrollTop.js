


const requestAnimFrame = window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	function(callback)
	{
		window.setTimeout(callback, 1000 / 60);
	};

const easeLinear = pos => pos;

/**
 * Animates page scrollTop
 * @param  {Number} scrollTargetY  target scrollTop position
 * @param  {Number} duration       duration of the animation
 * @param  {Function} easing       easing function
 */
export default function animateScrollTop(scrollTargetY, duration, easing, callback)
{
	var scrollY = window.scrollY || (document.documentElement ? document.documentElement.scrollTop : 0) || document.body.scrollTop,
		scrollTargetY = scrollTargetY || 0,
		duration = duration || 300,
		easing = easing || easeLinear,
		currentTime = 0;

	function tick()
	{
		currentTime += 1 / 60;

		var p = currentTime / duration * 1000;
		var t = easing(p);

		if (p < 1)
		{
			requestAnimFrame(tick);
			window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t));
		}
		else
		{
			window.scrollTo(0, scrollTargetY);
			if(typeof callback === 'function') callback();
		}
	}

	tick();
}
