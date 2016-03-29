import EventsMixin from './EventsMixin';

export default class HashStateHandler extends EventsMixin(class{})
{
	constructor()
	{
		this.hashchange = this.hashchange.bind(this);
	}

	init()
	{
		this.stateHistory = {};
		this.initialHash = location.hash;
		window.addEventListener('hashchange', this.hashchange, false);
		this.hashChange();
	}

	destroy()
	{
		window.removeEventListener('hashchange', this.hashchange, false);
	}

	pushState(state, title, url)
	{
		location.hash = url;
	}

	replaceState(state, title, url)
	{
		if(location.hash !== this.initialHash) history.back();
		location.hash = url;
	}

	hashChange(event)
	{
		var hash = location.hash;
		if(hash.indexOf('#') !== 0 && hash != '') return false;

		this.trigger('popstate', { path: hash, params: {} });
		return false;
	}
}
