// S E L E C T O R S

let brandBtn = document.querySelector('#brandBtn');
let blogs = document.querySelector('#blogs');
let firstNav = document.querySelector('#firstNav');
let loggedNav = document.querySelector('#loggedNav');
let mainRow = document.querySelector('#mainRow');
let loginRegisterRow = document.querySelector('#loginRegisterRow');
let loginRegisterBtn = document.querySelector('#loginRegisterBtn');
let loginBtn = document.querySelector('#loginBtn');
let loginBtn2 = document.querySelector('#loginBtn2');
let registerBtn = document.querySelector('#registerBtn');
let myPostsBtn = document.querySelector('#myPostsBtn');
let addPostBtn = document.querySelector('#addPostBtn');
let addPostRow = document.querySelector('#addPostRow');
let logoutBtn = document.querySelector('#logoutBtn');
let registerName = document.querySelector('#registerName');
let registerMail = document.querySelector('#registerMail');
let registerPassword = document.querySelector('#registerPassword');
let loginMail = document.querySelector('#loginMail');
let loginPassword = document.querySelector('#loginPassword');
let allMyPosts = document.querySelector('#allMyPosts');
let myPosts = document.querySelector('#myPosts');
let myPostEdit = document.querySelector('#myPostEdit');
let showMyEditPost = document.querySelector('#showMyEditPost');
let addTitle = document.querySelector('#addTitle');
let addDescription = document.querySelector('#addDescription');
let addNewPostBtn = document.querySelector('#addNewPostBtn');
let wholePost = document.querySelector('#wholePost');
let showWholePost = document.querySelector('#showWholePost');
let allPostsRow = document.querySelector('#allPostsRow');
let allPostsShow = document.querySelector('#allPostsShow');


// E V E N T S

brandBtn.addEventListener('click', brand);
brandBtn2.addEventListener('click', brand2);
loginRegisterBtn.addEventListener('click', loginRegister);
loginBtn.addEventListener('click', login);
registerBtn.addEventListener('click', register);
myPostsBtn.addEventListener('click', showMyPosts);
addPostBtn.addEventListener('click', addPost);
logoutBtn.addEventListener('click', logout);
addNewPostBtn.addEventListener('click', addNewPost);


// F U N C T I O N S


start();

function start() {
	loggedNav.style.display = 'none';
	allMyPosts.style.display = 'none';
	myPostEdit.style.display = 'none';
	addPostRow.style.display = 'none';
	wholePost.style.display = 'none';
	allPostsRow.style.display = 'none';
}

if (sessionStorage.getItem('loggedUser')) {
	firstNav.style.display = 'none';
	loggedNav.style.display = 'block';
} else {
	firstNav.style.display = 'flex';
	loggedNav.style.display = 'none';
}

function addPost(){
	blogs.style.display = 'none';
	addPostRow.style.display = 'block';
	myPosts.style.display = 'none';
}

showAllPosts();

function showAllPosts(){
	DB.getAll()
	.then((data)=>{
		// console.log(data);
		createPosts(data);
	},(err)=>{
		throw err;
	});
}

function createPosts(data){

	loginRegisterRow.style.display = 'none';
	blogs.style.display = 'flex';

	let text = ``;
	for (let i = 0; i < data.length; i++) {
		text += `
			<div class="col-4">
				<div class="card mb-3">
					<div class="card-header">
						<h5 class="float-left">${data[i].title.substring(0, 10)}...</h5>
						<button class="btn btn-sm btn-secondary float-right">${data[i].created_at}</button>
					</div>
					<div class="card-body">
						<p class="text-center">${data[i].description.substring(0, 40)}...</p>
					</div>
					<div class="card-footer">
						<button id="${data[i].user_id}" class="owner btn btn-sm btn-info float-left">${data[i].name}</button>
						<button id="${data[i].id}" class="more btn btn-sm btn-success">More...</button>
					</div>
				</div>
			</div>
		`;
	}
	// console.log(text);
	blogs.innerHTML = text;
	let ownerBtns = document.querySelectorAll('.owner');
	let moreBtns = document.querySelectorAll('.more');
	for (let i = 0; i < ownerBtns.length; i++) {
		ownerBtns[i].addEventListener('click', owner);
		moreBtns[i].addEventListener('click', more);
	}
}

