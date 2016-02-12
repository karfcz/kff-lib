
import {View, immerge} from 'kff';
import animateScrollTop from '../../functions/animateScrollTop.js';

export default class Accordion extends View
{
	constructor(options)
	{
		super(options);
		this.cssClasses = {
			expanded: 'expanded',
			animated: 'animated'
		};
		this.selectors = {
			head: '.head',
			item: '.item',
			body: '.body',
			content: '.content'
		};

		if(options.cssClasses) this.cssClasses = immerge(this.cssClasses, options.cssClasses);
		if(options.selectors) this.selectors = immerge(this.selectors, options.selectors);

		this.addEvents('click', this.selectors.head, 'clickHead');
		this.collapsingItem = null;
	}

	clickHead(event)
	{
		var item = event.matchedTarget.parentNode;
		if(item.parentNode === this.element)
		{
			var items = this.element.querySelectorAll(this.selectors.item);

			for(var i = 0, l = items.length; i < l; i++)
			{
				if(item === items[i])
				{
					if(items[i].classList.contains(this.cssClasses.expanded))
					{
						this.collapseItem(items[i]);
						this.collapsingItem = items[i];
					}
					else
					{
						this.expandItem(items[i], true);
					}
				}
				else if(item.parentNode === this.element)
				{
					this.collapseItem(items[i]);
				}
			}
		}
	}

	collapseItem(item)
	{
		if(item.classList.contains(this.cssClasses.expanded))
		{
			var body = item.querySelector(this.selectors.body);
			var content = body.querySelector(this.selectors.content);
			var height = content.offsetHeight;
			body.style.height = height + 'px';
			body.offsetHeight;
			body.classList.add(this.cssClasses.animated);
			body.style.height = 0;
			item.classList.remove(this.cssClasses.expanded);
		}
	}

	expandItem(item, scrollToItem)
	{
		var body = item.querySelector(this.selectors.body);
		var content = body.querySelector(this.selectors.content);
		var height = content.offsetHeight;
		const scrollY = window.scrollY || (document.documentElement ? document.documentElement.scrollTop : 0) || document.body.scrollTop;

		body.style.height = height + 'px';
		body.classList.add(this.cssClasses.animated);
		item.classList.add(this.cssClasses.expanded);

		if(scrollToItem && this.collapsingItem && this.collapsingItem !== item)
		{
			var collapsingItemHeight = this.collapsingItem.offsetHeight;
			var top = item.getBoundingClientRect().top + scrollY;
			var collapsingItemOffsetTop = this.collapsingItem.getBoundingClientRect().top + scrollY;

			if(collapsingItemHeight > 0 && collapsingItemOffsetTop < top)
			{
				animateScrollTop(top - collapsingItemHeight, 300);
			}
		}

		setTimeout(() =>
		{
			body.classList.remove(this.cssClasses.animated);
			body.style.height = 'auto';
		}, 300);

		this.collapsingItem = item;
	}
}
