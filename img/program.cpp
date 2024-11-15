#include "SVGdraw.h"
#include <iostream>
#include <math.h>
#include <valarray>
using namespace std;

void fraktalDrowing(int N, double D, SVGdraw &drawing, double x, double y, double size) {
    if (N == 0) {
        drawing.drawRectangle(x, y, size, size);
        return;
    }
    size = size / 3;
    // center
    fraktalDrowing(N-1, D, drawing, x+size, y+size, size);
    // left
    fraktalDrowing(N-1, D, drawing, x, y + size, size);
    // right
    fraktalDrowing(N-1, D, drawing, x+ 2 * size, y + size, size);
    // top
    fraktalDrowing(N-1, D, drawing, x+ size, y, size);
    // bottom
    fraktalDrowing(N-1, D, drawing, x + size, y+ 2 * size, size);

}

int main() {

    // nacitame vstup
    int N;
    double D;
    cin >> N >> D;

    // vytvorime obrazok predpisanych rozmerov
    SVGdraw drawing(D + 20, D + 20, "fraktal.svg");

    // nastavime vyfarbovanie stvorcov ciernou farbou
    drawing.setFillColor("black");

    // vykreslime stvorec s dolnym okrajom v bode 10, 10 a dlzkou strany D
    // TODO: namiesto tohto zavolajte rekurzivnu funkciu na kreslenie
    // fraktalu, v ktorej na vhodnom mieste zavolate drawRectangle
    double sur = (D + 20) / 2 - D / 2;
    fraktalDrowing(N, D, drawing, sur, sur, D);
    // ukoncime vykreslovanie obrazku
    drawing.finish();
}