
import {View, Cursor} from 'kff';
import el from '../../functions/createElement';
import toArray from '../../functions/toArray';

export default class Tabs extends View
{
	constructor(options)
	{
		super(options);
		this.mobileMaxWidth = 680;
	}

	render()
	{
		var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

		var model = this.options.model;
		var maxMobileTabs = this.$element[0].getAttribute('data-max-mobile-tabs');
		if(maxMobileTabs) maxMobileTabs = parseInt(maxMobileTabs);
		else maxMobileTabs = 3;

		if(model) model = this.getCursor(model);

		if(model)
		{
			this.scope.tabs = model;
		}
		else
		{
			this.scope.tabs = new Cursor({
				active: null
			});
		}

		this.scope.tabs.setIn('active', parseInt(this.$element[0].getAttribute('data-activetab')) || 1 );

		// this.$lis = this.$element.find('.tabs.com li');
		this.lis = this.element.querySelectorAll('.tabs.com li');

		if(width < this.mobileMaxWidth && this.lis.length > maxMobileTabs)
		{
			let tabs = toArray(this.element.querySelectorAll('.tabs.com ul li'));
			let panes = toArray(this.element.querySelectorAll('.tabpanes.com > .tabpane.com'));

			if(tabs.length !== panes.length) return;

			let accordion = el('div.accordion', { 'data-kff-view': 'AccordionView' }, null);
			let items = tabs.map((li, i) => {

				let pane = panes[i].cloneNode(true);
				pane.setAttribute('class', 'content p-null');

				let item = el('div.item',
					[
						el('div.head', [el('span.title', li.children[0].textContent)]),
						el('div.body', [pane])
					]);

				return item;
			});

			items.forEach(item => accordion.appendChild(item));

			this.element.innerHTML = '';
			this.element.appendChild(accordion);
		}
		else
		{
			const lis = toArray(this.lis);

			lis.forEach(function(el, i)
			{
				if(!el.classList.contains('disabled'))
				{
					el.setAttribute('data-kff-bind', 'tabs.active:class(active, ' + (i + 1) + '):p(int)');
					el.querySelector('a').setAttribute('data-kff-bind', 'tabs.active:click(' + (i + 1) + '):p(int)');
				}
			});

			const tabPanes = toArray(this.element.querySelectorAll('.tabpanes.com > .tabpane.com'));

			tabPanes.forEach(function(el, i)
			{
				el.setAttribute('data-kff-bind', 'tabs.active:if(' + (i + 1) + '):p(int)');
			});
		}
	}
}
