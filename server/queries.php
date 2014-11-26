<?php
include_once("cnx.php");

try
{
	if(isset($_POST["func"]))
	{
		switch ($_POST["func"])
		{
			case "get_user" :
				$rows = $pdo->query("SELECT * FROM user");
				
				$result = "[";

				while($row = $rows->fetch(PDO::FETCH_OBJ))
				{
					$result .= json_encode($row);
					$result .= ",";
				}
				if(substr($result, -1) == ',')
				{
					$result = substr($result, 0, -1);
				}

				$result .= "]";
				
				echo $result;
			break;
			case "add_user" :
				$pdo->query("INSERT INTO user (name) VALUES ('" . $_POST["name"] . "')");

				echo $pdo->lastInsertId();
			break;
			case "find_team" :
				$queryPartOne = "SELECT tu.team FROM `team_user` tu WHERE tu.user=";

				$queryPartTwo = " AND tu.team IN (";
				
				$query = "";

				$queryEnd = "";

				foreach ($_POST["players"] as $key => $value)
				{
					if($value != "")
					{
						$query .= $queryPartOne . $key . $queryPartTwo;

						$queryEnd .= ")";
					}
				}

				$query .= "SELECT t.id FROM `team` t WHERE t.count=" . $_POST["count"] . " GROUP BY t.id" . $queryEnd;

				$rows = $pdo->query($query);

				$row = $rows->fetchColumn();

				if($row == null)
				{
					$pdo->query("INSERT INTO team (count) VALUES ('" . $_POST["count"] . "')");

					$row = $pdo->lastInsertId();

					foreach ($_POST["players"] as $key => $value)
					{
						if($value != "")
						{
							$pdo->query("INSERT INTO team_user (team, user) VALUES (" . $row . "," . $key . ")");
						}
					}
				}

				echo $row;
			break;
		}
	}
} catch (Exception $e)
{
    echo $e->getMessage();
}
?>