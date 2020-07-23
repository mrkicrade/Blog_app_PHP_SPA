class DB {
	static getAll(){
		return new Promise((resolve, reject)=>{
			let xml = new XMLHttpRequest();
			xml.open('get', 'get_data.php');
			xml.onreadystatechange = function(){
				if (xml.readyState == 4 && xml.status == 200) {
					//xml.responseText
					// console.log(JSON.parse(xml.responseText));
					resolve(JSON.parse(xml.responseText));
				}
			}
			xml.send();
		});
	}
}