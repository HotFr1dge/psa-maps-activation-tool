
# Generator kluczy aktywacyjnych do aktualizacji map w pojazdach grupy PSA
Ten skrypt służy do generowania klucza aktywacyjnego dla określonego pliku aktualizacji map _(CCT.DAT.inf)_ i numeru VIN. Generowane klucze są kompatybilne z większością systemów nawigacji w samochodach koncernu PSA (Citroen, Peugeot, DS Automobile) tj:
  - RT6 - plik CCT.DAT.inf z katalogu głównego `\`
  - SMEG -  plik CCT.DAT.inf z folderu `SMEG_UPG\DATA`
  - SMEG+ - plik CCT.DAT.inf z folderu `SMEG_PLUS_UPG\DATA` 
  - SMEG IV2 - plik CCT.DAT.inf z folderu `SMEG_IV2_UPG\DATA`

Klucz aktywacyjny jest obliczany za pomocą algorytmu Twofish i opiera się na zawartości pliku `CCT.DAT.inf` oraz numerze VIN. Plik jest odczytywany, a jego zawartość jest używana jako dane wejściowe do algorytmu Twofish, wraz z numerem VIN i stałym wektorem inicjalizacyjnym. Otrzymane zaszyfrowane dane są następnie używane do wygenerowania klucza aktywacyjnego, który jest zwracany jako ciąg znaków.

## Funkcja `generate`
```js
import generator from './generator';

generator(filePath: string, vinNumber: string) => Promise<string>
```
-   `filePath` - ścieżka do pliku (`CCT.DAT.inf`).
-   `vinNumber` - numer VIN do wygenerowania klucza.

Zwraca: obiekt Promise zawierający wygenerowany klucz aktywacyjny jako ciąg znaków.
Jeśli numer VIN jest zbyt krótki lub wystąpi błąd podczas odczytu pliku, zwracany jest błąd.

W repozytorium znajduje się przykładowy plik `CCT.DAT.inf`.

## Wymagania
-   node.js v12 lub nowszy
-   npm v6 lub nowszy

## Instalacja
Aby zainstalować zależności, wykonaj polecenie:
`npm install` 

## Użycie
Aby wygenerować klucz aktywacyjny:
  1. Edytuj zawartość pliku `index.js` wg. wzoru poniżej:
  ```js
  Keygen('/path/to/CCT.DAT.inf', 'EXAMPLE_VIN_NUMBER');
  ```
  2. Uruchom skrpty za pomocą polecenia: `node index.js` 
  3. Wygenerowany klucz aktywacyjny zostanie wyświetlony w konsoli.

![Screenshoot](https://github.com/HotFr1dge/psa-maps-activation-tool/blob/main/screenshoot.png?raw=true)

Jest to implementacja oryginalnego generatora kluczy Java w JavaScript. Oryginalny generator Java: [generator_java-RT6.rar](https://www63.zippyshare.com/v/gVitj91m/file.html)

**To oprogramowanie jest dostarczane „takie, jakie jest”, a autor tego oprogramowania nie ponosi za nie odpowiedzialności za nielegalne korzystanie z oprogramowania. Użytkownik jest odpowiedzialny za używanie oprogramowania zgodnie z nim z prawem ich jurysdykcji. Użytkownik ponosi wyłączną odpowiedzialność za wszelkie konsekwencje, które mogą wynikać z używania tego oprogramowania. Korzystając z tego oprogramowania, użytkownik wyraża zgodę na te warunki.**
