String.prototype.endsWith = function(str) 
{
    return this.indexOf(str, this.length - str.length) !== -1;
};

String.prototype.startsWith = function (str){
	return this.indexOf(str) == 0;
};