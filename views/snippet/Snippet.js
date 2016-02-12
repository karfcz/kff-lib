
import {View, setImmediate} from 'kff';

export default class Snippet extends View
{
	constructor(options)
	{
		super(options);
		this.snippetName = this.element.getAttribute('data-kff-snippet');
		this.snippetNameAppend = this.snippetName + '-append';
		this.renderedSnippet = undefined;
		this.appendedSnippet = undefined;
	}

	destroy()
	{
	}

	run()
	{
		this.renderedSnippet = (this.scope.app.refine('snippets').getIn(this.snippetName) || '');
		setImmediate(this.refresh.bind(this));
	}

	refresh()
	{
		var snippet = (this.scope.app.refine('snippets').getIn(this.snippetName) || '');
		var snippetAppend = (this.scope.app.refine('snippets').getIn(this.snippetNameAppend) || '');

		if(snippet !== this.renderedSnippet)
		{
			this.destroyAll();
			this.element.innerHTML = snippet;
			this.renderAll();
			this.runAll();
			this.renderedSnippet = snippet;
		}

		if(snippetAppend)
		{
			this.destroyAll();
			this.element.insertAdjacentHTML('beforeend', snippetAppend);
			this.renderAll();
			this.runAll();
			this.renderedSnippet += snippetAppend;
			this.scope.app.refine('snippets').setIn(this.snippetNameAppend, undefined);
			this.scope.app.refine('snippets').setIn(this.snippetName, this.renderedSnippet);
		}

	}
}

Snippet.service =
{
	args: [{
		scope: {
			snippets: '@snippetsCursor'
		}
	}]
};
