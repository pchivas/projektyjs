<!DOCTYPE html>
<html>
<head>
	<title>Formularz rejestracyjny</title>
</head>
<body>
	<h2>Formularz rejestracyjny</h2>
	<form method="POST">
		<label>Imię:</label><br>
		<input type="text" name="imie" required><br><br>
		<label>Nazwisko:</label><br>
		<input type="text" name="nazwisko" required><br><br>
		<label>Adres:</label><br>
		<input type="text" name="adres" required><br><br>
		<label>Numer telefonu:</label><br>
		<input type="tel" name="telefon" required><br><br>
		<label>Wiek:</label><br>
		<input type="number" name="wiek" required><br><br>
		<label>Hasło:</label><br>
		<input type="password" name="haslo" required><br><br>
		<label>Powtórz hasło:</label><br>
		<input type="password" name="haslo2" required><br><br>
		<input type="submit" value="Zarejestruj">
		<p>
	</form>
</body>
</html>

<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "rejestracja";

$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) {
    die("Nie udało się połączyć z bazą danych: " . mysqli_connect_error());
}

$imie = $_POST["imie"];
$nazwisko = $_POST["nazwisko"];
$adres = $_POST["adres"];
$telefon = $_POST["telefon"];
$wiek = $_POST["wiek"];
$haslo = $_POST["haslo"];
$haslo2 = $_POST["haslo2"];
$dlugosc = $_POST["dlugosc"];

if ($haslo != $haslo2) {
    die("Podane hasła nie są identyczne.");
}

$haslo_hash = password_hash($haslo, PASSWORD_DEFAULT);

$sql = "INSERT INTO uzytkownicy (imie, nazwisko, adres, telefon, wiek, haslo)
VALUES ('$imie', '$nazwisko', '$adres', '$telefon', '$wiek', '$haslo_hash')";

if (mysqli_query($conn, $sql)) {
    echo "Rejestracja sie udała ez";
} else {
    echo "Błąd: " . $sql . "<br>" . mysqli_error($conn);
}

mysqli_close($conn);
?>
