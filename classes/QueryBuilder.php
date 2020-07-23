<?php 

class QueryBuilder {

	protected $db;

	public function __construct($db){
		$this->db = $db;
	}

	public function getAll($table)
	{
		$sql = "SELECT * FROM {$table}";
		$query = $this->db->prepare($sql);
		$query->execute();
		return $query->fetchAll(PDO::FETCH_ASSOC);
	}

	public function selectAll($table1, $table2)
	{
		$sql = "SELECT {$table1}.id, {$table1}.title, {$table1}.description, {$table1}.user_id, {$table1}.created_at, {$table2}.name FROM {$table1} INNER JOIN {$table2} ON {$table1}.user_id = {$table2}.id";
		$query = $this->db->prepare($sql);
		$query->execute();
		$result = $query->fetchAll(PDO::FETCH_ASSOC);
		return $result;
		var_dump($result);
	}
}

?>