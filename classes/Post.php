<?php 

class Post extends QueryBuilder {

	public function createPost($data)
	{
		// var_dump($data);
		$title = $data->addTitle;
		$description = $data->addDescription;
		$user_id = $data->userId;
		$createdAt = date('Y-m-d');

		// var_dump($title,$description, $user_id, $createdAt);

		$sql = "INSERT INTO posts VALUES (NULL, ?, ?, ?, ?)";
        $query = $this->db->prepare($sql);
        $query->execute([$title, $description, $user_id, $createdAt]);
	}

	public function getMyPosts($id)
	{
		// var_dump($id);
		$user_id = $id;
		$sql = "SELECT * FROM posts WHERE user_id = ?";
		$query = $this->db->prepare($sql);
		$query->execute([$user_id]);
		$posts = $query->fetchAll(PDO::FETCH_OBJ);
		return $posts;
		// var_dump($posts);
	}

	public function deletePost($id)
	{
		$sql = "DELETE FROM posts WHERE id = ?";
		$query = $this->db->prepare($sql);
		$query->execute([$id]);
		// header("Location: posts.view.php");	
	}

	public function getSinglePost($id)				
	{
		// var_dump($id);
		$sql = "SELECT * FROM posts WHERE id = ?";
		$query = $this->db->prepare($sql);
		$query->execute([$id]);
		$editPost = $query->fetch(PDO::FETCH_OBJ);
		return $editPost;
		// var_dump($editPost);
	}

	public function editPost()
	{
		$title = $_POST['title'];
		$description = $_POST['description'];
		$user_id = $_SESSION['loggedUser']->id;
		$createdAt = date('Y-m-d');

		$sql = "INSERT INTO posts VALUES (NULL, ?, ?, ?, ?)";
        $query = $this->db->prepare($sql);
        $query->execute([$title, $description, $user_id, $createdAt]);
        header("Location: posts.view.php");
	}

	public function saveEditPost($data)
	{
		$editId = $data->editId;
		$editTitle = $data->editTitle;
		$editDescription = $data->editDescription;

		// var_dump($editId, $editTitle, $editDescription);

		$sql = "UPDATE posts SET title = ?, description = ? WHERE id = ?";
		$query = $this->db->prepare($sql);
		$query->execute([$editTitle, $editDescription, $editId]);
		$result = $query->fetch(PDO::FETCH_OBJ);
		return $result;
		// header("Location: index.html");
	}

	public function getAllPosts($id)
	{
		// var_dump($id);
		$sql = "SELECT * FROM posts WHERE user_id = ?";
		$query = $this->db->prepare($sql);
		$query->execute([$id]);
		$allPosts = $query->fetchAll(PDO::FETCH_OBJ);
		return $allPosts;
		// var_dump($allPosts);
	}
}