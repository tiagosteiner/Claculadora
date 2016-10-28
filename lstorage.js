window.onload = LoadLocalData();
function LoadLocalData(){
	localStorage.setItem('Memoria_Calculadora','');
	Clear();
}
/*Funcoes de memoria*/
function MemoryRecall(){
	document.getElementById("visor").value = Number(localStorage.getItem('Memoria_Calculadora'));
}
function MemoryClear(){
	localStorage.setItem('Memoria_Calculadora', 0);
}

function Clear(){
	localStorage.setItem('Digitando_Numero','');
	localStorage.setItem('Valor_Acumulado','');
	localStorage.setItem('Operacao_Auardando_Execucao','');
	document.getElementById("erro").value = '';
	document.getElementById("visor").value = '';
}
function MemoryPlus()
{
    localStorage.setItem('Apagar_Visor','S');
	localStorage.setItem('Digitando_Numero','');

	var valor_memoria = localStorage.getItem('Memoria_Calculadora');
	var atual = document.getElementById("visor").value;
	if (valor_memoria == '')
		valor_memoria = 0;
	if (atual == '')
		atual = 0;
	localStorage.setItem('Memoria_Calculadora', Number(valor_memoria) + Number(atual));
}

/*Operacoes da calculadora*/

function Operation(op)
{
	localStorage.setItem('Apagar_Visor','S');
	localStorage.setItem('Digitando_Numero','');
	
	var visor = document.getElementById("visor").value;
	
	var operacaoAguardandoExecucao = localStorage.getItem('Operacao_Auardando_Execucao');
	if (operacaoAguardandoExecucao != '')
		ExecuteOperation(operacaoAguardandoExecucao);
	else
	{
		localStorage.setItem('Valor_Acumulado',visor);
		localStorage.setItem('Operacao_Auardando_Execucao',op);
	}
	
	if (op == "=")
	{
		localStorage.setItem('Operacao_Auardando_Execucao','');
		localStorage.setItem('Valor_Acumulado','');
	}
		
}

function ExecuteOperation(op)
{
	document.getElementById("erro").innerText ='';
	
	var valorAcumulado = localStorage.getItem('Valor_Acumulado');
	if (IsInteger(valorAcumulado))
		valorAcumulado = parseInt(valorAcumulado);
	else
		valorAcumulado = parseFloat(valorAcumulado);
	
	var visor = document.getElementById("visor").value;
	var operador;
	
	if (visor == "")
		operador = 0;
	else
	{
		if (IsInteger(visor))
			operador = parseInt(visor);
		else
			operador = parseFloat(visor);
	}
	
	var resultado;
	var erro = '';
	switch (op)
	{
		case "+":
			resultado = valorAcumulado + operador;
			break;
		case "-":
			resultado = valorAcumulado - operador;
			break;
		case "*":
			resultado = valorAcumulado * operador;
			break;
		case "/":
			if (operador == 0)
				erro = "Impossível dividir por zero";
			else
				resultado = valorAcumulado / operador;
			break;
	}
	if (erro == '')
	{
		localStorage.setItem('Valor_Acumulado',resultado);
	    document.getElementById("visor").value = resultado
	}
	else
	{
		document.getElementById("erro").innerText = erro;
	}
}

function IsInteger(numero)
{
	var x = numero;
	if (x % 1 === 0)
		return true;
	else
		return false;
}

function Digit(numero){
	document.getElementById("erro").innerText ='';
	var apagarVisor = localStorage.getItem('Apagar_Visor');
	if (apagarVisor == 'S')
	{
		document.getElementById("visor").value = "";
		localStorage.setItem('Apagar_Visor','N');
	}
	
	var digitandoNumero = localStorage.getItem('Digitando_Numero');
	if (digitandoNumero == null)
		digitandoNumero = 0;
	
	digitandoNumero = (digitandoNumero*10)+numero;
	document.getElementById("visor").value = digitandoNumero;
	localStorage.setItem('Digitando_Numero',digitandoNumero);
}