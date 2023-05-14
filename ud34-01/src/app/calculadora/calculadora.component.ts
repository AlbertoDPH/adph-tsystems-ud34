import { Component } from '@angular/core';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css'],
})
export class CalculadoraComponent {
  pantalla: string = '0';
  operandos: string[] = [];
  operador: string = '';

  botonPresionado(valor: string): void {
    if (!isNaN(parseInt(valor))) {
      this.numeroPresionado(valor);
    } else if (
      valor === '+' ||
      valor === '-' ||
      valor === '*' ||
      valor === '/'
    ) {
      this.operadorPresionado(valor);
    } else {
      this.accionPresionado(valor);
    }
  }

  numeroPresionado(valor: string): void {
    if (this.pantalla === '0') {
      this.pantalla = valor;
    } else {
      this.pantalla += valor;
    }
  }

  operadorPresionado(valor: string): void {
    if (this.pantalla !== '0') {
      this.operandos.push(this.pantalla);
      this.operador = valor;
      this.pantalla += ' ' + valor + ' ';
    }
  }

  accionPresionado(valor: string): void {
    switch (valor) {
      case 'R':
        this.pantalla = this.pantalla.slice(0, -1);
        break;
      case 'CE':
        this.pantalla = 'deshabilatado';
        break;
      case 'C':
        this.pantalla = '0';
        break;
      case ',':
        if (!this.pantalla.includes('.')) {
          this.pantalla += '.';
        }
        break;
      case '=':
        if (this.operandos.length === 1 && this.pantalla !== '') {
          let resultado = this.realizarOperacion(
            this.operandos[0],
            this.pantalla,
            this.operador
          );
          this.pantalla = resultado.toString();
          this.operandos = []; // reiniciar operandos y operador para la próxima operación
          this.operador = '';
        }
        break;
    }
  }

  realizarOperacion(valor1: string, valor2: string, operacion: string): number {
    let resultado = 0;

    switch (operacion) {
      case '+':
        resultado = parseFloat(valor1) + parseFloat(valor2);
        break;
      case '-':
        resultado = parseFloat(valor1) - parseFloat(valor2);
        break;
      case '*':
        resultado = parseFloat(valor1) * parseFloat(valor2);
        break;
      case '/':
        resultado = parseFloat(valor1) / parseFloat(valor2);
        break;
      default:
        resultado = 0;
    }

    return resultado;
  }
}
