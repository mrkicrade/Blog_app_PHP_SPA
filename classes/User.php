<?php 

class User extends QueryBuilder {

	// public $registerUser = false;
	// public $loggedUser = false;

	public function registerUser($data)
	{ 

		$sql = "INSERT INTO users VALUES (NULL, ?, ?, ?)";
		$query = $this->db->prepare($sql);
		$query->execute([$data->name, $data->mail, $data->password]);

		if ($query) {
			return "Success";
		} else {
			return "Error";
		}
	}

	public function loginUser($data)
	{
		// var_dump($data);
		$email = $data->mail;
		$password = $data->password;

		// var_dump($email, $password);

		$sql = "SELECT * FROM users WHERE email = ? AND password = ?";
		$query = $this->db->prepare($sql);
		$query->execute([$email, $password]);
		$result = $query->fetch(PDO::FETCH_OBJ);
		return $result;
		var_dump($result);
	}

	public function getUserWithId($id)
	{
		$sql = "SELECT * FROM users WHERE id = ?";
		$query = $this->db->prepare($sql);
		$query->execute([$id]);
		return $query->fetch(PDO::FETCH_OBJ);
	}
}