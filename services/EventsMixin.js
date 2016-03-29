import Events from './Events';

export const EventsMixin = superclass => class extends superclass
{
	initEvents()
	{
		this.events = null;
	}

	createEvents()
	{
		this.events = new Events();
	}

	on(eventType, fn)
	{
		if(this.events == null) this.createEvents();
		return this.events.on(eventType, fn);
	}

	one(eventType, fn)
	{
		if(this.events == null) this.createEvents();
		return this.events.one(eventType, fn);
	}

	off(eventType, fn)
	{
		if(this.events == null) this.createEvents();
		return this.events.off(eventType, fn);
	}

	trigger(eventType, eventData)
	{
		if(this.events == null) this.createEvents();
		return this.events.trigger(eventType, eventData);
	}
}

