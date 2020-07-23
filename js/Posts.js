class Posts {
	static myPosts(id){
		// console.log(id);
		return new Promise((resolve, reject)=>{
			let xml = new XMLHttpRequest();
			xml.onreadystatechange = function(){
				if (xml.readyState == 4 && xml.status == 200) {
					//xml.responseText
					// console.log(JSON.parse(xml.responseText));
					resolve(JSON.parse(xml.responseText));
				}
			}
			xml.open('post', 'my_posts.php');
			xml.setRequestHeader("Content-type", "application/json");
			xml.send(JSON.stringify(id));
		});
	}

	static getSinglePost(id){
		// console.log(id);
		return new Promise((resolve, reject)=>{
			let xml = new XMLHttpRequest();
			xml.onreadystatechange = function(){
				if (xml.readyState == 4 && xml.status == 200) {
					//xml.responseText
					// console.log(xml.responseText);
					resolve(JSON.parse(xml.responseText));
				}
			}
			xml.open('post', 'single_edit_post.php');
			xml.setRequestHeader("Content-type", "application/json");
			xml.send(JSON.stringify(id));
		});
	}

	static saveEditPost(newEditPost){
		// console.log(newEditPost);
		return new Promise((resolve, reject)=>{
			let xml = new XMLHttpRequest();
			xml.onreadystatechange = function(){
				if (xml.readyState == 4 && xml.status == 200) {
					//xml.responseText
					// console.log(xml.responseText);
					// resolve(JSON.parse(xml.responseText));
					resolve(xml.responseText);
				}
			}
			xml.open('post', 'save_edit_post.php');
			xml.setRequestHeader("Content-type", "application/json");
			xml.send(JSON.stringify(newEditPost));
		});
	}

	static deletePost(id){
		return new Promise((resolve, reject)=>{
			let xml = new XMLHttpRequest();
			xml.onreadystatechange = function(){
				if (xml.readyState == 4 && xml.status == 200) {
					resolve(xml.responseText);
				}
			}
			xml.open('post', 'delete_post.php');
			xml.setRequestHeader("Content-type", "application/json");
			xml.send(JSON.stringify(id));
		});
	}

	static addPost(newPost){
		// console.log(newPost);
		return new Promise((resolve, reject)=>{
			let xml = new XMLHttpRequest();
			xml.onreadystatechange = function(){
				if (xml.readyState == 4 && xml.status == 200) {
					resolve(xml.responseText);
					// console.log(xml.responseText);
				}
			}
			xml.open('post', 'add_post.php');
			xml.setRequestHeader("Content-type", "application/json");
			xml.send(JSON.stringify(newPost));
		});
	}

	static getAllPosts(id){
		// console.log(id);
		return new Promise((resolve, reject)=>{
			let xml = new XMLHttpRequest();
			xml.onreadystatechange = function(){
				if (xml.readyState == 4 && xml.status == 200) {
					//xml.responseText
					// console.log(xml.responseText);
					resolve(JSON.parse(xml.responseText));
				}
			}
			xml.open('post', 'get_all_posts.php');
			xml.setRequestHeader("Content-type", "application/json");
			xml.send(JSON.stringify(id));
		});
	}
}