# Zjazd Absolwentów SLO - w trakcie rozwoju

Strona internetowa zjazdu absolwentów SLO, umożliwiająca zapoznanie się z informacjami o wydarzeniu oraz zapis uczestników poprzez formularz rejestracyjny.

Projekt ma charakter informacyjno-rejestracyjny i stanowi bazę pod dalszą rozbudowę (np. backend, walidację danych, wyszukiwanie absolwentów).

---

## Funkcjonalności

- Sekcja hero z grafiką wydarzenia
- Opis wydarzenia i celu zjazdu absolwentów
- Sekcja informacyjna (placeholdery pod przyszłe treści)
- Formularz zapisu uczestników:
  - imię i nazwisko
  - adres e-mail
  - rok ukończenia szkoły
  - dodatkowe informacje (opcjonalnie)
- Prototyp sekcji wyszukiwania absolwentów (placeholder)

---

## Technologie

- HTML5
- CSS3 (plik `style.min.css`)
- Responsywny layout (viewport)
- Brak frameworków – czysty frontend (vanilla)

---

## Struktura projektu

- index.html
- style.min.css
- README.md

## Uruchomienie projektu lokalnie

1. Sklonuj repozytorium:

   ```bash
   git clone https://github.com/twoj-login/zjazd-absolwentow-slo.git
   ```

2. Otwórz plik index.html w przeglądarce
   (dwuklik lub przez serwer lokalny, np. Live Server w VS Code).

## Status projektu

- Projekt w fazie frontend MVP.
- Planowane rozszerzenia:
- obsługa formularza (backend / API)
- zapis zgłoszeń do bazy danych
- walidacja formularza
- wyszukiwanie i filtrowanie absolwentów
- panel administratora
- integracja z e-mail (potwierdzenia zapisu)
