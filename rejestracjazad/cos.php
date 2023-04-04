<!DOCTYPE html>
<html>
<head>
	<title>Formularz Rejestracji</title>
</head>
<body>
	<h2>Rejestracja</h2>
	<form method="POST" action="logowanie.php">
		<label>Podaj nazwę użytkownika:</label>
		<input type="text" name="uzytkownik" required><br><br>
		<label>Podaj hasło:</label>
		<input type="password" name="haslo" required><br><br>
		<label>Powtórz hasło:</label>
		<input type="password" name="haslo_powtorz" required><br><br>
		<input type="submit" name="submit" value="Zarejestruj">
	</form>
</body>
</html>

<?php
$serwer = "localhost"; 
$uzytkownik_bazy = "root"; 
$haslo_bazy = ""; 
$nazwa_bazy = "rejestracja"; 

$polaczenie = mysqli_connect($serwer, $uzytkownik_bazy, $haslo_bazy, $nazwa_bazy);

if (!$polaczenie) {
    die("Nie można połączyć się z bazą danych: " . mysqli_connect_error());
}

$uzytkownik = $_POST['uzytkownik'];
$haslo = $_POST['haslo'];
$haslo_powtorz = $_POST['haslo_powtorz'];

if ($haslo != $haslo_powtorz) {
    echo "Hasła nie są takie same!";
} else {
    $zapytanie = "INSERT INTO uzytkownicy FROM uzytkownicy WHERE uzytkownik='$uzytkownik' AND haslo='$haslo'";
    $wynik = mysqli_query($polaczenie, $zapytanie);

    if (mysqli_num_rows($wynik) > 0) {
        echo "Zalogowano pomyślnie!";
    } else {
        echo "Niepoprawna nazwa użytkownika lub hasło!";
    }
}

mysqli_close($polaczenie);

?>