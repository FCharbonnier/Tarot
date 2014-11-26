<?php
try
{
	//$pdo = new PDO('mysql:host=localhost;port=3307;dbname=tarot', 'tarot', 'tarot');
	$pdo = new PDO('mysql:host=localhost;dbname=tarot', 'root', '');
} catch (Exception $e)
{
    echo "Erreur lors de la connexion à la base de données : " + $e->getMessage();
}

?>