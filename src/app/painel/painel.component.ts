import { Component, OnInit, EventEmitter, Output, OnDestroy} from '@angular/core';

import { Frase } from '../shared/frase.model';
import { FRASES } from './frases-mock';



@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit, OnDestroy {

  public frases: Frase[] = FRASES;
  public instrucao = 'Traduza a Frase';
  public resposta = '';

  public rodada = 0;
  public rodadaFrase: Frase;

  public progresso = 0;

  public tentativas = 3;

  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter();

  constructor() {
    this.atualizaRodada();
  }

  ngOnInit() {
  }

  ngOnDestroy() {

  }

  public atualizaResposta(resposta: Event): void {
  this.resposta = ((<HTMLInputElement>resposta.target).value);
  /*console.log(this.resposta);*/
  }

  public verificaresposta(): void {

    if (this.rodadaFrase.frasePtBr === this.resposta) {


       // trocar pergunta da rodada
    this.rodada++;

   /*progresso*/
    this.progresso = this.progresso + (100 / this.frases.length);

      /**/
      if (this.rodada === 4) {
        this.encerrarJogo.emit('vitoria');
      }

      /*Atualiza o objetivo rodadaFrase */
      this.atualizaRodada();

    } else {
      /* Diminuir a variável de tentativas */
      this.tentativas--;

      if (this.tentativas === -1) {
        this.encerrarJogo.emit('derrota');
      }
    }
  }
  public atualizaRodada() {
    /*Define a frase da rodada com base em alguma lógica*/
    this.rodadaFrase = this.frases[this.rodada];
     /*Limpar resposta */
    this.resposta = '';
  }
}
