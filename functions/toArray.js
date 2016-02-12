
export default function toArray(v)
{
	var arr = new Array(v.length);
	for(var i = 0, l = v.length; i < l; i++)
	{
		arr[i] = v[i];
	}
	return arr;
}
