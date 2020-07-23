class Users {
	static registerUser(newUser){
		// console.log(newUser);
		return new Promise((resolve, reject)=>{
			let xml = new XMLHttpRequest();
			xml.onreadystatechange = function(){
				if (xml.readyState == 4 && xml.status == 200) {
					//xml.responseText
					// console.log(xml.responseText);
					resolve(xml.responseText);
				}
			}
			xml.open('post', 'register.php');
			xml.setRequestHeader("Content-type", "application/json");
			xml.send(JSON.stringify(newUser));
		});
	}

	static loginUser(loggedUser){
		// console.log(loggedUser);
		return new Promise((resolve, reject)=>{
			let xml = new XMLHttpRequest();
			xml.open('post', 'login.php');
			xml.onreadystatechange = function(){
				if (xml.readyState == 4 && xml.status == 200) {
					resolve(xml.responseText);
				}
			}
			xml.setRequestHeader("Content-type", "application/json");
			xml.send(JSON.stringify(loggedUser));
		})
	};
}