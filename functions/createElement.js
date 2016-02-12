
export default function createElement(name, attrs, content)
{
	let split = name.split('.');
	let elementName = split[0];
	let classNames = split.slice(1);

	if(arguments.length === 2)
	{
		content = attrs;
		attrs = null;
	}

	let element = document.createElement(elementName);
	if(classNames.length > 0)
	element.setAttribute('class', classNames.join(' '));

	if(attrs)
	{
		for(var attr in attrs)
		{
			element.setAttribute(attr, attrs[attr]);
		}
	}

	if(content instanceof Array)
	{
		content.forEach(child => element.appendChild(child));
	}
	else if(typeof content === 'string')
	{
		element.innerHTML = content;
	}

	return element;
}
