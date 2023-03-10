[PL 馃嚨馃嚤](https://github.com/HotFr1dge/psa-maps-activation-tool/blob/main/readme.pl-PL.md) 路 [EN 馃嚞馃嚙](https://github.com/HotFr1dge/psa-maps-activation-tool/blob/main/readme.md)

# Generator kluczy aktywacyjnych do aktualizacji map w pojazdach grupy PSA
Ten skrypt s艂u偶y do generowania klucza aktywacyjnego dla okre艣lonego pliku aktualizacji map _(CCT.DAT.inf)_ i numeru VIN. Generowane klucze s膮 kompatybilne z wi臋kszo艣ci膮 system贸w nawigacji w samochodach koncernu PSA (Citroen, Peugeot, DS Automobile) tj:
  - RT6 - plik CCT.DAT.inf z katalogu g艂贸wnego `\`
  - SMEG -  plik CCT.DAT.inf z folderu `SMEG_UPG\DATA`
  - SMEG+ - plik CCT.DAT.inf z folderu `SMEG_PLUS_UPG\DATA` 
  - SMEG IV2 - plik CCT.DAT.inf z folderu `SMEG_IV2_UPG\DATA`

Klucz aktywacyjny jest obliczany za pomoc膮 algorytmu Twofish i opiera si臋 na zawarto艣ci pliku `CCT.DAT.inf` oraz numerze VIN. Plik jest odczytywany, a jego zawarto艣膰 jest u偶ywana jako dane wej艣ciowe do algorytmu Twofish, wraz z numerem VIN i sta艂ym wektorem inicjalizacyjnym. Otrzymane zaszyfrowane dane s膮 nast臋pnie u偶ywane do wygenerowania klucza aktywacyjnego, kt贸ry jest zwracany jako ci膮g znak贸w. 

## Live Demo
Dzia艂anie skryptu mo偶na przetestowa膰 [tutaj](https://hotfr1dge.pl/mapskeygen/).

## Funkcja `generate`
```js
import generator from './generator.js';

generator(filePath: string, vinNumber: string) => Promise<string>
```
-   `filePath` - 艣cie偶ka do pliku (`CCT.DAT.inf`).
-   `vinNumber` - numer VIN do wygenerowania klucza.

Zwraca: obiekt Promise zawieraj膮cy wygenerowany klucz aktywacyjny jako ci膮g znak贸w.
Je艣li numer VIN jest zbyt kr贸tki lub wyst膮pi b艂膮d podczas odczytu pliku, zwracany jest b艂膮d.

W repozytorium znajduje si臋 przyk艂adowy plik `CCT.DAT.inf`.

## Wymagania
-   node.js v12 lub nowszy
-   npm v6 lub nowszy

## Instalacja
Aby zainstalowa膰 zale偶no艣ci, wykonaj polecenie:
`npm install` 

## U偶ycie
Aby wygenerowa膰 klucz aktywacyjny:
  1. Edytuj zawarto艣膰 pliku `index.js` wg. wzoru poni偶ej:
  ```js
  Keygen('/path/to/CCT.DAT.inf', 'EXAMPLE_VIN_NUMBER');
  ```
  2. Uruchom skrpty za pomoc膮 polecenia: `node index.js` 
  3. Wygenerowany klucz aktywacyjny zostanie wy艣wietlony w konsoli.

![Screenshoot](https://github.com/HotFr1dge/psa-maps-activation-tool/blob/main/screenshoot.png?raw=true)

Jest to implementacja oryginalnego generatora kluczy Java w JavaScript. Oryginalny generator Java: [generator_java-RT6.rar](https://www63.zippyshare.com/v/gVitj91m/file.html)

**To oprogramowanie jest dostarczane 鈥瀟akie, jakie jest鈥?, a autor tego oprogramowania nie ponosi za nie odpowiedzialno艣ci za nielegalne korzystanie z oprogramowania. U偶ytkownik jest odpowiedzialny za u偶ywanie oprogramowania zgodnie z nim z prawem ich jurysdykcji. U偶ytkownik ponosi wy艂膮czn膮 odpowiedzialno艣膰 za wszelkie konsekwencje, kt贸re mog膮 wynika膰 z u偶ywania tego oprogramowania. Korzystaj膮c z tego oprogramowania, u偶ytkownik wyra偶a zgod臋 na te warunki.**
