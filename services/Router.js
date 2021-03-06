import Route from './Route';

export default class Router
{
	constructor(options)
	{
		this.options = options || {};
		this.routes = [];
		this.params = options.params || null;
		this.buildRoutes();
	}

	buildRoutes()
	{
		this.routes = [];
		var routesConfig = this.options.routes;
		for(var key in routesConfig)
		{
			this.routes.push(new Route(key, routesConfig[key]));
		}
	}

	match(path)
	{
		var params;
		for(var i = 0, l = this.routes.length; i < l; i++)
		{
			params = [];
			if(this.routes[i].match(path, params))
			{
				return { target: this.routes[i].getTarget(), params: params };
			}
		}
		return null;
	}
}