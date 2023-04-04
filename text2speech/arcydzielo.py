import os
import requests
from gtts import gTTS
from bs4 import BeautifulSoup


def pobierz_tekst(sciezka):
    """Funkcja pobierajaca tekst z pliku lub napisow na stronie internetowej w zaleznosci od jego rozszerzenia."""
    rozszerzenie = os.path.splitext(sciezka)[1]
    try:
        if rozszerzenie == ".pdf":
            import pdfplumber
            with pdfplumber.open(sciezka) as pdf:
                tekst = ""
                for strona in pdf.pages:
                    tekst += strona.extract_text() + "\n"
        elif rozszerzenie in [".txt"]:
            with open(sciezka, "r", encoding="utf-8") as plik:
                tekst = plik.read()
        elif rozszerzenie in [".html", ".htm"]:
            with open(sciezka, "r", encoding="utf-8") as plik:
                soup = BeautifulSoup(plik, "html.parser")
                tekst = soup.get_text()
        else:
            response = requests.get(sciezka)
            soup = BeautifulSoup(response.content, "html.parser")
            tekst = soup.get_text()
    except Exception as e:
        print(f"Wystąpił błąd podczas pobierania tekstu: {e}")
        tekst = None
    return tekst


def zapisz_jako_mp3(tekst, nazwa_pliku):
    """Funkcja zapisująca przekonwertowany tekst na plik MP3."""
    if tekst is None:
        return False
    try:
        tts = gTTS(text=tekst, lang="pl")
        with open(nazwa_pliku, 'wb') as f:
            tts.write_to_fp(f)
            f.flush()
            os.fsync(f.fileno())
        return True
    except Exception as e:
        print(f"Wystąpił błąd podczas zapisywania pliku MP3: {e}")
        return False


if __name__ == "__main__":
    sciezka = input("Podaj ścieżkę do pliku tekstowego, PDF lub strony internetowej: ")
    tekst = pobierz_tekst(sciezka)
    if tekst is not None:
        nazwa_pliku = input("Jak ma się nazywać plik MP3? ")
        nazwa_pliku += ".mp3"
        if zapisz_jako_mp3(tekst, nazwa_pliku):
            print(f"Zapisano plik MP3 o nazwie: {nazwa_pliku}")