function owner() {
	
	allPostsRow.style.display = 'block';
	allPostsShow.style.display = 'flex';
	addPostRow.style.display = 'none';
	myPostEdit.style.display = 'none';
	blogs.style.display = 'none';
	Posts.getAllPosts(this.id).then((res) => {
		let text = ``; 
		for (let i = 0; i < res.length; i++) {
			text += `
				<div class="col-4">
					<div class="card mb-3">
						<div class="card-header">
							<h5 class="float-left">${res[i].title.substring(0, 10)}...</h5>
							<button class="btn btn-sm btn-secondary float-right">${res[i].created_at}</button>
						</div>
						<div class="card-body">
							<p class="text-center">${res[i].description.substring(0, 40)}...</p>
						</div>
						<div class="card-footer">
							<button id="${res[i].id}" class="ownerMore btn btn-sm btn-success">More...</button>
						</div>
					</div>
				</div>
			`;
		}
		allPostsShow.innerHTML = text;
		let ownerMore = document.querySelectorAll('.ownerMore');
		for (let i = 0; i < ownerMore.length; i++) {
			ownerMore[i].addEventListener('click', more2);
		}
	})
}

function more() {

	wholePost.style.display = 'block';
	blogs.style.display = 'none';
	// allPostsShow.style.display = 'block';
	Posts.getSinglePost(this.id).then((res) => {
		// console.log(res);
		let text = ``;
		text += `
			<input id="editId" type="hidden" class="form-control text-center" value="${res.id}"><br>
			<input id="editTitle" type="text" class="form-control text-center" value="${res.title}"><br>
			<textarea name="editDescription" id="editDescription" cols="74" rows="10"  class="text-center">${res.description}</textarea>
        `;
		showWholePost.innerHTML = text;
	})
}

function more2() {

	wholePost.style.display = 'block';
	blogs.style.display = 'none';
	// wholePost.style.display = 'none';
	allPostsShow.style.display = 'none';
	Posts.getSinglePost(this.id).then((res) => {
		// console.log(res);
		let text = ``;
		text += `
			<input id="editId" type="hidden" class="form-control text-center" value="${res.id}"><br>
			<input id="editTitle" type="text" class="form-control text-center" value="${res.title}"><br>
            <textarea name="editDescription" id="editDescription" cols="74" rows="10"  class="text-center">${res.description}</textarea>
		`;
		showWholePost.innerHTML = text;
	})
}

function brand(){
	
	firstNav.style.display = 'flex';
	loggedNav.style.display = 'none';
	addPostRow.style.display = 'none';
	allPostsShow.style.display = 'none';
	wholePost.style.display = 'none';
	
	showAllPosts();
}

function brand2(){
	
	firstNav.style.display = 'none';
	loggedNav.style.display = 'block';
	addPostRow.style.display = 'none';
	allPostsShow.style.display = 'none';
	wholePost.style.display = 'none';
	allMyPosts.style.display = 'none';
	
	showAllPosts();
}

function loginRegister(){
	
	blogs.style.display = 'none';
	loginRegisterRow.style.display = 'block';
}

function register() {
	let newUser = {
		name : registerName.value,
		mail : registerMail.value,
		password : registerPassword.value
	};
	Users.registerUser(newUser).then((res)=>{
		DB.getAll().then((data)=>{
			createPosts(data);
			registerName.value = "";
			registerMail.value = "";
			registerPassword.value = "";
		},(err)=>{
			console.log('Error');
		});
	},(err)=>{
		console.log('Error');
	})
	showAllPosts();
}

function login() {
	let loggedUser = {
		mail : loginMail.value,
		password : loginPassword.value
	}
	Users.loginUser(loggedUser).then(function(data){
		let userData = (JSON.parse(data));
		if (userData) {
			firstNav.style.display = 'none';
			loggedNav.style.display = 'block';
		}
		sessionStorage.setItem('loggedUser', JSON.stringify(userData));
		firstNav.style.display = 'none';
		loggedNav.style.display = 'block';
	})
	showAllPosts();
}

function showMyPosts(){
	let loggedUser = JSON.parse(sessionStorage.getItem("loggedUser"));
	// console.log(loggedUser);
	if (loggedUser) {
		let id = loggedUser.id;
		// console.log(id);
		allMyPosts.style.display = 'block';
		Posts.myPosts(id).then((res) => {
			// console.log(res);
			createMyPosts(res);
		})
	}
}

function logout(){
	sessionStorage.removeItem('loggedUser');
	firstNav.style.display = 'flex';
	loggedNav.style.display = 'none';
	loginMail.value = "";
	loginPassword.value = "";
	allMyPosts.style.display = 'none';
	showAllPosts();
}

function createMyPosts(data) {
	// console.log(data);
	let text = ``;
	for (let i = 0; i < data.length; i++) {
		text += `
			<div class="col-4">
				<div class="card mb-3">
					<div class="card-header">
						<h5 class="float-left">${data[i].title.substring(0, 10)}...</h5>
						<button class="btn btn-sm btn-secondary float-right">${data[i].created_at}</button>
					</div>
					<div class="card-body">
						<p class="text-center">${data[i].description.substring(0, 40)}...</p>
					</div>
					<div class="card-footer">
						<button id="${data[i].id}" class="edit btn btn-sm btn-info float-left">Edit</button>
						<button id="${data[i].id}" class="delete btn btn-sm btn-danger float-right">Delete</button>
					</div>
				</div>
			</div>
		`;
	}
	myPosts.innerHTML = text;
	let editBtns = document.querySelectorAll('.edit');
	let deleteBtns = document.querySelectorAll('.delete');
	for (let i = 0; i < editBtns.length; i++) {
		editBtns[i].addEventListener('click' , editPost);
		deleteBtns[i].addEventListener('click' , deletePost);
	}
	blogs.style.display = 'none';
	myPosts.style.display = 'flex';
}

function editPost(data) {
	allMyPosts.style.display = 'none';
	myPostEdit.style.display = 'block';
	Posts.getSinglePost(this.id).then((data) => {
		let text = ``;
		text += `
			<div class="col-6 offset-3">
				<input id="editId" type="hidden" class="form-control text-center" value="${data.id}"><br>
				<input id="editTitle" type="text" class="form-control text-center" value="${data.title}"><br>
	            <input id="editDescription" type="text" class="form-control text-center" value="${data.description}"><br><br>
				<button id="editPostBtn" class="form-control btn btn-primary">Edit</button>
			</div>
		`;
		showMyEditPost.innerHTML = text;
		let editId = document.querySelector('#editId');
		let editTitle = document.querySelector('#editTitle');
		let editDescription = document.querySelector('#editDescription');
		let editPostBtn = document.querySelector('#editPostBtn');
		editPostBtn.addEventListener('click', saveEditPost);
	})

}

function deletePost(){
	let id = this.id;
	// console.log(id);
	Posts.deletePost(id).then((res) => {
		myPostEdit.style.display = 'none';
		blogs.style.display = 'flex';
		allMyPosts.style.display = 'none';
		showAllPosts();
	})
}

function saveEditPost(){
	// console.log('radi');
	let newEditPost = {
		editId : editId.value,
		editTitle : editTitle.value,
		editDescription : editDescription.value
	}
	Posts.saveEditPost(newEditPost).then((res) => {
		myPostEdit.style.display = 'none';
		blogs.style.display = 'flex';
		showAllPosts();
	})
}

function addNewPost(){
	let newPost = {
		userId : JSON.parse(sessionStorage.getItem('loggedUser')).id,
		addTitle : addTitle.value,
		addDescription : addDescription.value
	}
	Posts.addPost(newPost).then((res) => {
		addPostRow.style.display = 'none';
		blogs.style.display = 'flex';
		showAllPosts();
	})
}