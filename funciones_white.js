// JavaScript Document

//MULTIJADOR --> CAMBIAN POSICION DE REY, REINA, ENROQUE Y SALIDA PARA EL OTRO TABLERO
var salida_w = true;
var turno = 1;
var coronar_otro = false;
var enviar_mov = true;  //esta en true porque arranca el blanco
var pieza_cor_otro = '';
var html_pieza_cor_otro = '';
var pos2 = '';

function send_move(pieza,html_pieza)
{
	if (enviar_mov == false)
	{
		enviar_mov = true;  //los dos jugadores ejecutan el mismo codigo, el primer envio es la replica del otro jugador: enviar_mov queda en false autometicamente para el 1er envio y para el segundo envio manda;
		return false;
	}

	if(pieza)
		document.getElementById('chess_b').contentWindow.postMessage([white_coord[mov_yx[0]],white_coord[mov_yx[1]],pieza,html_pieza], 'http://www.pampachess.com/');
	else
		document.getElementById('chess_b').contentWindow.postMessage([white_coord[mov_yx[0]],white_coord[mov_yx[1]]], 'http://www.pampachess.com/');
}


window.addEventListener("message", receiveMessage, false);

function segundo_click_otro_jugador()
{
	document.getElementById('chess_table').rows[parseInt(pos2.charAt(0))].cells[parseInt(pos2.charAt(1))].click();
}

function receiveMessage(event)
{
  var origin = event.origin || event.originalEvent.origin; // For Chrome, the origin property is in the event.originalEvent object.
  //if (origin !== "http://localhost:8080/")
    //return;
	
	
	enviar_mov = false;
	
	
	var pos1 = white_rev[event.data[0]];
	pos2 = white_rev[event.data[1]];
	
	
	console.log('player1: receive move');
		
	
	if (event.data[2])
	{ 
		coronar_otro = true;
		pieza_cor_otro = event.data[2]; 
		if (event.data[3]) html_pieza_cor_otro = event.data[3];
		
		document.getElementById('chess_table').rows[parseInt(pos1.charAt(0))].cells[parseInt(pos1.charAt(1))].click();
		//document.getElementById('chess_table').rows[parseInt(pos2.charAt(0))].cells[parseInt(pos2.charAt(1))].click();
		
		return false;
	}
	
	document.getElementById('chess_table').rows[parseInt(pos1.charAt(0))].cells[parseInt(pos1.charAt(1))].click();
	//document.getElementById('chess_table').rows[parseInt(pos2.charAt(0))].cells[parseInt(pos2.charAt(1))].click();
}


var mov_ataque_blancas = {a:[[5,1]], b:[[5,0],[5,2]], c:[[5,1],[5,3]], d:[[5,2],[5,4]], e:[[5,3],[5,5]], f:[[5,4],[5,6]], g:[[5,5],[5,7]], h:[[5,6]], 4:[[5,0],[5,2],[6,3]], 7:[[5,5],[5,7],[6,4]], 1:[[6,3],[6,4],[6,5],[7,3],[7,5]]};
var mov_ataque_negras = {a:[[2,1]], b:[[2,0],[2,2]], c:[[2,1],[2,3]], d:[[2,2],[2,4]], e:[[2,3],[2,5]], f:[[2,4],[2,6]], g:[[2,5],[2,7]], h:[[2,6]], 4:[[2,0],[2,2],[1,3]], 7:[[2,5],[2,7],[1,4]], 1:[[0,3],[0,5],[1,3],[1,4],[1,5]]};
var pos_piezas_blancas = {1:[7,4], 2:[7,3], 3:[7,2], 4:[7,1], 5:[7,0], 6:[7,5], 7:[7,6], 8:[7,7], a:[6,0], b:[6,1], c:[6,2], d:[6,3], e:[6,4], f:[6,5], g:[6,6], h:[6,7]};
var pos_piezas_negras = {1:[0,4], 2:[0,3], 3:[0,2], 4:[0,1], 5:[0,0], 6:[0,5], 7:[0,6], 8:[0,7], a:[1,0], b:[1,1], c:[1,2], d:[1,3], e:[1,4], f:[1,5], g:[1,6], h:[1,7]};



// JavaScript Document

window.addEventListener('load',inicializarEventos_media,false);

function inicializarEventos_media()
{
	var t = document.getElementById('chess_table');
	
	for (var i=0; i<8; i++)
	{
		for (var j=0; j<8; j++)
		{
			t.rows[i].cells[j].setAttribute('onClick', "mostrar_mov(this);");
			t.rows[i].cells[j].setAttribute('onMouseOver', "if (this.id) if ((this.id).charAt(2) == turno) this.style.boxShadow='0px 0px 3px #033 inset'; if (this.className == 'lighter' || this.className == 'lighter_pp' || this.className == 'lighter_e') this.style.boxShadow='0px 0px 3px #033 inset';");
			t.rows[i].cells[j].setAttribute('onMouseOut', "if (this.style.boxShadow) this.style.boxShadow='';");
		}
	}
	
	//setTimeout(click_, 1000);
}


function limpiar_casilleros()  //saca lo resltado de las celdas: casillas seleccionada, lighter, etc
{
	var t = document.getElementById('chess_table');
	
	for (var i=0; i<8; i++)
	{
		for (var j=0; j<8; j++)
		{
			if ((i+j)%2 == 0)
				t.rows[i].cells[j].className = 'casillero_blancas';
			else
				t.rows[i].cells[j].className = 'casillero_negras';
		}
	}
}

function marcar_jaque_rey()
{
	var t = document.getElementById('chess_table');
	
	if (turno == 0)
		t.rows[pos_piezas_negras[1][0]].cells[pos_piezas_negras[1][1]].className = 'jaque';
	if (turno == 1)
		t.rows[pos_piezas_blancas[1][0]].cells[pos_piezas_blancas[1][1]].className = 'jaque';
}

function marcar_peligo_rey()
{
	var t = document.getElementById('chess_table');
	
	if (turno == 0)
		t.rows[pos_piezas_negras[1][0]].cells[pos_piezas_negras[1][1]].className = 'peligro';
	if (turno == 1)
		t.rows[pos_piezas_blancas[1][0]].cells[pos_piezas_blancas[1][1]].className = 'peligro';
}
/*function deshabilitar_mov()
{
	var t = document.getElementById('chess_table');
	
	for (var i=0; i<8; i++)
	{
		for (var j=0; j<8; j++)
		{
			t.rows[i].cells[j].removeAttribute('onClick');
		}
	}
}*/

function habilitar_mov()
{
	var t = document.getElementById('chess_table');
	
	for (var i=0; i<8; i++)
	{
		for (var j=0; j<8; j++)
		{
			t.rows[i].cells[j].setAttribute("onClick","mostrar_mov(this);");
		}
	}
}



var black_rev={'a1':'07', 'a2':'17', 'a3':'27', 'a4':'37', 'a5':'47', 'a6':'57', 'a7':'67', 'a8':'77',
				'b1':'06', 'b2':'16', 'b3':'26', 'b4':'36', 'b5':'46', 'b6':'56', 'b7':'66', 'b8':'76',
				'c1':'05', 'c2':'15', 'c3':'25', 'c4':'35', 'c5':'45', 'c6':'55', 'c7':'65', 'c8':'75',
				'd1':'04', 'd2':'14', 'd3':'24', 'd4':'34', 'd5':'44', 'd6':'54', 'd7':'64', 'd8':'74',
				'e1':'03', 'e2':'13', 'e3':'23', 'e4':'33', 'e5':'43', 'e6':'53', 'e7':'63', 'e8':'73',
				'f1':'02', 'f2':'12', 'f3':'22', 'f4':'32', 'f5':'42', 'f6':'52', 'f7':'62', 'f8':'72',
				'g1':'01', 'g2':'11', 'g3':'21', 'g4':'31', 'g5':'41', 'g6':'51', 'g7':'61', 'g8':'71',
				'h1':'00', 'h2':'10', 'h3':'20', 'h4':'30', 'h5':'40', 'h6':'50', 'h7':'60', 'h8':'70'};

var black_coord={'07':'a1', '06':'b1', '05':'c1', '04':'d1', '03':'e1', '02':'f1', '01':'g1', '00':'h1',
					'17':'a2', '16':'b2', '15':'c2', '14':'d2', '13':'e2', '12':'f2', '11':'g2', '10':'h2',
					'27':'a3', '26':'b3', '25':'c3', '24':'d3', '23':'e3', '22':'f3', '21':'g3', '20':'h3',
					'37':'a4', '36':'b4', '35':'c4', '34':'d4', '33':'e4', '32':'f4', '31':'g4', '30':'h4',
					'47':'a5', '46':'b5', '45':'c5', '44':'d5', '43':'e5', '42':'f5', '41':'g5', '40':'h5',
					'57':'a6', '56':'b6', '55':'c6', '54':'d6', '53':'e6', '52':'f6', '51':'g6', '50':'h6',
					'67':'a7', '66':'b7', '65':'c7', '64':'d7', '63':'e7', '62':'f7', '61':'g7', '60':'h7',
					'77':'a8', '76':'b8', '75':'c8', '74':'d8', '73':'e8', '72':'f8', '71':'g8', '70':'h8'};


var white_rev={'a1':'70', 'a2':'60', 'a3':'50', 'a4':'40', 'a5':'30', 'a6':'20', 'a7':'10', 'a8':'00',
				'b1':'71', 'b2':'61', 'b3':'51', 'b4':'41', 'b5':'31', 'b6':'21', 'b7':'11', 'b8':'01',
				'c1':'72', 'c2':'62', 'c3':'52', 'c4':'42', 'c5':'32', 'c6':'22', 'c7':'12', 'c8':'02',
				'd1':'73', 'd2':'63', 'd3':'53', 'd4':'43', 'd5':'33', 'd6':'23', 'd7':'13', 'd8':'03',
				'e1':'74', 'e2':'64', 'e3':'54', 'e4':'44', 'e5':'34', 'e6':'24', 'e7':'14', 'e8':'04',
				'f1':'75', 'f2':'65', 'f3':'55', 'f4':'45', 'f5':'35', 'f6':'25', 'f7':'15', 'f8':'05',
				'g1':'76', 'g2':'66', 'g3':'56', 'g4':'46', 'g5':'36', 'g6':'26', 'g7':'16', 'g8':'06',
				'h1':'77', 'h2':'67', 'h3':'57', 'h4':'47', 'h5':'37', 'h6':'27', 'h7':'17', 'h8':'07'};

var white_coord={'07':'h8', '06':'g8', '05':'f8', '04':'e8', '03':'d8', '02':'c8', '01':'b8', '00':'a8',
					'17':'h7', '16':'g7', '15':'f7', '14':'e7', '13':'d7', '12':'c7', '11':'b7', '10':'a7',
					'27':'h6', '26':'g6', '25':'f6', '24':'e6', '23':'d6', '22':'c6', '21':'b6', '20':'a6',
					'37':'h5', '36':'g5', '35':'f5', '34':'e5', '33':'d5', '32':'c5', '31':'b5', '30':'a5',
					'47':'h4', '46':'g4', '45':'f4', '44':'e4', '43':'d4', '42':'c4', '41':'b4', '40':'a4',
					'57':'h3', '56':'g3', '55':'f3', '54':'e3', '53':'d3', '52':'c3', '51':'b3', '50':'a3',
					'67':'h2', '66':'g2', '65':'f2', '64':'e2', '63':'d2', '62':'c2', '61':'b2', '60':'a2',
					'77':'h1', '76':'g1', '75':'f1', '74':'e1', '73':'d1', '72':'c1', '71':'b1', '70':'a1'};


var num_mov = 0;
var pieza;  // = elemento (1era casilla) seleccionado
var pieza2; //casillero salida (el)
var pieza3; //casillero al que se mueve (el)
var pieza_activa = false;
var ultimo_mov = [];  //[nºmov, fila, columna, color, peon_salida_doble]
var enroque_blancas = [false, false, false]; //mov_rey, mov_torre0, mov_torre1
var enroque_negras = [false, false, false];
var peon_al_paso;  // es el que hace salida doble
var piezas_inmoviles = {};
var jaque = false;
var mate = false;
var jaque_pos = {}; //[0, 0, 0, 0, false] : [] --> y,x,color,pieza,true/false : mov_jaque
var jaque_mov_rey = [];
var jaque_mov_piezas = {};
var tablas = false;

var pieza_coronar;
var id_coronar = '';
var mov_yx = ['',''];  //xy_salida, xy_llegada

// JavaScript Document

function mostrar_mov(el)
{
	//---------------- derivo
	if (mate == true)
		return false;
	
	if (el.className == 'lighter')
	{
		mover_pieza(el);
		return false;
	}
	
	if (el.className == 'lighter_pp')
	{
		mover_pieza_pp(el);
		return false;
	}
	
	if (el.className == 'lighter_e')
	{
		mover_pieza_e(el);
		return false;
	}
	
	//---------------- verifico los clicks
	var id = el.id;
	
	var y = parseInt(id.charAt(0));
	var x = parseInt(id.charAt(1));
	
	//----------------
	mov_yx[0] = y+''+x;
	
	//----------------
	if (!id)
		return false;
	else
	{
		var t = document.getElementById('chess_table');
		
		if ((id.charAt(2) == turno) && (!pieza))
		{
			pieza = el;
			t.rows[y].cells[x].className = 'casillero_seleccionado';
			pieza_activa = true;
		}
		else if ((id.charAt(2) == turno) && (id != pieza.id))
		{
			pieza = el;
			pieza_activa = true;
			limpiar_casilleros();
			t.rows[y].cells[x].className = 'casillero_seleccionado';
			if (jaque)
				marcar_jaque_rey();
		}
		else if ((id.charAt(2) == turno) && (id == pieza.id))
		{
			if (pieza_activa)
			{
				limpiar_casilleros();
				if (jaque)
					marcar_jaque_rey();
				pieza_activa = false;
				return false;
			}
			else
				t.rows[y].cells[x].className = 'casillero_seleccionado';
		}
		else
			return false;
	}
	
	pieza_activa = true;
	
	//---------------- muestro los moviemientos
	if (jaque == true)
	{
		mov_jaque(el);
		return false;
	}
	
	var claves = Object.getOwnPropertyNames(piezas_inmoviles);
	if (claves.length > 0)
	{
		for (key in piezas_inmoviles)
			if (el.id == key)
			{
				mov_pieza_bloqueada(key)
				return false;
			}
	}
	
	
	// -------------------> MOVIMIENTO DE PIEZAS <------------------------
	
	var mov = [];
	
	var p1 = 0;
	if (id.charAt(4))
		p1 = id.charAt(4);
	
	if ((id.charAt(2)) == 1) //blancas O NEGRAS INV
	{
		if (p1 == 0) //piezas no coronadas
		{
			if (isNaN(id.charAt(3))) //movimientos peón (no coronados)
			{
				if (y == 6)
				{
					if (!t.rows[y-1].cells[x].id)
						mov.push([y-1, x]);
					if ((!t.rows[y-1].cells[x].id) && (!t.rows[y-2].cells[x].id))
						mov.push([y-2, x]);
				}
				else
				{
					if (!t.rows[y-1].cells[x].id)
						mov.push([y-1, x]);
				}
				
				if ((x-1) >= 0)
					if (t.rows[y-1].cells[x-1].id)
						if ((t.rows[y-1].cells[x-1].id).charAt(2) == 0)
							mov.push([y-1, x-1]);
				if ((x+1) < 8)
					if (t.rows[y-1].cells[x+1].id)
						if ((t.rows[y-1].cells[x+1].id).charAt(2) == 0)
							mov.push([y-1, x+1]);
				
				for (var i=0; i<mov.length; i++)
					t.rows[mov[i][0]].cells[mov[i][1]].className = 'lighter';
	
				// peon al paso
				if (((ultimo_mov[4] == true) && (y == 3)) && ((ultimo_mov[2] == (x+1)) || (ultimo_mov[2] == (x-1))))
					t.rows[ultimo_mov[1]-1].cells[ultimo_mov[2]].className = 'lighter_pp';
				
				//***********
				if (enviar_mov == false)
					segundo_click_otro_jugador();
				//***********
				return false;
			}
		}
		
		if ((id.charAt(3) == 3) || (id.charAt(3) == 6) || (p1 == 3)) //movimientos alfil
		{
			var y = parseInt(id.charAt(0));
			var x = parseInt(id.charAt(1));
			while (y>0 && x>0)
			{
				if (!t.rows[y-1].cells[x-1].id)
					mov.push([y-1, x-1]);
				else if ((t.rows[y-1].cells[x-1].id).charAt(2) == 1)
					break;
				else if ((t.rows[y-1].cells[x-1].id).charAt(2) == 0)
				{
					mov.push([y-1, x-1]);
					break;
				}
				--y;
				--x;
			}
			var y = parseInt(id.charAt(0));
			var x = parseInt(id.charAt(1));
			while (y>0 && x<7)
			{
				if (!t.rows[y-1].cells[x+1].id)
					mov.push([y-1, x+1]);
				else if ((t.rows[y-1].cells[x+1].id).charAt(2) == 1)
					break;
				else if ((t.rows[y-1].cells[x+1].id).charAt(2) == 0)
				{
					mov.push([y-1, x+1]);
					break;
				}
				--y;
				++x;
			}
			var y = parseInt(id.charAt(0));
			var x = parseInt(id.charAt(1));
			while (y<7 && x>0)
			{
				if (!t.rows[y+1].cells[x-1].id)
					mov.push([y+1, x-1]);
				else if ((t.rows[y+1].cells[x-1].id).charAt(2) == 1)
					break;
				else if ((t.rows[y+1].cells[x-1].id).charAt(2) == 0)
				{
					mov.push([y+1, x-1]);
					break;
				}
				++y;
				--x;
			}
			var y = parseInt(id.charAt(0));
			var x = parseInt(id.charAt(1));
			while (y<7 && x<7)
			{
				if (!t.rows[y+1].cells[x+1].id)
					mov.push([y+1, x+1]);
				else if ((t.rows[y+1].cells[x+1].id).charAt(2) == 1)
					break;
				else if ((t.rows[y+1].cells[x+1].id).charAt(2) == 0)
				{
					mov.push([y+1, x+1]);
					break;
				}
				++y;
				++x;
			}
			
			for (var i=0; i<mov.length; i++)
				t.rows[mov[i][0]].cells[mov[i][1]].className = 'lighter';
		}	
		
		else if ((id.charAt(3) == 5) || (id.charAt(3) == 8) || (p1 == 5)) //movimientos torre
		{
			var y = parseInt(id.charAt(0));
			var x = parseInt(id.charAt(1));
			while (y>0)
			{
				if (!t.rows[y-1].cells[x].id)
					mov.push([y-1, x]);
				else if ((t.rows[y-1].cells[x].id).charAt(2) == 1)
					break;
				else if ((t.rows[y-1].cells[x].id).charAt(2) == 0)
				{
					mov.push([y-1, x]);
					break;
				}
				--y;
			}
			var y = parseInt(id.charAt(0));
			var x = parseInt(id.charAt(1));
			while (y<7)
			{
				if (!t.rows[y+1].cells[x].id)
					mov.push([y+1, x]);
				else if ((t.rows[y+1].cells[x].id).charAt(2) == 1)
					break;
				else if ((t.rows[y+1].cells[x].id).charAt(2) == 0)
				{
					mov.push([y+1, x]);
					break;
				}
				++y;
			}
			var y = parseInt(id.charAt(0));
			var x = parseInt(id.charAt(1));
			while (x>0)
			{
				if (!t.rows[y].cells[x-1].id)
					mov.push([y, x-1]);
				else if ((t.rows[y].cells[x-1].id).charAt(2) == 1)
					break;
				else if ((t.rows[y].cells[x-1].id).charAt(2) == 0)
				{
					mov.push([y, x-1]);
					break;
				}
				--x;
			}
			var y = parseInt(id.charAt(0));
			var x = parseInt(id.charAt(1));
			while (x<7)
			{
				if (!t.rows[y].cells[x+1].id)
					mov.push([y, x+1]);
				else if ((t.rows[y].cells[x+1].id).charAt(2) == 1)
					break;
				else if ((t.rows[y].cells[x+1].id).charAt(2) == 0)
				{
					mov.push([y, x+1]);
					break;
				}
				++x;
			}
			
			for (var i=0; i<mov.length; i++)
				t.rows[mov[i][0]].cells[mov[i][1]].className = 'lighter';
		}
		
		else if ((id.charAt(3) == 2) || (p1 == 2)) //movimientos dama
		{
			var y = parseInt(id.charAt(0));
			var x = parseInt(id.charAt(1));
			while (y>0)
			{
				if (!t.rows[y-1].cells[x].id)
					mov.push([y-1, x]);
				else if ((t.rows[y-1].cells[x].id).charAt(2) == 1)
					break;
				else if ((t.rows[y-1].cells[x].id).charAt(2) == 0)
				{
					mov.push([y-1, x]);
					break;
				}
				--y;
			}
			var y = parseInt(id.charAt(0));
			var x = parseInt(id.charAt(1));
			while (y<7)
			{
				if (!t.rows[y+1].cells[x].id)
					mov.push([y+1, x]);
				else if ((t.rows[y+1].cells[x].id).charAt(2) == 1)
					break;
				else if ((t.rows[y+1].cells[x].id).charAt(2) == 0)
				{
					mov.push([y+1, x]);
					break;
				}
				++y;
			}
			var y = parseInt(id.charAt(0));
			var x = parseInt(id.charAt(1));
			while (x>0)
			{
				if (!t.rows[y].cells[x-1].id)
					mov.push([y, x-1]);
				else if ((t.rows[y].cells[x-1].id).charAt(2) == 1)
					break;
				else if ((t.rows[y].cells[x-1].id).charAt(2) == 0)
				{
					mov.push([y, x-1]);
					break;
				}
				--x;
			}
			var y = parseInt(id.charAt(0));
			var x = parseInt(id.charAt(1));
			while (x<7)
			{
				if (!t.rows[y].cells[x+1].id)
					mov.push([y, x+1]);
				else if ((t.rows[y].cells[x+1].id).charAt(2) == 1)
					break;
				else if ((t.rows[y].cells[x+1].id).charAt(2) == 0)
				{
					mov.push([y, x+1]);
					break;
				}
				++x;
			}
			var y = parseInt(id.charAt(0));
			var x = parseInt(id.charAt(1));
			while (y>0 && x>0)
			{
				if (!t.rows[y-1].cells[x-1].id)
					mov.push([y-1, x-1]);
				else if ((t.rows[y-1].cells[x-1].id).charAt(2) == 1)
					break;
				else if ((t.rows[y-1].cells[x-1].id).charAt(2) == 0)
				{
					mov.push([y-1, x-1]);
					break;
				}
				--y;
				--x;
			}
			var y = parseInt(id.charAt(0));
			var x = parseInt(id.charAt(1));
			while (y>0 && x<7)
			{
				if (!t.rows[y-1].cells[x+1].id)
					mov.push([y-1, x+1]);
				else if ((t.rows[y-1].cells[x+1].id).charAt(2) == 1)
					break;
				else if ((t.rows[y-1].cells[x+1].id).charAt(2) == 0)
				{
					mov.push([y-1, x+1]);
					break;
				}
				--y;
				++x;
			}
			var y = parseInt(id.charAt(0));
			var x = parseInt(id.charAt(1));
			while (y<7 && x>0)
			{
				if (!t.rows[y+1].cells[x-1].id)
					mov.push([y+1, x-1]);
				else if ((t.rows[y+1].cells[x-1].id).charAt(2) == 1)
					break;
				else if ((t.rows[y+1].cells[x-1].id).charAt(2) == 0)
				{
					mov.push([y+1, x-1]);
					break;
				}
				++y;
				--x;
			}
			var y = parseInt(id.charAt(0));
			var x = parseInt(id.charAt(1));
			while (y<7 && x<7)
			{
				if (!t.rows[y+1].cells[x+1].id)
					mov.push([y+1, x+1]);
				else if ((t.rows[y+1].cells[x+1].id).charAt(2) == 1)
					break;
				else if ((t.rows[y+1].cells[x+1].id).charAt(2) == 0)
				{
					mov.push([y+1, x+1]);
					break;
				}
				++y;
				++x;
			}
			
			for (var i=0; i<mov.length; i++)
				t.rows[mov[i][0]].cells[mov[i][1]].className = 'lighter';
		}
		
		else if ((id.charAt(3) == 4) || (id.charAt(3) == 7) || (p1 == 4)) //movimientos caballo
		{
			if ((y-2) > -1 && (x-1) > -1)
				if (!t.rows[y-2].cells[x-1].id || (t.rows[y-2].cells[x-1].id).charAt(2) == 0)
					mov.push([y-2, x-1]);
			if ((y-2) > -1 && (x+1) < 8)
				if (!t.rows[y-2].cells[x+1].id || (t.rows[y-2].cells[x+1].id).charAt(2) == 0)
					mov.push([y-2, x+1]);
			if ((y-1) > -1 && (x-2) > -1)
				if (!t.rows[y-1].cells[x-2].id || (t.rows[y-1].cells[x-2].id).charAt(2) == 0)
					mov.push([y-1, x-2]);
			if ((y-1) > -1 && (x+2) < 8)
				if (!t.rows[y-1].cells[x+2].id || (t.rows[y-1].cells[x+2].id).charAt(2) == 0)
					mov.push([y-1, x+2]);
			if ((y+1) < 8 && (x-2) > -1)
				if (!t.rows[y+1].cells[x-2].id || (t.rows[y+1].cells[x-2].id).charAt(2) == 0)
					mov.push([y+1, x-2]);
			if ((y+1) < 8 && (x+2) < 8)
				if (!t.rows[y+1].cells[x+2].id || (t.rows[y+1].cells[x+2].id).charAt(2) == 0)
					mov.push([y+1, x+2]);
			if ((y+2) < 8 && (x-1) > -1)
				if (!t.rows[y+2].cells[x-1].id || (t.rows[y+2].cells[x-1].id).charAt(2) == 0)
					mov.push([y+2, x-1]);
			if ((y+2) < 8 && (x+1) < 8)
				if (!t.rows[y+2].cells[x+1].id || (t.rows[y+2].cells[x+1].id).charAt(2) == 0)
					mov.push([y+2, x+1]);
				
			for (var i=0; i<mov.length; i++)
				t.rows[mov[i][0]].cells[mov[i][1]].className = 'lighter';
		}
		
		else if ((id.charAt(3)) == 1) //movimientos rey
		{
			if ((y-1) > -1 && (x-1) > -1)
				if (!t.rows[y-1].cells[x-1].id || (t.rows[y-1].cells[x-1].id).charAt(2) == 0)
					mov.push([y-1, x-1]);
			if ((y-1) > -1)
				if (!t.rows[y-1].cells[x].id || (t.rows[y-1].cells[x].id).charAt(2) == 0)
					mov.push([y-1, x]);
			if ((y-1) > -1 && (x+1) < 8)
				if (!t.rows[y-1].cells[x+1].id || (t.rows[y-1].cells[x+1].id).charAt(2) == 0)
						mov.push([y-1, x+1]);
			if ((x-1) > -1)
				if (!t.rows[y].cells[x-1].id || (t.rows[y].cells[x-1].id).charAt(2) == 0)
					mov.push([y, x-1]);
			if ((y+1) < 8 && (x-1) > -1)
				if (!t.rows[y+1].cells[x-1].id || (t.rows[y+1].cells[x-1].id).charAt(2) == 0)
					mov.push([y+1, x-1]);
			if ((y+1) < 8)
				if (!t.rows[y+1].cells[x].id || (t.rows[y+1].cells[x].id).charAt(2) == 0)
					mov.push([y+1, x]);
			if ((y+1) < 8 && (x+1) < 8)
				if (!t.rows[y+1].cells[x+1].id || (t.rows[y+1].cells[x+1].id).charAt(2) == 0)
					mov.push([y+1, x+1]);
			if ((x+1) < 8)
				if (!t.rows[y].cells[x+1].id || (t.rows[y].cells[x+1].id).charAt(2) == 0)
					mov.push([y, x+1]);
			
			if (mov.length == 0)
				return false;
			
			var mov_enroque = [1,1];
			if (enroque_blancas[0] == false)
			{
				if (enroque_blancas[1] == false)
				{
					if (salida_w == true) // tablero derecho
					{
						if (!t.rows[7].cells[1].id && !t.rows[7].cells[2].id && !t.rows[7].cells[3].id)
							mov_enroque[0] = 0;
					}
					else  //tablero invertido pos_piezas_negras[1] == [7,3]
					{
						if (!t.rows[7].cells[1].id && !t.rows[7].cells[2].id)
							mov_enroque[0] = 0;
					}
				}
				if (enroque_blancas[2] == false)
				{
					if (salida_w == true) // tablero derecho
					{
						if (!t.rows[7].cells[5].id && !t.rows[7].cells[6].id)
							mov_enroque[1] = 0;
					}
					else  //tablero invertido pos_piezas_negras[1] == [7,3]
					{
						if (!t.rows[7].cells[4].id && !t.rows[7].cells[5].id && !t.rows[7].cells[6].id)
							mov_enroque[1] = 0;
					}
				}
			}
			
			var mov1 = [];
			for (key in mov_ataque_negras)
			{
				for (var i=0; i<mov_ataque_negras[key].length; i++)
				{
					for (var j=0; j<mov.length; j++)
						if (mov_ataque_negras[key][i].join('') == mov[j].join(''))
							mov1.push(j);  //estos son los movimientos del rey que coinciden con pos de ataque
					
					// verificar enroque
					if (mov_enroque[0] == 0)
					{
						if (salida_w == true) // tablero derecho
						{
							if (mov_ataque_negras[key][i].join('') == '71' || mov_ataque_negras[key][i].join('') == '72' || mov_ataque_negras[key][i].join('') == '73')
								mov_enroque[0] = 1;
						}
						else  //tablero invertido
						{
							if (mov_ataque_negras[key][i].join('') == '71' || mov_ataque_negras[key][i].join('') == '72')
								mov_enroque[0] = 1;
						}
					}
					if (mov_enroque[1] == 0)
					{
						if (salida_w == true) // tablero derecho
						{
							if (mov_ataque_negras[key][i].join('') == '75' || mov_ataque_negras[key][i].join('') == '76')
								mov_enroque[1] = 1;
						}
						else  //tablero invertido
						{
							if (mov_ataque_negras[key][i].join('') == '74' || mov_ataque_negras[key][i].join('') == '75' || mov_ataque_negras[key][i].join('') == '76')
								mov_enroque[1] = 1;
						}
					}
			//alert('indice posiciones atacadas: '+mov1);
				}
			}
			
			if (mov_enroque[0] == 0)
			{
				if (salida_w == true) // tablero derecho
					t.rows[7].cells[2].className = 'lighter_e';
				else
					t.rows[7].cells[1].className = 'lighter_e';
			}
			if (mov_enroque[1] == 0)
			{
				if (salida_w == true) // tablero derecho
					t.rows[7].cells[6].className = 'lighter_e';
				else
					t.rows[7].cells[5].className = 'lighter_e';
			}
			
			//if (mov.length == 0)
				//return false;
			if (mov1.length > 0)  //le saco a los mov del rey las pos de ataque
			{
				for (var i=0; i<mov.length; i++)
				{
					var pos = false;
					for (j=0; j<mov1.length; j++)
						if (i == mov1[j])
							pos = true;
					if (pos == false)
						t.rows[mov[i][0]].cells[mov[i][1]].className = 'lighter';
				}
			}
			else
			{
				for (var i=0; i<mov.length; i++)
					t.rows[mov[i][0]].cells[mov[i][1]].className = 'lighter';
			}
		}
	}
	else if ((id.charAt(2)) == 0) //negras
	{
		if (p1 == 0) //movimientos peón
		{
			if (isNaN(id.charAt(3)))
			{
				if (y == 1)
				{
					if (!t.rows[y+1].cells[x].id)
						mov.push([y+1, x]);
					if ((!t.rows[y+1].cells[x].id) && (!t.rows[y+2].cells[x].id))
						mov.push([y+2, x]);
				}
				else
				{
					if (!t.rows[y+1].cells[x].id)
						mov.push([y+1, x]);
				}
				
				if ((x-1) >= 0)
					if (t.rows[y+1].cells[x-1].id)
						if ((t.rows[y+1].cells[x-1].id).charAt(2) == 1)
							mov.push([y+1, x-1]);
				if ((x+1) < 8)
					if (t.rows[y+1].cells[x+1].id)
						if ((t.rows[y+1].cells[x+1].id).charAt(2) == 1)
							mov.push([y+1, x+1]);
				
				for (var i=0; i<mov.length; i++)
					t.rows[mov[i][0]].cells[mov[i][1]].className = 'lighter';
	
				// peon al paso
				if (((ultimo_mov[4] == true) && (y == 4)) && ((ultimo_mov[2] == (x+1)) || (ultimo_mov[2] == (x-1))))
					t.rows[ultimo_mov[1]+1].cells[ultimo_mov[2]].className = 'lighter_pp';
				
				//***********
				if (enviar_mov == false)
					segundo_click_otro_jugador();
				//***********
				
				return false;
			}
		}
		
		if ((id.charAt(3)) == 1) //movimientos rey
		{
			if ((y-1) > -1 && (x-1) > -1)
				if (!t.rows[y-1].cells[x-1].id || (t.rows[y-1].cells[x-1].id).charAt(2) == 1)
					mov.push([y-1, x-1]);
			if ((y-1) > -1)
				if (!t.rows[y-1].cells[x].id || (t.rows[y-1].cells[x].id).charAt(2) == 1)
					mov.push([y-1, x]);
			if ((y-1) > -1 && (x+1) < 8)
				if (!t.rows[y-1].cells[x+1].id || (t.rows[y-1].cells[x+1].id).charAt(2) == 1)
						mov.push([y-1, x+1]);
			if ((x-1) > -1)
				if (!t.rows[y].cells[x-1].id || (t.rows[y].cells[x-1].id).charAt(2) == 1)
					mov.push([y, x-1]);
			if ((y+1) < 8 && (x-1) > -1)
				if (!t.rows[y+1].cells[x-1].id || (t.rows[y+1].cells[x-1].id).charAt(2) == 1)
					mov.push([y+1, x-1]);
			if ((y+1) < 8)
				if (!t.rows[y+1].cells[x].id || (t.rows[y+1].cells[x].id).charAt(2) == 1)
					mov.push([y+1, x]);
			if ((y+1) < 8 && (x+1) < 8)
				if (!t.rows[y+1].cells[x+1].id || (t.rows[y+1].cells[x+1].id).charAt(2) == 1)
					mov.push([y+1, x+1]);
			if ((x+1) < 8)
				if (!t.rows[y].cells[x+1].id || (t.rows[y].cells[x+1].id).charAt(2) == 1)
					mov.push([y, x+1]);
			//alert('todos mov rey: '+mov);
			//alert(mov[0].join(''));
			
			if (mov.length == 0)
				return false;
			
			var mov_enroque = [1,1];
			if (enroque_negras[0] == false)
			{
				if (enroque_negras[1] == false)
				{
					if (salida_w == true) // tablero derecho
					{
						if (!t.rows[0].cells[1].id && !t.rows[0].cells[2].id && !t.rows[0].cells[3].id)
							mov_enroque[0] = 0;
					}
					else  // tablero invertido
					{
						if (!t.rows[0].cells[1].id && !t.rows[0].cells[2].id)
							mov_enroque[0] = 0;
					}
				}
				if (enroque_negras[2] == false)
				{
					if (salida_w == true) // tablero derecho
					{
						if (!t.rows[0].cells[5].id && !t.rows[0].cells[6].id)
							mov_enroque[1] = 0;
					}
					else  //tablero invertido
					{
						if (!t.rows[0].cells[4].id && !t.rows[0].cells[5].id && !t.rows[0].cells[6].id)
							mov_enroque[1] = 0;
					}
				}
			}
			
			var mov1 = [];
			for (key in mov_ataque_blancas)
			{
				for (var i=0; i<mov_ataque_blancas[key].length; i++)
				{
					for (var j=0; j<mov.length; j++)
						if (mov_ataque_blancas[key][i].join('') == mov[j].join(''))
							mov1.push(j);
					
					// verificar enroque
					if (mov_enroque[0] == 0)
					{
						if (salida_w == true) // tablero derecho
						{
							if (mov_ataque_blancas[key][i].join('') == '01' || mov_ataque_blancas[key][i].join('') == '02' || mov_ataque_blancas[key][i].join('') == '03')
								mov_enroque[0] = 1;
						}
						else  //tablero invertido
						{
							if (mov_ataque_blancas[key][i].join('') == '01' || mov_ataque_blancas[key][i].join('') == '02')
								mov_enroque[0] = 1;
						}
					}
					if (mov_enroque[1] == 0)
					{
						if (salida_w == true) // tablero derecho
						{
							if (mov_ataque_blancas[key][i].join('') == '05' || mov_ataque_blancas[key][i].join('') == '06')
								mov_enroque[1] = 1;
						}
						else //tablero invertido
						{
							if (mov_ataque_blancas[key][i].join('') == '04' || mov_ataque_blancas[key][i].join('') == '05' || mov_ataque_blancas[key][i].join('') == '06')
								mov_enroque[1] = 1;
						}
					}
			//alert('indice posiciones atacadas: '+mov1);
				}
			}
			
			if (mov_enroque[0] == 0)
			{
				if (salida_w == true) // tablero derecho
					t.rows[0].cells[2].className = 'lighter_e';
				else
					t.rows[0].cells[1].className = 'lighter_e';
			}
			if (mov_enroque[1] == 0)
			{
				if (salida_w == true) // tablero derecho
					t.rows[0].cells[6].className = 'lighter_e';
				else
					t.rows[0].cells[5].className = 'lighter_e';
			}
			
			//if (mov.length == 0)
				//return false;
			if (mov1.length > 0)
			{
				for (var i=0; i<mov.length; i++)
				{
					var pos = false;
					for (j=0; j<mov1.length; j++)
						if (i == mov1[j])
							pos = true;
					if (pos == false)
						t.rows[mov[i][0]].cells[mov[i][1]].className = 'lighter';
				}
			}
			else
			{
				for (var i=0; i<mov.length; i++)

					t.rows[mov[i][0]].cells[mov[i][1]].className = 'lighter';
			}
		}
		
		else if ((id.charAt(3) == 3) || (id.charAt(3) == 6) || (p1 == 3)) //movimientos alfil
		{
			var y = parseInt(id.charAt(0));
			var x = parseInt(id.charAt(1));
			while (y>0 && x>0)
			{
				if (!t.rows[y-1].cells[x-1].id)
					mov.push([y-1, x-1]);
				else if ((t.rows[y-1].cells[x-1].id).charAt(2) == 0)
					break;
				else if ((t.rows[y-1].cells[x-1].id).charAt(2) == 1)
				{
					mov.push([y-1, x-1]);
					break;
				}
				--y;
				--x;
			}
			var y = parseInt(id.charAt(0));
			var x = parseInt(id.charAt(1));
			while (y>0 && x<7)
			{
				if (!t.rows[y-1].cells[x+1].id)
					mov.push([y-1, x+1]);
				else if ((t.rows[y-1].cells[x+1].id).charAt(2) == 0)
					break;
				else if ((t.rows[y-1].cells[x+1].id).charAt(2) == 1)
				{
					mov.push([y-1, x+1]);
					break;
				}
				--y;
				++x;
			}
			var y = parseInt(id.charAt(0));
			var x = parseInt(id.charAt(1));
			while (y<7 && x>0)
			{
				if (!t.rows[y+1].cells[x-1].id)
					mov.push([y+1, x-1]);
				else if ((t.rows[y+1].cells[x-1].id).charAt(2) == 0)
					break;
				else if ((t.rows[y+1].cells[x-1].id).charAt(2) == 1)
				{
					mov.push([y+1, x-1]);
					break;
				}
				++y;
				--x;
			}
			var y = parseInt(id.charAt(0));
			var x = parseInt(id.charAt(1));
			while (y<7 && x<7)
			{
				if (!t.rows[y+1].cells[x+1].id)
					mov.push([y+1, x+1]);
				else if ((t.rows[y+1].cells[x+1].id).charAt(2) == 0)
					break;
				else if ((t.rows[y+1].cells[x+1].id).charAt(2) == 1)
				{
					mov.push([y+1, x+1]);
					break;
				}
				++y;
				++x;
			}
			
			for (var i=0; i<mov.length; i++)
				t.rows[mov[i][0]].cells[mov[i][1]].className = 'lighter';
		}	
		
		else if ((id.charAt(3) == 5) || (id.charAt(3) == 8) || (p1 == 5)) //movimientos torre
		{
			var y = parseInt(id.charAt(0));
			var x = parseInt(id.charAt(1));
			while (y>0)
			{
				if (!t.rows[y-1].cells[x].id)
					mov.push([y-1, x]);
				else if ((t.rows[y-1].cells[x].id).charAt(2) == 0)
					break;
				else if ((t.rows[y-1].cells[x].id).charAt(2) == 1)
				{
					mov.push([y-1, x]);
					break;
				}
				--y;
			}
			var y = parseInt(id.charAt(0));
			var x = parseInt(id.charAt(1));
			while (y<7)
			{
				if (!t.rows[y+1].cells[x].id)
					mov.push([y+1, x]);
				else if ((t.rows[y+1].cells[x].id).charAt(2) == 0)
					break;
				else if ((t.rows[y+1].cells[x].id).charAt(2) == 1)
				{
					mov.push([y+1, x]);
					break;
				}
				++y;
			}
			var y = parseInt(id.charAt(0));
			var x = parseInt(id.charAt(1));
			while (x>0)
			{
				if (!t.rows[y].cells[x-1].id)
					mov.push([y, x-1]);
				else if ((t.rows[y].cells[x-1].id).charAt(2) == 0)
					break;
				else if ((t.rows[y].cells[x-1].id).charAt(2) == 1)
				{
					mov.push([y, x-1]);
					break;
				}
				--x;
			}
			var y = parseInt(id.charAt(0));
			var x = parseInt(id.charAt(1));
			while (x<7)
			{
				if (!t.rows[y].cells[x+1].id)
					mov.push([y, x+1]);
				else if ((t.rows[y].cells[x+1].id).charAt(2) == 0)
					break;
				else if ((t.rows[y].cells[x+1].id).charAt(2) == 1)
				{
					mov.push([y, x+1]);
					break;
				}
				++x;
			}
			
			for (var i=0; i<mov.length; i++)
				t.rows[mov[i][0]].cells[mov[i][1]].className = 'lighter';
		}
		
		else if ((id.charAt(3) == 2) || (p1 == 2)) //movimientos dama
		{
			var y = parseInt(id.charAt(0));
			var x = parseInt(id.charAt(1));
			while (y>0)
			{
				if (!t.rows[y-1].cells[x].id)
					mov.push([y-1, x]);
				else if ((t.rows[y-1].cells[x].id).charAt(2) == 0)
					break;
				else if ((t.rows[y-1].cells[x].id).charAt(2) == 1)
				{
					mov.push([y-1, x]);
					break;
				}
				--y;
			}
			var y = parseInt(id.charAt(0));
			var x = parseInt(id.charAt(1));
			while (y<7)
			{
				if (!t.rows[y+1].cells[x].id)
					mov.push([y+1, x]);
				else if ((t.rows[y+1].cells[x].id).charAt(2) == 0)
					break;
				else if ((t.rows[y+1].cells[x].id).charAt(2) == 1)
				{
					mov.push([y+1, x]);
					break;
				}
				++y;
			}
			var y = parseInt(id.charAt(0));
			var x = parseInt(id.charAt(1));
			while (x>0)
			{
				if (!t.rows[y].cells[x-1].id)
					mov.push([y, x-1]);
				else if ((t.rows[y].cells[x-1].id).charAt(2) == 0)
					break;
				else if ((t.rows[y].cells[x-1].id).charAt(2) == 1)
				{
					mov.push([y, x-1]);
					break;
				}
				--x;
			}
			var y = parseInt(id.charAt(0));
			var x = parseInt(id.charAt(1));
			while (x<7)
			{
				if (!t.rows[y].cells[x+1].id)
					mov.push([y, x+1]);
				else if ((t.rows[y].cells[x+1].id).charAt(2) == 0)
					break;
				else if ((t.rows[y].cells[x+1].id).charAt(2) == 1)
				{
					mov.push([y, x+1]);
					break;
				}
				++x;
			}
			var y = parseInt(id.charAt(0));
			var x = parseInt(id.charAt(1));
			while (y>0 && x>0)
			{
				if (!t.rows[y-1].cells[x-1].id)
					mov.push([y-1, x-1]);
				else if ((t.rows[y-1].cells[x-1].id).charAt(2) == 0)
					break;
				else if ((t.rows[y-1].cells[x-1].id).charAt(2) == 1)
				{
					mov.push([y-1, x-1]);
					break;
				}
				--y;
				--x;
			}
			var y = parseInt(id.charAt(0));
			var x = parseInt(id.charAt(1));
			while (y>0 && x<7)
			{
				if (!t.rows[y-1].cells[x+1].id)
					mov.push([y-1, x+1]);
				else if ((t.rows[y-1].cells[x+1].id).charAt(2) == 0)
					break;
				else if ((t.rows[y-1].cells[x+1].id).charAt(2) == 1)
				{
					mov.push([y-1, x+1]);
					break;
				}
				--y;
				++x;
			}
			var y = parseInt(id.charAt(0));
			var x = parseInt(id.charAt(1));
			while (y<7 && x>0)
			{
				if (!t.rows[y+1].cells[x-1].id)
					mov.push([y+1, x-1]);
				else if ((t.rows[y+1].cells[x-1].id).charAt(2) == 0)
					break;
				else if ((t.rows[y+1].cells[x-1].id).charAt(2) == 1)
				{
					mov.push([y+1, x-1]);
					break;
				}
				++y;
				--x;
			}
			var y = parseInt(id.charAt(0));
			var x = parseInt(id.charAt(1));
			while (y<7 && x<7)
			{
				if (!t.rows[y+1].cells[x+1].id)
					mov.push([y+1, x+1]);
				else if ((t.rows[y+1].cells[x+1].id).charAt(2) == 0)
					break;
				else if ((t.rows[y+1].cells[x+1].id).charAt(2) == 1)
				{
					mov.push([y+1, x+1]);
					break;
				}
				++y;
				++x;
			}
			
			for (var i=0; i<mov.length; i++)
				t.rows[mov[i][0]].cells[mov[i][1]].className = 'lighter';
		}
		
		else if ((id.charAt(3) == 4) || (id.charAt(3) == 7) || (p1 == 4)) //movimientos caballo
		{
			if ((y-2) > -1 && (x-1) > -1)
				if (!t.rows[y-2].cells[x-1].id || (t.rows[y-2].cells[x-1].id).charAt(2) == 1)
					mov.push([y-2, x-1]);
			if ((y-2) > -1 && (x+1) < 8)
				if (!t.rows[y-2].cells[x+1].id || (t.rows[y-2].cells[x+1].id).charAt(2) == 1)
					mov.push([y-2, x+1]);
			if ((y-1) > -1 && (x-2) > -1)
				if (!t.rows[y-1].cells[x-2].id || (t.rows[y-1].cells[x-2].id).charAt(2) == 1)
					mov.push([y-1, x-2]);
			if ((y-1) > -1 && (x+2) < 8)
				if (!t.rows[y-1].cells[x+2].id || (t.rows[y-1].cells[x+2].id).charAt(2) == 1)
					mov.push([y-1, x+2]);
			if ((y+1) < 8 && (x-2) > -1)
				if (!t.rows[y+1].cells[x-2].id || (t.rows[y+1].cells[x-2].id).charAt(2) == 1)
					mov.push([y+1, x-2]);
			if ((y+1) < 8 && (x+2) < 8)
				if (!t.rows[y+1].cells[x+2].id || (t.rows[y+1].cells[x+2].id).charAt(2) == 1)
					mov.push([y+1, x+2]);
			if ((y+2) < 8 && (x-1) > -1)
				if (!t.rows[y+2].cells[x-1].id || (t.rows[y+2].cells[x-1].id).charAt(2) == 1)
					mov.push([y+2, x-1]);
			if ((y+2) < 8 && (x+1) < 8)
				if (!t.rows[y+2].cells[x+1].id || (t.rows[y+2].cells[x+1].id).charAt(2) == 1)
					mov.push([y+2, x+1]);
				
			for (var i=0; i<mov.length; i++)
				t.rows[mov[i][0]].cells[mov[i][1]].className = 'lighter';
		}
	}
	//***********
	if (enviar_mov == false)
		segundo_click_otro_jugador();
	//***********
}

// JavaScript Document

function mov_pieza_bloqueada(id)
{
	//var claves = Object.getOwnPropertyNames(piezas_inmoviles);
	var t = document.getElementById('chess_table');
	var y1 = piezas_inmoviles[id][0][0];
	var x1 = piezas_inmoviles[id][0][1];
	
	if (id[4])
	{
		var p = id[3]+id[4];
		var p1 = 1;
	}
	else 
	{
		var p = id[3];
		var p1 = 0;
	}
	
	marcar_peligo_rey()  //advierto que hay mov. reducidos por posible jaque
	
	if (turno == 0)
	{
		if (isNaN(id[3]) && p1 == 0) //mov peon
		{
			var y = parseInt(id[0]);
			var x = parseInt(id[1]);
			
			if (y == 1)  //peon en pos. de salida
			{
				if (!t.rows[y+1].cells[x].id)
					for (var i=0; i<piezas_inmoviles[id].length; i++)
						if (piezas_inmoviles[id][i].join('') == (y+1)+''+x)
							t.rows[y+1].cells[x].className = 'lighter';
				if ((!t.rows[y+1].cells[x].id) && (!t.rows[y+2].cells[x].id))
					for (var i=0; i<piezas_inmoviles[id].length; i++)
						if (piezas_inmoviles[id][i].join('') == (y+2)+''+x)
							t.rows[y+2].cells[x].className = 'lighter';
			}
			else
			{
				if (!t.rows[y+1].cells[x].id)
					for (var i=0; i<piezas_inmoviles[id].length; i++)
						if (piezas_inmoviles[id][i].join('') == (y+1)+''+x)
							t.rows[y+1].cells[x].className = 'lighter';
			}
			
			//MOV PEON (ATAQUE)
			if ((x-1) >= 0)
				if ((t.rows[y+1].cells[x-1].id).charAt(0) == y1 && (t.rows[y+1].cells[x-1].id).charAt(1) == x1)
					t.rows[y+1].cells[x-1].className = 'lighter';
			if ((x+1) < 8)
				if ((t.rows[y+1].cells[x+1].id).charAt(0) == y1 && (t.rows[y+1].cells[x+1].id).charAt(1) == x1)
					t.rows[y+1].cells[x+1].className = 'lighter';
			
			//***********
			if (enviar_mov == false)
				segundo_click_otro_jugador();
			//***********
			
			return false;
		}					
		
		if (id[3] == 4 || id[3] == 7)
		{
			//for (key in mov_ataque_negras)
				//if (key == id[3])
					for (var i=0; i<mov_ataque_negras[p].length; i++)
						if (mov_ataque_negras[p][i].join('') == (y1+''+x1))
							t.rows[y1].cells[x1].className = 'lighter';
			
			//***********
			if (enviar_mov == false)
				segundo_click_otro_jugador();
			//***********
		}
		else
		{
			//for (key in mov_ataque_negras)
				//if (key == id[3])
					for (var i=0; i<mov_ataque_negras[p].length; i++)
						for (var j=0; j<piezas_inmoviles[id].length; j++)
							if (mov_ataque_negras[p][i].join('') == piezas_inmoviles[id][j].join(''))
								t.rows[piezas_inmoviles[id][j][0]].cells[piezas_inmoviles[id][j][1]].className = 'lighter';
		
			//***********
			if (enviar_mov == false)
				segundo_click_otro_jugador();
			//***********
		}
	}
	else if (turno == 1)
	{
		if (isNaN(id[3]) && p1 == 0)
		{
			var y = parseInt(id[0]);
			var x = parseInt(id[1]);
			
			if (y == 6)
			{
				if (!t.rows[y-1].cells[x].id)
					for (var i=0; i<piezas_inmoviles[id].length; i++)
						if (piezas_inmoviles[id][i].join('') == (y-1)+''+x)
							t.rows[y-1].cells[x].className = 'lighter';
				if ((!t.rows[y-1].cells[x].id) && (!t.rows[y-2].cells[x].id))
					for (var i=0; i<piezas_inmoviles[id].length; i++)
						if (piezas_inmoviles[id][i].join('') == (y-2)+''+x)
							t.rows[y-2].cells[x].className = 'lighter';
			}
			else
			{
				if (!t.rows[y-1].cells[x].id)
					for (var i=0; i<piezas_inmoviles[id].length; i++)
						if (piezas_inmoviles[id][i].join('') == (y-1)+''+x)
							t.rows[y-1].cells[x].className = 'lighter';
			}
			
			//MOV PEON (ATAQUE)
			if ((x-1) >= 0)
				if ((t.rows[y-1].cells[x-1].id).charAt(0) == y1 && (t.rows[y-1].cells[x-1].id).charAt(1) == x1)
					t.rows[y-1].cells[x-1].className = 'lighter';
			if ((x+1) < 8)
				if ((t.rows[y-1].cells[x+1].id).charAt(0) == y1 && (t.rows[y-1].cells[x+1].id).charAt(1) == x1)
					t.rows[y-1].cells[x+1].className = 'lighter';
			
			//***********
			if (enviar_mov == false)
				segundo_click_otro_jugador();
			//***********
			
			return false;
		}
		
		if (id[3] == 4 || id[3] == 7)
		{
			//for (key in mov_ataque_blancas)
				//if (key == id[3])
					for (var i=0; i<mov_ataque_blancas[p].length; i++)
						if (mov_ataque_blancas[p][i].join('') == (y1+''+x1))
							t.rows[y1].cells[x1].className = 'lighter';
		
			//***********
			if (enviar_mov == false)
				segundo_click_otro_jugador();
			//***********
		}
		else
		{
		//for (key in mov_ataque_blancas)
			//if (key == id[3])
				for (var i=0; i<mov_ataque_blancas[p].length; i++)
					for (var j=0; j<piezas_inmoviles[id].length; j++)
						if (mov_ataque_blancas[p][i].join('') == piezas_inmoviles[id][j].join(''))
							t.rows[piezas_inmoviles[id][j][0]].cells[piezas_inmoviles[id][j][1]].className = 'lighter';
		
			//***********
			if (enviar_mov == false)
				segundo_click_otro_jugador();
			//***********
		}
	}
}

// JavaScript Document

function mover_pieza(el)
{
		
	if (jaque == true)
	{
		jaque = false;
		jaque_mov_rey = [];
		jaque_mov_piezas = {};
		jaque_pos = {};
	}
	piezas_inmoviles = {};
	
	if (pieza2)
		pieza2.style.backgroundImage = '';
	if (pieza3)
		pieza3.style.backgroundImage = '';
	pieza2 = pieza;
	pieza3 = el;
	
	var row_index = el.parentNode.rowIndex;
	var cell_index = el.cellIndex;
	var pieza_id = pieza.id; //pieza es la que se va a mover
	var peon_salida_doble = false;
	
	if (!pieza_id.charAt(4))
		var id_1 = row_index+''+cell_index+''+pieza_id.charAt(2)+''+pieza_id.charAt(3);
	else
		var id_1 = row_index+''+cell_index+''+pieza_id.charAt(2)+''+pieza_id.charAt(3)+''+pieza_id.charAt(4);
	
	//--------------------- mov. que cancelan enroque
	if (pieza_id[3] == 1)
	{
		if (pieza_id[2] == 1)
			if (enroque_blancas[0] == false)
				enroque_blancas[0] = true;
		
		if (pieza_id[2] == 0)
			if (enroque_negras[0] == false)
				enroque_negras[0] = true;
	}
	else if (pieza_id[3] == 5)
	{
		if (pieza_id[2] == 1)
			if (enroque_blancas[1] == false)
				enroque_blancas[1] = true;
		if (pieza_id[2] == 0)
			if (enroque_negras[1] == false)
				enroque_negras[1] = true;
	}
	else if (pieza_id[3] == 8)
	{
		if (pieza_id[2] == 1)
			if (enroque_blancas[2] == false)
				enroque_blancas[2] = true;
		if (pieza_id[2] == 0)
			if (enroque_negras[2] == false)
				enroque_negras[2] = true;
	}
	//---------------------
	
	//---------------------  marcar peon salida doble
	if ((isNaN(pieza_id[3]) && (pieza_id[2] == 1) && (pieza_id[0] == 6) && (row_index == 4) && (!pieza_id[4])) || (isNaN(pieza_id[3]) && (pieza_id[2] == 0) && (pieza_id[0] == 1) && (row_index == 3) && (!pieza_id[4])))
	{
		peon_salida_doble = true;
		peon_al_paso = el;
	}
	//---------------------
	
	ultimo_mov = [++num_mov, row_index, cell_index, pieza_id.charAt(2), peon_salida_doble];
	//alert(ultimo_mov);
	
	//--------------------- borrar piezas que se comen y si es torre cancelar enroque
	if (el.id) //significa que hay una pieza contraria donde se va a mover
	{
		var id0 = el.id;
		if (!id0[4]) //pieza sin coronar
		{
			var p = id0[3];
			if (id0[3] == 5) // si se come una torre hay que cancelar el enroque
			{
				if (id0[2] == 1)
					if (enroque_blancas[1] == false)
						enroque_blancas[1] = true;
				if (id0[2] == 0)
					if (enroque_negras[1] == false)
						enroque_negras[1] = true;
			}
			else if (id0[3] == 8)
			{
				if (id0[2] == 1)
					if (enroque_blancas[2] == false)
						enroque_blancas[2] = true;
				if (id0[2] == 0)
					if (enroque_negras[2] == false)
						enroque_negras[2] = true;
			}
		}
		else
			var p = id0[3]+''+id0[4];
		
		if (id0[2] == 0)
		{
			delete pos_piezas_negras[p];
			delete mov_ataque_negras[p];
		}
		else if (id0[2] == 1)
		{
			delete pos_piezas_blancas[p];
			delete mov_ataque_blancas[p];
		}
	}
	//---------------------
	
	//------------
	mov_yx[1] = row_index+''+cell_index;
	if (coronar_otro == true)
	{
		coronar_otro = false;
		pieza_coronar = el;
		id_coronar = id_1.slice();
		pieza.id = '';
		pieza.innerHTML = '';
		coronar(pieza_cor_otro,html_pieza_cor_otro);
		return false;
	}
	//------------
	
	//--------------------- coronacion
	if (isNaN((pieza.id).charAt(3)))
	{
		if (!(pieza.id).charAt(4))
		{
			if (turno == 1)
			{
				if (row_index == 0)
				{
					var t = document.getElementById('chess_table');
					limpiar_casilleros();
					t.rows[row_index].cells[cell_index].className = 'lighter';
					mate = true;
					turno = 3;
					pieza_coronar = el;
					id_coronar = id_1.slice();
					document.getElementById('coronacion_blancas').style.visibility = 'visible';
					pieza.id = '';
					pieza.innerHTML = '';
					return false;
				}
			}
			if (turno == 0)
			{
				if (row_index == 7)
				{
					var t = document.getElementById('chess_table');
					limpiar_casilleros();
					t.rows[row_index].cells[cell_index].className = 'lighter';
					mate = true;
					turno = 3;
					pieza_coronar = el;
					id_coronar = id_1.slice();
					document.getElementById('coronacion_negras').style.visibility = 'visible';
					pieza.id = '';
					pieza.innerHTML = '';
					return false;
				}
			}
		}
	}
	
	//------------ envio del movimiento despues de la coronacion que bloque el código, lo demás se ejecuta en paralelo
	send_move();
	
	//------------
	
	//---------------------
	
	el.id = id_1;  //agregarle al casillero de llegada la pieza y el id
	el.innerHTML = (pieza.innerHTML).slice();
	pieza3.style.backgroundImage = 'url(images/chess/chess7.png)';
	pieza.id = '';
	pieza.innerHTML = '';
	pieza2.style.backgroundImage = 'url(images/chess/chess6.png)';
	
	limpiar_casilleros();
	
	//---------- actualizar posicion piezas y movimientos de ataque
	if (!id_1[4])
		var p = id_1[3];
	else
		var p = id_1[3]+''+id_1[4];
	
	if (id_1[2] == 1)
		pos_piezas_blancas[p] = [parseInt(id_1[0]), parseInt(id_1[1])];
	else
		pos_piezas_negras[p] = [parseInt(id_1[0]), parseInt(id_1[1])];
	
	if (id_1[3] == 2 || id_1[3] == 3 || id_1[3] == 6 || id_1[3] == 5 || id_1[3] == 8)
		mov_ataque2(id_1);
	else
	{
		mov_ataque1(id_1);
		mov_ataque2(id_1);
	}
	
	if (jaque == false)
		verificar_tablas();
	
	if (mate == false)
	{
		if (turno == 0)
			turno = 1;
		else
			turno = 0;
	}
	else
		turno = 2;
	
}

// JavaScript Document

function coronar(pieza, html_pieza)
{
	//------------
	send_move(pieza,html_pieza);
	
	//------------
	
	var id_1 = id_coronar.slice();
	
	mate = false;
	turno = id_1[2];
	
	if (turno == 1)
		document.getElementById('coronacion_blancas').style.visibility = 'hidden';
	else
		document.getElementById('coronacion_negras').style.visibility = 'hidden';
	//habilitar_mov();
	
	
	
	var id_2 = id_1+pieza;
	pieza_coronar.id = id_2;
	pieza_coronar.innerHTML = html_pieza;
	
	//alert(id_2);
	
	limpiar_casilleros();
	
	//elimino el peon, lo cambio por la pieza coronada
	var p1 = id_2[3];
	var p = id_2[3]+''+id_2[4];
	if (id_2[2] == 1)
	{
		delete pos_piezas_blancas[p1];
		delete mov_ataque_blancas[p1];
		pos_piezas_blancas[p] = [parseInt(id_2[0]), parseInt(id_2[1])];
	}
	else
	{
		delete pos_piezas_negras[p1];
		delete mov_ataque_negras[p1];
		pos_piezas_negras[p] = [parseInt(id_2[0]), parseInt(id_2[1])];
	}
	
	
	
	if (id_2[4] == 2 || id_2[4] == 3 || id_2[4] == 5)
		mov_ataque2(id_2);
	else
	{
		mov_ataque1(id_2);
		mov_ataque2(id_2);
	}
	
	if (jaque == false)
		verificar_tablas();
	

	if (mate == false)
	{
		if (turno == 0)
			turno = 1;
		else
			turno = 0;
	}
	else
		turno = 2;
		
}

// JavaScript Document

// ----------------------------- peon al paso

function mover_pieza_pp(el)
{
	
	if (jaque == true)
	{
		jaque = false;
		jaque_mov_rey = [];
		jaque_mov_piezas = {};
		jaque_pos = {};
	}
	
	if (pieza2)
		pieza2.style.backgroundImage = '';
	if (pieza3)
		pieza3.style.backgroundImage = '';
	pieza2 = pieza;
	pieza3 = el;
	
	var row_index = el.parentNode.rowIndex;
	var cell_index = el.cellIndex;
	var pieza_id = pieza.id;
	var peon_salida_doble = false;
	
	if (!pieza_id[4])
		var id_1 = row_index+''+cell_index+''+pieza_id.charAt(2)+''+pieza_id.charAt(3);
	else
		var id_1 = row_index+''+cell_index+''+pieza_id.charAt(2)+''+pieza_id.charAt(3)+''+pieza_id.charAt(4);
	
	
	//------------
	mov_yx[1] = id_1.charAt(0)+''+id_1.charAt(1);
	
	send_move();
	
	//------------
	
	ultimo_mov = [++num_mov, row_index, cell_index, pieza_id.charAt(2), peon_salida_doble];
	
	var id0 = peon_al_paso.id;  //hay que borrar una pieza que no está en el lugar donde se va a mover
	
	if (!id0[4])
		var p = id0[3];
	else
		var p = id0[3]+''+id0[4];
	
	if (id0[2] == 0)
	{
		delete pos_piezas_negras[p];
		delete mov_ataque_negras[p];
	}
	else if (id0[2] == 1)
	{
		delete pos_piezas_blancas[p];
		delete mov_ataque_blancas[p];
	}
	
	el.id = id_1;
	el.innerHTML = (pieza.innerHTML).slice();
	pieza3.style.backgroundImage = 'url(images/chess/chess7.png)';
	pieza.id = '';
	pieza.innerHTML = '';
	pieza2.style.backgroundImage = 'url(images/chess/chess6.png)';
	peon_al_paso.id = '';
	peon_al_paso.innerHTML = '';
	
	//alert(peon_al_paso.id);
	
	limpiar_casilleros();
	
	if(!id_1[4])
		var p = id_1[3];
	else
		var p = id_1[3]+''+id_1[4];
	
	if (id_1[2] == 1)
		pos_piezas_blancas[p] = [parseInt(id_1[0]), parseInt(id_1[1])];
	else
		pos_piezas_negras[p] = [parseInt(id_1[0]), parseInt(id_1[1])];
	
	
	if (id_1[3] == 2 || id_1[3] == 3 || id_1[3] == 6 || id_1[3] == 5 || id_1[3] == 8)
		mov_ataque2(id_1);
	else
	{
		mov_ataque1(id_1);
		mov_ataque2(id_1);
	}
	
	if (jaque == false)
		verificar_tablas();
		
	if (mate == false)
	{
		if (turno == 0)
			turno = 1;
		else
			turno = 0;
	}
	else
		turno = 2;

}

// JavaScript Document

// ----------------------------- enroque

function mover_pieza_e(el)
{
	
	var t = document.getElementById('chess_table');
	
	var row_index = el.parentNode.rowIndex;
	var cell_index = el.cellIndex;
	var pieza_id = pieza.id;
	var peon_salida_doble = false;
	
	if (pieza2)
		pieza2.style.backgroundImage = '';
	if (pieza3)
		pieza3.style.backgroundImage = '';
	pieza2 = pieza;
	pieza3 = el;
	
	if (pieza_id[2] == 0)
		enroque_negras[0] = true;
	else if (pieza_id[2] == 1)
		enroque_blancas[0] = true;
	
	if (!pieza_id[4])
		var id_1 = row_index+''+''+cell_index+''+pieza_id.charAt(2)+''+pieza_id.charAt(3);
	else
		var id_1 = row_index+''+cell_index+''+pieza_id.charAt(2)+''+pieza_id.charAt(3)+''+pieza_id.charAt(4);
	
	
	//------------ 
	mov_yx[1] = id_1.charAt(0)+''+id_1.charAt(1);
	
	send_move();
	
	//------------
	
	ultimo_mov = [++num_mov, row_index, cell_index, pieza_id.charAt(2), peon_salida_doble];
	
	el.id = id_1;
	el.innerHTML = (pieza.innerHTML).slice();
	pieza3.style.backgroundImage = 'url(images/chess/chess7.png)';
	pieza.id = '';
	pieza.innerHTML = '';
	pieza2.style.backgroundImage = 'url(images/chess/chess6.png)';
	
	var y = id_1[0];
	var x = id_1[1];
	var color = id_1[2];
	
	if (x == 2)
	{
		var torre = t.rows[y].cells[0];
		t.rows[y].cells[3].innerHTML = torre.innerHTML;
		t.rows[y].cells[3].id = y+''+3+''+color+''+5;
		torre.innerHTML = '';
		torre.id = '';
		if (y == 0)
		{
			pos_piezas_negras[1] = [parseInt(id_1[0]), parseInt(id_1[1])];
			pos_piezas_negras[5] = [0, 3];
		}
		else
		{
			pos_piezas_blancas[1] = [parseInt(id_1[0]), parseInt(id_1[1])];
			pos_piezas_blancas[5] = [7, 3];
		}
	}
	else if (x == 6)
	{
		var torre = t.rows[y].cells[7];
		t.rows[y].cells[5].innerHTML = torre.innerHTML;
		t.rows[y].cells[5].id = y+''+5+''+color+''+8;
		torre.innerHTML = '';
		torre.id = '';
		if (y == 0)
		{
			pos_piezas_negras[1] = [parseInt(id_1[0]), parseInt(id_1[1])];
			pos_piezas_negras[8] = [0, 5];
		}
		else
		{
			pos_piezas_blancas[1] = [parseInt(id_1[0]), parseInt(id_1[1])];
			pos_piezas_blancas[8] = [7, 5];
		}
	}
	else if (x == 1)  //para el tablero invertido
	{
		var torre = t.rows[y].cells[0];
		t.rows[y].cells[2].innerHTML = torre.innerHTML;
		t.rows[y].cells[2].id = y+''+2+''+color+''+5;
		torre.innerHTML = '';
		torre.id = '';
		if (y == 0)
		{
			pos_piezas_negras[1] = [parseInt(id_1[0]), parseInt(id_1[1])];
			pos_piezas_negras[5] = [0, 2];
		}
		else
		{
			pos_piezas_blancas[1] = [parseInt(id_1[0]), parseInt(id_1[1])];
			pos_piezas_blancas[5] = [7, 2];
		}
	}
	else if (x == 5)  //para el tablero invertido
	{
		var torre = t.rows[y].cells[7];
		t.rows[y].cells[4].innerHTML = torre.innerHTML;
		t.rows[y].cells[4].id = y+''+4+''+color+''+8;
		torre.innerHTML = '';
		torre.id = '';
		if (y == 0)
		{
			pos_piezas_negras[1] = [parseInt(id_1[0]), parseInt(id_1[1])];
			pos_piezas_negras[8] = [0, 4];
		}
		else
		{
			pos_piezas_blancas[1] = [parseInt(id_1[0]), parseInt(id_1[1])];
			pos_piezas_blancas[8] = [7, 4];
		}
	}
		
	limpiar_casilleros();
	
	if (id_1[3] == 2 || id_1[3] == 3 || id_1[3] == 6 || id_1[3] == 5 || id_1[3] == 8)
		mov_ataque2(id_1);
	else
	{
		mov_ataque1(id_1);
		mov_ataque2(id_1);
	}
	
	
	if (mate == false)
	{
		if (turno == 0)
			turno = 1;
		else
			turno = 0;
	}
	else
		turno = 2;
}

// JavaScript Document

// ----------------------------- actualizar_mov_ataque

function mov_ataque1(id)
{
	var t = document.getElementById('chess_table');
	var mov = [];
	var y = parseInt(id[0]);
	var x = parseInt(id[1]);
	var mov1 = [];
	mov1.push([y,x]);
	
	//alert(id.charAt(4));
	
	if (id[2] == 1)
	{
		if (id[4])  //piezas coronadas
		{
			if (id[4] == 4) //movimientos coronacion caballo
			{
				var p = id[3]+''+4;
				mov_ataque_blancas[p] = [];
				if ((y-2) > -1 && (x-1) > -1)
				{
					mov.push([y-2, x-1]);
					if (t.rows[y-2].cells[x-1].id)
					{
						if ((t.rows[y-2].cells[x-1].id).charAt(3) == 1 && (t.rows[y-2].cells[x-1].id).charAt(2) == 0)
						{
							var id_mov = y+''+x+''+1+''+p;
							jaque = true;
							jaque_pos[id_mov] = mov1;
							t.rows[y-2].cells[x-1].className = 'jaque';
						}
					}
				}
				if ((y-2) > -1 && (x+1) < 8)
				{
					mov.push([y-2, x+1]);
					if (t.rows[y-2].cells[x+1].id)
					{
						if ((t.rows[y-2].cells[x+1].id).charAt(3) == 1 && (t.rows[y-2].cells[x+1].id).charAt(2) == 0)
						{
							var id_mov = y+''+x+''+1+''+p;
							jaque = true;
							jaque_pos[id_mov] = mov1;
							t.rows[y-2].cells[x+1].className = 'jaque';
						}
					}
				}
				if ((y-1) > -1 && (x-2) > -1)
				{
					mov.push([y-1, x-2]);
					if (t.rows[y-1].cells[x-2].id)
					{
						if ((t.rows[y-1].cells[x-2].id).charAt(3) == 1 && (t.rows[y-1].cells[x-2].id).charAt(2) == 0)
						{
							var id_mov = y+''+x+''+1+''+p;
							jaque = true;
							jaque_pos[id_mov] = mov1;
							t.rows[y-1].cells[x-2].className = 'jaque';
						}
					}
				}
				if ((y-1) > -1 && (x+2) < 8)
				{
					mov.push([y-1, x+2]);
					if (t.rows[y-1].cells[x+2].id)
					{
						if ((t.rows[y-1].cells[x+2].id).charAt(3) == 1 && (t.rows[y-1].cells[x+2].id).charAt(2) == 0)
						{
							var id_mov = y+''+x+''+1+''+p;
							jaque = true;
							jaque_pos[id_mov] = mov1;
							t.rows[y-1].cells[x+2].className = 'jaque';
						}
					}
				}
				if ((y+1) < 8 && (x-2) > -1)
				{
					mov.push([y+1, x-2]);
					if (t.rows[y+1].cells[x-2].id)
					{
						if ((t.rows[y+1].cells[x-2].id).charAt(3) == 1 && (t.rows[y+1].cells[x-2].id).charAt(2) == 0)
						{
							var id_mov = y+''+x+''+1+''+p;
							jaque = true;
							jaque_pos[id_mov] = mov1;
							t.rows[y+1].cells[x-2].className = 'jaque';
						}
					}
				}
				if ((y+1) < 8 && (x+2) < 8)
				{
					mov.push([y+1, x+2]);
					if (t.rows[y+1].cells[x+2].id)
					{
						if ((t.rows[y+1].cells[x+2].id).charAt(3) == 1 && (t.rows[y+1].cells[x+2].id).charAt(2) == 0)
						{
							var id_mov = y+''+x+''+1+''+p;
							jaque = true;
							jaque_pos[id_mov] = mov1;
							t.rows[y+1].cells[x+2].className = 'jaque';
						}
					}
				}
				if ((y+2) < 8 && (x-1) > -1)
				{
					mov.push([y+2, x-1]);
					if (t.rows[y+2].cells[x-1].id)
					{
						if ((t.rows[y+2].cells[x-1].id).charAt(3) == 1 && (t.rows[y+2].cells[x-1].id).charAt(2) == 0)
						{
							var id_mov = y+''+x+''+1+''+p;
							jaque = true;
							jaque_pos[id_mov] = mov1;
							t.rows[y+2].cells[x-1].className = 'jaque';
						}
					}
				}
				if ((y+2) < 8 && (x+1) < 8)
				{
					mov.push([y+2, x+1]);
					if (t.rows[y+2].cells[x+1].id)
					{
						if ((t.rows[y+2].cells[x+1].id).charAt(3) == 1 && (t.rows[y+2].cells[x+1].id).charAt(2) == 0)
						{
							var id_mov = y+''+x+''+1+''+p;
							jaque = true;
							jaque_pos[id_mov] = mov1;
							t.rows[y+2].cells[x+1].className = 'jaque';
						}
					}
				}
				
				mov_ataque_blancas[p] = mov.slice();
			}
		}
		
		else if (isNaN(id[3])) //movimientos peón
		{
			var p = id[3];
			mov_ataque_blancas[p] = [];
			if ((x-1) >= 0)
			{
				mov.push([y-1, x-1]);
				if (t.rows[y-1].cells[x-1].id)
				{
					if ((t.rows[y-1].cells[x-1].id).charAt(3) == 1 && (t.rows[y-1].cells[x-1].id).charAt(2) == 0)
					{
						var id_mov = y+''+x+''+1+p;
						jaque = true;
						jaque_pos[id_mov] = mov1;
						t.rows[y-1].cells[x-1].className = 'jaque';
					}
				}
			}
						
			if ((x+1) < 8)
			{
				mov.push([y-1, x+1]);
				if (t.rows[y-1].cells[x+1].id)
				{
					if ((t.rows[y-1].cells[x+1].id).charAt(3) == 1 && (t.rows[y-1].cells[x+1].id).charAt(2) == 0)
					{
						var id_mov = y+''+x+''+1+p;
						jaque = true;
						jaque_pos[id_mov] = mov1;
						t.rows[y-1].cells[x+1].className = 'jaque';
					}
				}
			}
			
			mov_ataque_blancas[p] = mov.slice();
		}
		
		else if (id[3] == 1)  // ----------------------------mov rey
		{
			mov_ataque_blancas['1'] = [];
			if ((y-1) > -1 && (x-1) > -1)
				mov.push([y-1, x-1]);
			if ((y-1) > -1)
				mov.push([y-1, x]);
			if ((y-1) > -1 && (x+1) < 8)
				mov.push([y-1, x+1]);
			if ((x-1) > -1)
				mov.push([y, x-1]);
			if ((y+1) < 8 && (x-1) > -1)
				mov.push([y+1, x-1]);
			if ((y+1) < 8)
				mov.push([y+1, x]);
			if ((y+1) < 8 && (x+1) < 8)
				mov.push([y+1, x+1]);
			if ((x+1) < 8)
				mov.push([y, x+1]);
			
			mov_ataque_blancas[1] = mov.slice();
		}
		
		
		else if (id[3] == 4 || id[3] == 7) // // ----------------------------mov caballo
		{
			var p = id[3];
			mov_ataque_blancas[p] = [];
			if ((y-2) > -1 && (x-1) > -1)
			{ 
				mov.push([y-2, x-1]);
				if (t.rows[y-2].cells[x-1].id)
				{
					if ((t.rows[y-2].cells[x-1].id).charAt(3) == 1 && (t.rows[y-2].cells[x-1].id).charAt(2) == 0)
					{
						var id_mov = y+''+x+''+1+''+p;
						jaque = true;
						jaque_pos[id_mov] = mov1;
						t.rows[y-2].cells[x-1].className = 'jaque';
					}
				}
			}
			if ((y-2) > -1 && (x+1) < 8)
			{
				mov.push([y-2, x+1]);
				if (t.rows[y-2].cells[x+1].id)
				{
					if ((t.rows[y-2].cells[x+1].id).charAt(3) == 1 && (t.rows[y-2].cells[x+1].id).charAt(2) == 0)
					{
						var id_mov = y+''+x+''+1+''+p;
						jaque = true;
						jaque_pos[id_mov] = mov1;
						t.rows[y-2].cells[x+1].className = 'jaque';
					}
				}
			}
			if ((y-1) > -1 && (x-2) > -1)
			{
				mov.push([y-1, x-2]);
				if (t.rows[y-1].cells[x-2].id)
				{
					if ((t.rows[y-1].cells[x-2].id).charAt(3) == 1 && (t.rows[y-1].cells[x-2].id).charAt(2) == 0)
					{
						var id_mov = y+''+x+''+1+''+p;
						jaque = true;
						jaque_pos[id_mov] = mov1;
						t.rows[y-1].cells[x-2].className = 'jaque';
					}
				}
			}
			if ((y-1) > -1 && (x+2) < 8)
			{
				mov.push([y-1, x+2]);
				if (t.rows[y-1].cells[x+2].id)
				{
					if ((t.rows[y-1].cells[x+2].id).charAt(3) == 1 && (t.rows[y-1].cells[x+2].id).charAt(2) == 0)
					{
						var id_mov = y+''+x+''+1+''+p;
						jaque = true;
						jaque_pos[id_mov] = mov1;
						t.rows[y-1].cells[x+2].className = 'jaque';
					}
				}
			}
			if ((y+1) < 8 && (x-2) > -1)
			{
				mov.push([y+1, x-2]);
				if (t.rows[y+1].cells[x-2].id)
				{
					if ((t.rows[y+1].cells[x-2].id).charAt(3) == 1 && (t.rows[y+1].cells[x-2].id).charAt(2) == 0)
					{
						var id_mov = y+''+x+''+1+''+p;
						jaque = true;
						jaque_pos[id_mov] = mov1;
						t.rows[y+1].cells[x-2].className = 'jaque';
					}
				}
			}
			if ((y+1) < 8 && (x+2) < 8)
			{
				mov.push([y+1, x+2]);
				if (t.rows[y+1].cells[x+2].id)
				{
					if ((t.rows[y+1].cells[x+2].id).charAt(3) == 1 && (t.rows[y+1].cells[x+2].id).charAt(2) == 0)
					{
						var id_mov = y+''+x+''+1+''+p;
						jaque = true;
						jaque_pos[id_mov] = mov1;
						t.rows[y+1].cells[x+2].className = 'jaque';
					}
				}
			}
			if ((y+2) < 8 && (x-1) > -1)
			{
				mov.push([y+2, x-1]);
				if (t.rows[y+2].cells[x-1].id)
				{
					if ((t.rows[y+2].cells[x-1].id).charAt(3) == 1 && (t.rows[y+2].cells[x-1].id).charAt(2) == 0)
					{
						var id_mov = y+''+x+''+1+''+p;
						jaque = true;
						jaque_pos[id_mov] = mov1;
						t.rows[y+2].cells[x-1].className = 'jaque';
					}
				}
			}
			if ((y+2) < 8 && (x+1) < 8)
			{
				mov.push([y+2, x+1]);
				if (t.rows[y+2].cells[x+1].id)
				{
					if ((t.rows[y+2].cells[x+1].id).charAt(3) == 1 && (t.rows[y+2].cells[x+1].id).charAt(2) == 0)
					{
						var id_mov = y+''+x+''+1+''+p;
						jaque = true;
						jaque_pos[id_mov] = mov1;
						t.rows[y+2].cells[x+1].className = 'jaque';
					}
				}
			}
			
			mov_ataque_blancas[p] = mov.slice();
		}
	}
	
	// mov ATAQUE1 NEGRAS
	
	else if (id[2] == 0)
	{
		if (id[4])
		{
			if (id[4] == 4) //movimientos coronacion caballo
			{
				var p = id[3]+''+4;
				mov_ataque_negras[p] = [];
				if ((y-2) > -1 && (x-1) > -1)
				{
					mov.push([y-2, x-1]);
					if (t.rows[y-2].cells[x-1].id)
					{
						if ((t.rows[y-2].cells[x-1].id).charAt(3) == 1 && (t.rows[y-2].cells[x-1].id).charAt(2) == 1)
						{
							var id_mov = y+''+x+''+1+''+p;
							jaque = true;
							jaque_pos[id_mov] = mov1;
							t.rows[y-2].cells[x-1].className = 'jaque';
						}
					}
				}
				if ((y-2) > -1 && (x+1) < 8)
				{
					mov.push([y-2, x+1]);
					if (t.rows[y-2].cells[x+1].id)
					{
						if ((t.rows[y-2].cells[x+1].id).charAt(3) == 1 && (t.rows[y-2].cells[x+1].id).charAt(2) == 1)
						{
							var id_mov = y+''+x+''+1+''+p;
							jaque = true;
							jaque_pos[id_mov] = mov1;
							t.rows[y-2].cells[x+1].className = 'jaque';
						}
					}
				}
				if ((y-1) > -1 && (x-2) > -1)
				{
					mov.push([y-1, x-2]);
					if (t.rows[y-1].cells[x-2].id)
					{
						if ((t.rows[y-1].cells[x-2].id).charAt(3) == 1 && (t.rows[y-1].cells[x-2].id).charAt(2) == 1)
						{
							var id_mov = y+''+x+''+1+''+p;
							jaque = true;
							jaque_pos[id_mov] = mov1;
							t.rows[y-1].cells[x-2].className = 'jaque';
						}
					}
				}
				if ((y-1) > -1 && (x+2) < 8)
				{
					mov.push([y-1, x+2]);
					if (t.rows[y-1].cells[x+2].id)
					{
						if ((t.rows[y-1].cells[x+2].id).charAt(3) == 1 && (t.rows[y-1].cells[x+2].id).charAt(2) == 1)
						{
							var id_mov = y+''+x+''+1+''+p;
							jaque = true;
							jaque_pos[id_mov] = mov1;
							t.rows[y-1].cells[x+2].className = 'jaque';
						}
					}
				}
				if ((y+1) < 8 && (x-2) > -1)
				{
					mov.push([y+1, x-2]);
					if (t.rows[y+1].cells[x-2].id)
					{
						if ((t.rows[y+1].cells[x-2].id).charAt(3) == 1 && (t.rows[y+1].cells[x-2].id).charAt(2) == 1)
						{
							var id_mov = y+''+x+''+1+''+p;
							jaque = true;
							jaque_pos[id_mov] = mov1;
							t.rows[y+1].cells[x-2].className = 'jaque';
						}
					}
				}
				if ((y+1) < 8 && (x+2) < 8)
				{
					mov.push([y+1, x+2]);
					if (t.rows[y+1].cells[x+2].id)
					{
						if ((t.rows[y+1].cells[x+2].id).charAt(3) == 1 && (t.rows[y+1].cells[x+2].id).charAt(2) == 1)
						{
							var id_mov = y+''+x+''+1+''+p;
							jaque = true;
							jaque_pos[id_mov] = mov1;
							t.rows[y+1].cells[x+2].className = 'jaque';
						}
					}
				}
				if ((y+2) < 8 && (x-1) > -1)
				{
					mov.push([y+2, x-1]);
					if (t.rows[y+2].cells[x-1].id)
					{
						if ((t.rows[y+2].cells[x-1].id).charAt(3) == 1 && (t.rows[y+2].cells[x-1].id).charAt(2) == 1)
						{
							var id_mov = y+''+x+''+1+''+p;
							jaque = true;
							jaque_pos[id_mov] = mov1;
							t.rows[y+2].cells[x-1].className = 'jaque';
						}
					}
				}
				if ((y+2) < 8 && (x+1) < 8)
				{
					mov.push([y+2, x+1]);
					if (t.rows[y+2].cells[x+1].id)
					{
						if ((t.rows[y+2].cells[x+1].id).charAt(3) == 1 && (t.rows[y+2].cells[x+1].id).charAt(2) == 1)
						{
							var id_mov = y+''+x+''+1+''+p;
							jaque = true;
							jaque_pos[id_mov] = mov1;
							t.rows[y+2].cells[x+1].className = 'jaque';
						}
					}
				}
				
				mov_ataque_negras[p] = mov.slice();
			}
		}
		
		else if (isNaN(id[3])) //movimientos peón
		{
			var p = id[3];
			mov_ataque_negras[p] = [];
			if ((x-1) >= 0)
			{
				mov.push([y+1, x-1]);
				if (t.rows[y+1].cells[x-1].id)
				{
					if ((t.rows[y+1].cells[x-1].id).charAt(3) == 1 && (t.rows[y+1].cells[x-1].id).charAt(2) == 1)
					{
						var id_mov = y+''+x+''+1+p;
						jaque = true;
						jaque_pos[id_mov] = mov1;
						t.rows[y+1].cells[x-1].className = 'jaque';
					}
				}
			}
						
			if ((x+1) < 8)
			{
				mov.push([y+1, x+1]);
				if (t.rows[y+1].cells[x+1].id)
				{
					if ((t.rows[y+1].cells[x+1].id).charAt(3) == 1 && (t.rows[y+1].cells[x+1].id).charAt(2) == 1)
					{
						var id_mov = y+''+x+''+1+p;
						jaque = true;
						jaque_pos[id_mov] = mov1;
						t.rows[y+1].cells[x+1].className = 'jaque';
					}
				}
			}
			
			mov_ataque_negras[p] = mov.slice();
		}
		
		else if (id[3] == 1)  // ----------------------------mov rey
		{
			mov_ataque_negras['1'] = [];
			if ((y-1) > -1 && (x-1) > -1)
				mov.push([y-1, x-1]);
			if ((y-1) > -1)
				mov.push([y-1, x]);
			if ((y-1) > -1 && (x+1) < 8)
				mov.push([y-1, x+1]);
			if ((x-1) > -1)
				mov.push([y, x-1]);
			if ((y+1) < 8 && (x-1) > -1)
				mov.push([y+1, x-1]);
			if ((y+1) < 8)
				mov.push([y+1, x]);
			if ((y+1) < 8 && (x+1) < 8)
				mov.push([y+1, x+1]);
			if ((x+1) < 8)
				mov.push([y, x+1]);
			
			mov_ataque_negras[1] = mov.slice();
		}
		
		else if (id[3] == 4 || id[3] == 7) // // ----------------------------mov caballo
		{
			var p = id[3];
			mov_ataque_negras[p] = [];
			if ((y-2) > -1 && (x-1) > -1)
			{
				mov.push([y-2, x-1]);
				if (t.rows[y-2].cells[x-1].id)
				{
					if ((t.rows[y-2].cells[x-1].id).charAt(3) == 1 && (t.rows[y-2].cells[x-1].id).charAt(2) == 1)
					{
						var id_mov = y+''+x+''+1+''+p;
						jaque = true;
						jaque_pos[id_mov] = mov1;
						t.rows[y-2].cells[x-1].className = 'jaque';
					}
				}
			}
			if ((y-2) > -1 && (x+1) < 8)
			{
				mov.push([y-2, x+1]);
				if (t.rows[y-2].cells[x+1].id)
				{
					if ((t.rows[y-2].cells[x+1].id).charAt(3) == 1 && (t.rows[y-2].cells[x+1].id).charAt(2) == 1)
					{
						var id_mov = y+''+x+''+1+''+p;
						jaque = true;
						jaque_pos[id_mov] = mov1;
						t.rows[y-2].cells[x+1].className = 'jaque';
					}
				}
			}
			if ((y-1) > -1 && (x-2) > -1)
			{
				mov.push([y-1, x-2]);
				if (t.rows[y-1].cells[x-2].id)
				{
					if ((t.rows[y-1].cells[x-2].id).charAt(3) == 1 && (t.rows[y-1].cells[x-2].id).charAt(2) == 1)
					{
						var id_mov = y+''+x+''+1+''+p;
						jaque = true;
						jaque_pos[id_mov] = mov1;
						t.rows[y-1].cells[x-2].className = 'jaque';
					}
				}
			}
			if ((y-1) > -1 && (x+2) < 8)
			{
				mov.push([y-1, x+2]);
				if (t.rows[y-1].cells[x+2].id)
				{
					if ((t.rows[y-1].cells[x+2].id).charAt(3) == 1 && (t.rows[y-1].cells[x+2].id).charAt(2) == 1)
					{
						var id_mov = y+''+x+''+1+''+p;
						jaque = true;
						jaque_pos[id_mov] = mov1;
						t.rows[y-1].cells[x+2].className = 'jaque';
					}
				}
			}
			if ((y+1) < 8 && (x-2) > -1)
			{
				mov.push([y+1, x-2]);
				if (t.rows[y+1].cells[x-2].id)
				{
					if ((t.rows[y+1].cells[x-2].id).charAt(3) == 1 && (t.rows[y+1].cells[x-2].id).charAt(2) == 1)
					{
						var id_mov = y+''+x+''+1+''+p;
						jaque = true;
						jaque_pos[id_mov] = mov1;
						t.rows[y+1].cells[x-2].className = 'jaque';
					}
				}
			}
			if ((y+1) < 8 && (x+2) < 8)
			{
				mov.push([y+1, x+2]);
				if (t.rows[y+1].cells[x+2].id)
				{
					if ((t.rows[y+1].cells[x+2].id).charAt(3) == 1 && (t.rows[y+1].cells[x+2].id).charAt(2) == 1)
					{
						var id_mov = y+''+x+''+1+''+p;
						jaque = true;
						jaque_pos[id_mov] = mov1;
						t.rows[y+1].cells[x+2].className = 'jaque';
					}
				}
			}
			if ((y+2) < 8 && (x-1) > -1)
			{
				mov.push([y+2, x-1]);
				if (t.rows[y+2].cells[x-1].id)
				{
					if ((t.rows[y+2].cells[x-1].id).charAt(3) == 1 && (t.rows[y+2].cells[x-1].id).charAt(2) == 1)
					{
						var id_mov = y+''+x+''+1+''+p;
						jaque = true;
						jaque_pos[id_mov] = mov1;
						t.rows[y+2].cells[x-1].className = 'jaque';
					}
				}
			}
			if ((y+2) < 8 && (x+1) < 8)
			{
				mov.push([y+2, x+1]);
				if (t.rows[y+2].cells[x+1].id)
				{
					if ((t.rows[y+2].cells[x+1].id).charAt(3) == 1 && (t.rows[y+2].cells[x+1].id).charAt(2) == 1)
					{
						var id_mov = y+''+x+''+1+''+p;
						jaque = true;
						jaque_pos[id_mov] = mov1;
						t.rows[y+2].cells[x+1].className = 'jaque';
					}
				}
			}
			
			mov_ataque_negras[p] = mov.slice();
		}
	}
}

// JavaScript Document

// ----------------------------- verificar_jaque solo para alfil, dama y torres

function mov_ataque2(id)
{
	var t = document.getElementById('chess_table');
	
	var pieza = 0;
	
	for (key in pos_piezas_blancas)
	{
		if (key.length == 2)
			pieza = key[1];
		else
			pieza = key;
			
		if (key == 2 || pieza == 2 ) // ----------------------------mov_dama
		{
			mov_ataque_blancas[key] = [];
			var mov = [];
			var y1 = parseInt(pos_piezas_blancas[key][0]);
			var x1 = parseInt(pos_piezas_blancas[key][1]);
			var y = parseInt(pos_piezas_blancas[key][0]);
			var x = parseInt(pos_piezas_blancas[key][1]);
			var mov1 = [];
			mov1.push([y,x]);
			while (y>0)
			{
				if (!t.rows[y-1].cells[x].id)
				{
					mov.push([y-1, x]);
					mov1.push([y-1, x]);
				}
				else if ((t.rows[y-1].cells[x].id).charAt(3) == 1 && (t.rows[y-1].cells[x].id).charAt(2) == 0)
				{
					mov.push([y-1, x]);
					var id_mov = y1+''+x1+''+1+''+key;
					jaque = true;
					jaque_pos[id_mov] = mov1.slice();  //'key' = id de la pieza que hace jaque;
													   //'valor = todas las pos desde donde está la pieza contraria (incluida) hasta el rey (excluido)
				}
				else
				{
					mov.push([y-1, x]);
					mov1.push([y-1, x]);
					if ((t.rows[y-1].cells[x].id).charAt(2) == 0)
					{
						var id_fijo = (t.rows[y-1].cells[x]).id;
						--y;
						while (y>0)
						{
							if (t.rows[y-1].cells[x].id)
							{
								if ((t.rows[y-1].cells[x].id).charAt(3) == 1 && (t.rows[y-1].cells[x].id).charAt(2) == 0)
								{
									piezas_inmoviles[id_fijo] = mov1.slice();  //'key' = id de la pieza que bloquea el jaque
																			//'valor' = todas las posiciones que siguen bloqueando el jaque hasta pieza contraria incluida
									break;
								}
								else
									break;
							}
							mov1.push([y-1, x]);
							--y;
						}
					}
					break;
				}
				--y;
			}
			var y = parseInt(pos_piezas_blancas[key][0]);
			var x = parseInt(pos_piezas_blancas[key][1]);
			var mov1 = [];
			mov1.push([y,x]);
			while (y<7)
			{
				if (!t.rows[y+1].cells[x].id)
				{
					mov.push([y+1, x]);
					mov1.push([y+1, x]);
				}
				else if ((t.rows[y+1].cells[x].id).charAt(3) == 1 && (t.rows[y+1].cells[x].id).charAt(2) == 0)
				{
					mov.push([y+1, x]);
					var id_mov = y1+''+x1+''+1+''+key;
					jaque = true;
					jaque_pos[id_mov] = mov1.slice();
				}
				else
				{
					mov.push([y+1, x]);
					mov1.push([y+1, x]);
					if ((t.rows[y+1].cells[x].id).charAt(2) == 0)
					{
						var id_fijo = (t.rows[y+1].cells[x]).id;
						++y;
						while (y<7)
						{
							if (t.rows[y+1].cells[x].id)
							{
								if ((t.rows[y+1].cells[x].id).charAt(3) == 1 && (t.rows[y+1].cells[x].id).charAt(2) == 0)
								{
									piezas_inmoviles[id_fijo] = mov1.slice();
									break;
								}
								else
									break;
							}
							mov1.push([y+1, x]);
							++y;
						}
					}
					break;
				}
				++y;
			}
			var y = parseInt(pos_piezas_blancas[key][0]);
			var x = parseInt(pos_piezas_blancas[key][1]);
			var mov1 = [];
			mov1.push([y,x]);
			while (x>0)
			{
				if (!t.rows[y].cells[x-1].id)
				{
					mov.push([y, x-1]);
					mov1.push([y, x-1]);
				}
				else if ((t.rows[y].cells[x-1].id).charAt(3) == 1 && (t.rows[y].cells[x-1].id).charAt(2) == 0)
				{
					mov.push([y, x-1]);
					var id_mov = y1+''+x1+''+1+''+key;
					jaque = true;
					jaque_pos[id_mov] = mov1.slice();
				}
				else
				{
					mov.push([y, x-1]);
					mov1.push([y, x-1]);
					if ((t.rows[y].cells[x-1].id).charAt(2) == 0)
					{
						var id_fijo = (t.rows[y].cells[x-1]).id;
						--x;
						while (x>0)
						{
							if (t.rows[y].cells[x-1].id)
							{
								if ((t.rows[y].cells[x-1].id).charAt(3) == 1 && (t.rows[y].cells[x-1].id).charAt(2) == 0)
								{
									piezas_inmoviles[id_fijo] = mov1.slice();
									break;
								}
								else
									break;
							}
							mov1.push([y, x-1]);
							--x;
						}
					}
					break;
				}
				--x;
			}
			var y = parseInt(pos_piezas_blancas[key][0]);
			var x = parseInt(pos_piezas_blancas[key][1]);
			var mov1 = [];
			mov1.push([y,x]);
			while (x<7)
			{
				if (!t.rows[y].cells[x+1].id)
				{
					mov.push([y, x+1]);
					mov1.push([y, x+1]);
				}
				else if ((t.rows[y].cells[x+1].id).charAt(3) == 1 && (t.rows[y].cells[x+1].id).charAt(2) == 0)
				{
					mov.push([y, x+1]);
					var id_mov = y1+''+x1+''+1+''+key;
					jaque = true;
					jaque_pos[id_mov] = mov1.slice();
				}
				else
				{
					mov.push([y, x+1]);
					mov1.push([y, x+1]);
					if ((t.rows[y].cells[x+1].id).charAt(2) == 0)
					{
						var id_fijo = (t.rows[y].cells[x+1]).id;
						++x;
						while (x<7)
						{
							if (t.rows[y].cells[x+1].id)
							{
								if ((t.rows[y].cells[x+1].id).charAt(3) == 1 && (t.rows[y].cells[x+1].id).charAt(2) == 0)
								{
									piezas_inmoviles[id_fijo] = mov1.slice();
									break;
								}
								else
									break;
							}
							mov1.push([y, x+1]);
							++x;
						}
					}
					break;
				}
				++x;
			}
			var y = parseInt(pos_piezas_blancas[key][0]);
			var x = parseInt(pos_piezas_blancas[key][1]);
			var mov1 = [];
			mov1.push([y,x]);
			while (y>0 && x>0)
			{
				if (!t.rows[y-1].cells[x-1].id)
				{
					mov.push([y-1, x-1]);
					mov1.push([y-1, x-1]);
				}
				else if ((t.rows[y-1].cells[x-1].id).charAt(3) == 1 && (t.rows[y-1].cells[x-1].id).charAt(2) == 0)
				{
					mov.push([y-1, x-1]);
					var id_mov = y1+''+x1+''+1+''+key;
					jaque = true;
					jaque_pos[id_mov] = mov1.slice();
				}
				else
				{
					mov.push([y-1, x-1]);
					mov1.push([y-1, x-1]);
					if ((t.rows[y-1].cells[x-1].id).charAt(2) == 0)
					{
						var id_fijo = (t.rows[y-1].cells[x-1]).id;
						--y;
						--x;
						while (y>0 && x>0)
						{
							if (t.rows[y-1].cells[x-1].id)
							{
								if ((t.rows[y-1].cells[x-1].id).charAt(3) == 1 && (t.rows[y-1].cells[x-1].id).charAt(2) == 0)
								{
									piezas_inmoviles[id_fijo] = mov1.slice();
									break;
								}
								else
									break;
							}
							mov1.push([y-1, x-1]);
							--y;
							--x;
						}
					}
					break;
				}
				--y;
				--x;
			}
			var y = parseInt(pos_piezas_blancas[key][0]);
			var x = parseInt(pos_piezas_blancas[key][1]);
			var mov1 = [];
			mov1.push([y,x]);
			while (y>0 && x<7)
			{
				if (!t.rows[y-1].cells[x+1].id)
				{
					mov.push([y-1, x+1]);
					mov1.push([y-1, x+1]);
				}
				else if ((t.rows[y-1].cells[x+1].id).charAt(3) == 1 && (t.rows[y-1].cells[x+1].id).charAt(2) == 0)
				{
					mov.push([y-1, x+1]);
					var id_mov = y1+''+x1+''+1+''+key;
					jaque = true;
					jaque_pos[id_mov] = mov1.slice();
				}
				else
				{
					mov.push([y-1, x+1]);
					mov1.push([y-1, x+1]);
					if ((t.rows[y-1].cells[x+1].id).charAt(2) == 0)
					{
						var id_fijo = (t.rows[y-1].cells[x+1]).id;
						--y;
						++x;
						while (y>0 && x<7)
						{
							if (t.rows[y-1].cells[x+1].id)
							{
								if ((t.rows[y-1].cells[x+1].id).charAt(3) == 1 && (t.rows[y-1].cells[x+1].id).charAt(2) == 0)
								{
									piezas_inmoviles[id_fijo] = mov1.slice();
									break;
								}
								else
									break;
							}
							mov1.push([y-1, x+1]);
							--y;
							++x;
						}
					}
					break;
				}
				--y;
				++x;
			}
			var y = parseInt(pos_piezas_blancas[key][0]);
			var x = parseInt(pos_piezas_blancas[key][1]);
			var mov1 = [];
			mov1.push([y,x]);
			while (y<7 && x>0)
			{
				if (!t.rows[y+1].cells[x-1].id)
				{
					mov.push([y+1, x-1]);
					mov1.push([y+1, x-1]);
				}
				else if ((t.rows[y+1].cells[x-1].id).charAt(3) == 1 && (t.rows[y+1].cells[x-1].id).charAt(2) == 0)
				{
					mov.push([y+1, x-1]);
					var id_mov = y1+''+x1+''+1+''+key;
					jaque = true;
					jaque_pos[id_mov] = mov1.slice();
				}
				else
				{
					mov.push([y+1, x-1]);
					mov1.push([y+1, x-1]);
					if ((t.rows[y+1].cells[x-1].id).charAt(2) == 0)
					{
						var id_fijo = (t.rows[y+1].cells[x-1]).id;
						++y;
						--x;
						while (y<7 && x>0)
						{
							if (t.rows[y+1].cells[x-1].id)
							{
								if ((t.rows[y+1].cells[x-1].id).charAt(3) == 1 && (t.rows[y+1].cells[x-1].id).charAt(2) == 0)
								{
									piezas_inmoviles[id_fijo] = mov1.slice();
									break;
								}
								else
									break;
							}
							mov1.push([y+1, x-1]);
							++y;
							--x;
						}
					}
					break;
				}
				++y;
				--x;
			}
			var y = parseInt(pos_piezas_blancas[key][0]);
			var x = parseInt(pos_piezas_blancas[key][1]);
			var mov1 = [];
			mov1.push([y,x]);
			while (y<7 && x<7)
			{
				if (!t.rows[y+1].cells[x+1].id)
				{
					mov.push([y+1, x+1]);
					mov1.push([y+1, x+1]);
				}
				else if ((t.rows[y+1].cells[x+1].id).charAt(3) == 1 && (t.rows[y+1].cells[x+1].id).charAt(2) == 0)
				{
					mov.push([y+1, x+1]);
					var id_mov = y1+''+x1+''+1+''+key;
					jaque = true;
					jaque_pos[id_mov] = mov1.slice();
				}
				else
				{
					mov.push([y+1, x+1]);
					mov1.push([y+1, x+1]);
					if ((t.rows[y+1].cells[x+1].id).charAt(2) == 0)
					{
						var id_fijo = (t.rows[y+1].cells[x+1]).id;
						++y;
						++x;
						while (y<7 && x<7)
						{
							if (t.rows[y+1].cells[x+1].id)
							{
								if ((t.rows[y+1].cells[x+1].id).charAt(3) == 1 && (t.rows[y+1].cells[x+1].id).charAt(2) == 0)
								{
									piezas_inmoviles[id_fijo] = mov1.slice();
									break;
								}
								else
									break;
							}
							mov1.push([y+1, x+1]);
							++y;
							++x;
						}
					}
					break;
				}
				++y;
				++x;
			}
			mov_ataque_blancas[key] = mov.slice();
		}
		
		
		
		if (key == 3 || key == 6 || pieza == 3) // ----------------------------mov alfil
		{
			mov_ataque_blancas[key] = [];
			var mov = [];
			var y1 = parseInt(pos_piezas_blancas[key][0]);
			var x1 = parseInt(pos_piezas_blancas[key][1]);
			var y = parseInt(pos_piezas_blancas[key][0]);
			var x = parseInt(pos_piezas_blancas[key][1]);
			var mov1 = [];
			mov1.push([y,x]);
			while (y>0 && x>0)
			{
				if (!t.rows[y-1].cells[x-1].id)
				{
					mov.push([y-1, x-1]);
					mov1.push([y-1, x-1]);
				}
				else if ((t.rows[y-1].cells[x-1].id).charAt(3) == 1 && (t.rows[y-1].cells[x-1].id).charAt(2) == 0)
				{
					mov.push([y-1, x-1]);
					var id_mov = y1+''+x1+''+1+''+key;
					jaque = true;
					jaque_pos[id_mov] = mov1.slice();
				}
				else
				{
					mov.push([y-1, x-1]);
					mov1.push([y-1, x-1]);
					if ((t.rows[y-1].cells[x-1].id).charAt(2) == 0)
					{
						var id_fijo = (t.rows[y-1].cells[x-1]).id;
						--y;
						--x;
						while (y>0 && x>0)
						{
							if (t.rows[y-1].cells[x-1].id)
							{
								if ((t.rows[y-1].cells[x-1].id).charAt(3) == 1 && (t.rows[y-1].cells[x-1].id).charAt(2) == 0)
								{
									piezas_inmoviles[id_fijo] = mov1.slice();
									break;
								}
								else
									break;
							}
							mov1.push([y-1, x-1]);
							--y;
							--x;
						}
					}
					break;
				}
				--y;
				--x;
			}
			var y = parseInt(pos_piezas_blancas[key][0]);
			var x = parseInt(pos_piezas_blancas[key][1]);
			var mov1 = [];
			mov1.push([y,x]);
			while (y>0 && x<7)
			{
				if (!t.rows[y-1].cells[x+1].id)
				{
					mov.push([y-1, x+1]);
					mov1.push([y-1, x+1]);
				}
				else if ((t.rows[y-1].cells[x+1].id).charAt(3) == 1 && (t.rows[y-1].cells[x+1].id).charAt(2) == 0)
				{
					mov.push([y-1, x+1]);
					var id_mov = y1+''+x1+''+1+''+key;
					jaque = true;
					jaque_pos[id_mov] = mov1.slice();
				}
				else
				{
					mov.push([y-1, x+1]);
					mov1.push([y-1, x+1]);
					if ((t.rows[y-1].cells[x+1].id).charAt(2) == 0)
					{
						var id_fijo = (t.rows[y-1].cells[x+1]).id;
						--y;
						++x;
						while (y>0 && x<7)
						{
							if (t.rows[y-1].cells[x+1].id)
							{
								if ((t.rows[y-1].cells[x+1].id).charAt(3) == 1 && (t.rows[y-1].cells[x+1].id).charAt(2) == 0)
								{
									piezas_inmoviles[id_fijo] = mov1.slice();
									break;
								}
								else
									break;
							}
							mov1.push([y-1, x+1]);
							--y;
							++x;
						}
					}
					break;
				}
				--y;
				++x;
			}
			var y = parseInt(pos_piezas_blancas[key][0]);
			var x = parseInt(pos_piezas_blancas[key][1]);
			var mov1 = [];
			mov1.push([y,x]);
			while (y<7 && x>0)
			{
				if (!t.rows[y+1].cells[x-1].id)
				{
					mov.push([y+1, x-1]);
					mov1.push([y+1, x-1]);
				}
				else if ((t.rows[y+1].cells[x-1].id).charAt(3) == 1 && (t.rows[y+1].cells[x-1].id).charAt(2) == 0)
				{
					mov.push([y+1, x-1]);
					var id_mov = y1+''+x1+''+1+''+key;
					jaque = true;
					jaque_pos[id_mov] = mov1.slice();
				}
				else
				{
					mov.push([y+1, x-1]);
					mov1.push([y+1, x-1]);
					if ((t.rows[y+1].cells[x-1].id).charAt(2) == 0)
					{
						var id_fijo = (t.rows[y+1].cells[x-1]).id;
						++y;
						--x;
						while (y<7 && x>0)
						{
							if (t.rows[y+1].cells[x-1].id)
							{
								if ((t.rows[y+1].cells[x-1].id).charAt(3) == 1 && (t.rows[y+1].cells[x-1].id).charAt(2) == 0)
								{
									piezas_inmoviles[id_fijo] = mov1.slice();
									break;
								}
								else
									break;
							}
							mov1.push([y+1, x-1]);
							++y;
							--x;
						}
					}
					break;
				}
				++y;
				--x;
			}
			var y = parseInt(pos_piezas_blancas[key][0]);
			var x = parseInt(pos_piezas_blancas[key][1]);
			var mov1 = [];
			mov1.push([y,x]);
			while (y<7 && x<7)
			{
				if (!t.rows[y+1].cells[x+1].id)
				{
					mov.push([y+1, x+1]);
					mov1.push([y+1, x+1]);
				}
				else if ((t.rows[y+1].cells[x+1].id).charAt(3) == 1 && (t.rows[y+1].cells[x+1].id).charAt(2) == 0)
				{
					mov.push([y+1, x+1]);
					var id_mov = y1+''+x1+''+1+''+key;
					jaque = true;
					jaque_pos[id_mov] = mov1.slice();
				}
				else
				{
					mov.push([y+1, x+1]);
					mov1.push([y+1, x+1]);
					if ((t.rows[y+1].cells[x+1].id).charAt(2) == 0)
					{
						var id_fijo = (t.rows[y+1].cells[x+1]).id;
						++y;
						++x;
						while (y<7 && x<7)
						{
							if (t.rows[y+1].cells[x+1].id)
							{
								if ((t.rows[y+1].cells[x+1].id).charAt(3) == 1 && (t.rows[y+1].cells[x+1].id).charAt(2) == 0)
								{
									piezas_inmoviles[id_fijo] = mov1.slice();
									break;
								}
								else
									break;
							}
							mov1.push([y+1, x+1]);
							++y;
							++x;
						}
					}
					break;
				}
				++y;
				++x;
			}
			mov_ataque_blancas[key] = mov.slice();
		}
		
		
		
		if (key == 5 || key == 8 || pieza == 5) // // ----------------------------mov torre
		{
			mov_ataque_blancas[key] = [];
			var mov = [];
			var y1 = parseInt(pos_piezas_blancas[key][0]);
			var x1 = parseInt(pos_piezas_blancas[key][1]);
			var y = parseInt(pos_piezas_blancas[key][0]);
			var x = parseInt(pos_piezas_blancas[key][1]);
			var mov1 = [];
			mov1.push([y,x]);
			while (y>0)
			{
				if (!t.rows[y-1].cells[x].id)
				{
					mov.push([y-1, x]);
					mov1.push([y-1, x]);
				}
				else if ((t.rows[y-1].cells[x].id).charAt(3) == 1 && (t.rows[y-1].cells[x].id).charAt(2) == 0)
				{
					mov.push([y-1, x]);
					var id_mov = y1+''+x1+''+1+''+key;
					jaque = true;
					jaque_pos[id_mov] = mov1.slice();
				}
				else
				{
					mov.push([y-1, x]);
					mov1.push([y-1, x]);
					if ((t.rows[y-1].cells[x].id).charAt(2) == 0)
					{
						var id_fijo = (t.rows[y-1].cells[x]).id;
						--y;
						while (y>0)
						{
							if (t.rows[y-1].cells[x].id)
							{
								if ((t.rows[y-1].cells[x].id).charAt(3) == 1 && (t.rows[y-1].cells[x].id).charAt(2) == 0)
								{
									piezas_inmoviles[id_fijo] = mov1.slice();
									break;
								}
								else
									break;
							}
							mov1.push([y-1, x]);
							--y;
						}
					}
					break;
				}
				--y;
			}
			var y = parseInt(pos_piezas_blancas[key][0]);
			var x = parseInt(pos_piezas_blancas[key][1]);
			var mov1 = [];
			mov1.push([y,x]);
			while (y<7)
			{
				if (!t.rows[y+1].cells[x].id)
				{
					mov.push([y+1, x]);
					mov1.push([y+1, x]);
				}
				else if ((t.rows[y+1].cells[x].id).charAt(3) == 1 && (t.rows[y+1].cells[x].id).charAt(2) == 0)
				{
					mov.push([y+1, x]);
					var id_mov = y1+''+x1+''+1+''+key;
					jaque = true;
					jaque_pos[id_mov] = mov1.slice();
				}
				else
				{
					mov.push([y+1, x]);
					mov1.push([y+1, x]);
					if ((t.rows[y+1].cells[x].id).charAt(2) == 0)
					{
						var id_fijo = (t.rows[y+1].cells[x]).id;
						++y;
						while (y<7)
						{
							if (t.rows[y+1].cells[x].id)
							{
								if ((t.rows[y+1].cells[x].id).charAt(3) == 1 && (t.rows[y+1].cells[x].id).charAt(2) == 0)
								{
									piezas_inmoviles[id_fijo] = mov1.slice();
									break;
								}
								else
									break;
							}
							mov1.push([y+1, x]);
							++y;
						}
					}
					break;
				}
				++y;
			}
			var y = parseInt(pos_piezas_blancas[key][0]);
			var x = parseInt(pos_piezas_blancas[key][1]);
			var mov1 = [];
			mov1.push([y,x]);
			while (x>0)
			{
				if (!t.rows[y].cells[x-1].id)
				{
					 mov.push([y, x-1]);
					 mov1.push([y, x-1]);
				}
				else if ((t.rows[y].cells[x-1].id).charAt(3) == 1 && (t.rows[y].cells[x-1].id).charAt(2) == 0)
				{
					mov.push([y, x-1]);
					var id_mov = y1+''+x1+''+1+''+key;
					jaque = true;
					jaque_pos[id_mov] = mov1.slice();
				}
				else
				{
					mov.push([y, x-1]);
					mov1.push([y, x-1]);
					if ((t.rows[y].cells[x-1].id).charAt(2) == 0)
					{
						var id_fijo = (t.rows[y].cells[x-1]).id;
						--x;
						while (x>0)
						{
							if (t.rows[y].cells[x-1].id)
							{
								if ((t.rows[y].cells[x-1].id).charAt(3) == 1 && (t.rows[y].cells[x-1].id).charAt(2) == 0)
								{
									piezas_inmoviles[id_fijo] = mov1.slice();
									break;
								}
								else
									break;
							}
							mov1.push([y, x-1]);
							--x;
						}
					}
					break;
				}
				--x;
			}
			var y = parseInt(pos_piezas_blancas[key][0]);
			var x = parseInt(pos_piezas_blancas[key][1]);
			var mov1 = [];
			mov1.push([y,x]);
			while (x<7)
			{
				if (!t.rows[y].cells[x+1].id)
				{
					mov.push([y, x+1]);
					mov1.push([y, x+1]);
				}
				else if ((t.rows[y].cells[x+1].id).charAt(3) == 1 && (t.rows[y].cells[x+1].id).charAt(2) == 0)
				{
					mov.push([y, x+1]);
					var id_mov = y1+''+x1+''+1+''+key;
					jaque = true;
					jaque_pos[id_mov] = mov1.slice();
				}
				else
				{
					mov.push([y, x+1]);
					mov1.push([y, x+1]);
					if ((t.rows[y].cells[x+1].id).charAt(2) == 0)
					{
						var id_fijo = (t.rows[y].cells[x+1]).id;
						++x;
						while (x<7)
						{
							if (t.rows[y].cells[x+1].id)
							{
								if ((t.rows[y].cells[x+1].id).charAt(3) == 1 && (t.rows[y].cells[x+1].id).charAt(2) == 0)
								{
									piezas_inmoviles[id_fijo] = mov1.slice();
									break;
								}
								else
									break;
							}
							mov1.push([y, x+1]);
							++x;
						}
					}
					break;
				}
				++x;
			}
			mov_ataque_blancas[key] = mov.slice();
		}
	}
	
	
	// mov ATAQUE NEGRAS
	
	for (key in pos_piezas_negras)
	{
		if (key.length == 2)
			pieza = key[1];
		else
			pieza = key;
		
		if (key == 2 || pieza == 2) // ----------------------------mov_dama
		{
			mov_ataque_negras[key] = [];
			var mov = [];
			var y1 = parseInt(pos_piezas_negras[key][0]);
			var x1 = parseInt(pos_piezas_negras[key][1]);
			var y = parseInt(pos_piezas_negras[key][0]);
			var x = parseInt(pos_piezas_negras[key][1]);
			var mov1 = [];
			mov1.push([y,x]);
			while (y>0)
			{
				if (!t.rows[y-1].cells[x].id)
				{
					mov.push([y-1, x]);
					mov1.push([y-1, x]);
				}
				else if ((t.rows[y-1].cells[x].id).charAt(3) == 1 && (t.rows[y-1].cells[x].id).charAt(2) == 1)
				{
					mov.push([y-1, x]);
					var id_mov = y1+''+x1+''+0+''+key;
					jaque = true;
					jaque_pos[id_mov] = mov1.slice();
				}
				else
				{
					mov.push([y-1, x]);
					mov1.push([y-1, x]);
					if ((t.rows[y-1].cells[x].id).charAt(2) == 1)
					{
						var id_fijo = (t.rows[y-1].cells[x]).id;
						--y;
						while (y>0)
						{
							if (t.rows[y-1].cells[x].id)
							{
								if ((t.rows[y-1].cells[x].id).charAt(3) == 1 && (t.rows[y-1].cells[x].id).charAt(2) == 1)
								{
									piezas_inmoviles[id_fijo] = mov1.slice();
									break;
								}
								else
									break;
							}
							mov1.push([y-1, x]);
							--y;
						}
					}
					break;
				}
				--y;
			}
			var y = parseInt(pos_piezas_negras[key][0]);
			var x = parseInt(pos_piezas_negras[key][1]);
			var mov1 = [];
			mov1.push([y,x]);
			while (y<7)
			{
				if (!t.rows[y+1].cells[x].id)
				{
					mov.push([y+1, x]);
					mov1.push([y+1, x]);
				}
				else if ((t.rows[y+1].cells[x].id).charAt(3) == 1 && (t.rows[y+1].cells[x].id).charAt(2) == 1)
				{
					mov.push([y+1, x]);
					var id_mov = y1+''+x1+''+0+''+key;
					jaque = true;
					jaque_pos[id_mov] = mov1.slice();
				}
				else
				{
					mov.push([y+1, x]);
					mov1.push([y+1, x]);
					if ((t.rows[y+1].cells[x].id).charAt(2) == 1)
					{
						var id_fijo = (t.rows[y+1].cells[x]).id;
						++y;
						while (y<7)
						{
							if (t.rows[y+1].cells[x].id)
							{
								if ((t.rows[y+1].cells[x].id).charAt(3) == 1 && (t.rows[y+1].cells[x].id).charAt(2) == 1)
								{
									piezas_inmoviles[id_fijo] = mov1.slice();
									break;
								}
								else
									break;
							}
							mov1.push([y+1, x]);
							++y;
						}
					}
					break;
				}
				++y;
			}
			var y = parseInt(pos_piezas_negras[key][0]);
			var x = parseInt(pos_piezas_negras[key][1]);
			var mov1 = [];
			mov1.push([y,x]);
			while (x>0)
			{
				if (!t.rows[y].cells[x-1].id)
				{
					mov.push([y, x-1]);
					mov1.push([y, x-1]);
				}
				else if ((t.rows[y].cells[x-1].id).charAt(3) == 1 && (t.rows[y].cells[x-1].id).charAt(2) == 1)
				{
					mov.push([y, x-1]);
					var id_mov = y1+''+x1+''+0+''+key;
					jaque = true;
					jaque_pos[id_mov] = mov1.slice();
				}
				else
				{
					mov.push([y, x-1]);
					mov1.push([y, x-1]);
					if ((t.rows[y].cells[x-1].id).charAt(2) == 1)
					{
						var id_fijo = (t.rows[y].cells[x-1]).id;
						--x;
						while (x>0)
						{
							if (t.rows[y].cells[x-1].id)
							{
								if ((t.rows[y].cells[x-1].id).charAt(3) == 1 && (t.rows[y].cells[x-1].id).charAt(2) == 1)
								{
									piezas_inmoviles[id_fijo] = mov1.slice();
									break;
								}
								else
									break;
							}
							mov1.push([y, x-1]);
							--x;
						}
					}
					break;
				}
				--x;
			}
			var y = parseInt(pos_piezas_negras[key][0]);
			var x = parseInt(pos_piezas_negras[key][1]);
			var mov1 = [];
			mov1.push([y,x]);
			while (x<7)
			{
				if (!t.rows[y].cells[x+1].id)
				{
					mov.push([y, x+1]);
					mov1.push([y, x+1]);
				}
				else if ((t.rows[y].cells[x+1].id).charAt(3) == 1 && (t.rows[y].cells[x+1].id).charAt(2) == 1)
				{
					mov.push([y, x+1]);
					var id_mov = y1+''+x1+''+0+''+key;
					jaque = true;
					jaque_pos[id_mov] = mov1.slice();
				}
				else
				{
					mov.push([y, x+1]);
					mov1.push([y, x+1]);
					if ((t.rows[y].cells[x+1].id).charAt(2) == 1)
					{
						var id_fijo = (t.rows[y].cells[x+1]).id;
						++x;
						while (x<7)
						{
							if (t.rows[y].cells[x+1].id)
							{
								if ((t.rows[y].cells[x+1].id).charAt(3) == 1 && (t.rows[y].cells[x+1].id).charAt(2) == 1)
								{
									piezas_inmoviles[id_fijo] = mov1.slice();
									break;
								}
								else
									break;
							}
							mov1.push([y, x+1]);
							++x;
						}
					}
					break;
				}
				++x;
			}
			var y = parseInt(pos_piezas_negras[key][0]);
			var x = parseInt(pos_piezas_negras[key][1]);
			var mov1 = [];
			mov1.push([y,x]);
			while (y>0 && x>0)
			{
				if (!t.rows[y-1].cells[x-1].id)
				{
					mov.push([y-1, x-1]);
					mov1.push([y-1, x-1]);
				}
				else if ((t.rows[y-1].cells[x-1].id).charAt(3) == 1 && (t.rows[y-1].cells[x-1].id).charAt(2) == 1)
				{
					mov.push([y-1, x-1]);
					var id_mov = y1+''+x1+''+0+''+key;
					jaque = true;
					jaque_pos[id_mov] = mov1.slice();
				}
				else
				{
					mov.push([y-1, x-1]);
					mov1.push([y-1, x-1]);
					if ((t.rows[y-1].cells[x-1].id).charAt(2) == 1)
					{
						var id_fijo = (t.rows[y-1].cells[x-1]).id;
						--y;
						--x;
						while (y>0 && x>0)
						{
							if (t.rows[y-1].cells[x-1].id)
							{
								if ((t.rows[y-1].cells[x-1].id).charAt(3) == 1 && (t.rows[y-1].cells[x-1].id).charAt(2) == 1)
								{
									piezas_inmoviles[id_fijo] = mov1.slice();
									break;
								}
								else
									break;
							}
							mov1.push([y-1, x-1]);
							--y;
							--x;
						}
					}
					break;
				}
				--y;
				--x;
			}
			var y = parseInt(pos_piezas_negras[key][0]);
			var x = parseInt(pos_piezas_negras[key][1]);
			var mov1 = [];
			mov1.push([y,x]);
			while (y>0 && x<7)
			{
				if (!t.rows[y-1].cells[x+1].id)
				{
					mov.push([y-1, x+1]);
					mov1.push([y-1, x+1]);
				}
				else if ((t.rows[y-1].cells[x+1].id).charAt(3) == 1 && (t.rows[y-1].cells[x+1].id).charAt(2) == 1)
				{
					mov.push([y-1, x+1]);
					var id_mov = y1+''+x1+''+0+''+key;
					jaque = true;
					jaque_pos[id_mov] = mov1.slice();
				}
				else
				{
					mov.push([y-1, x+1]);
					mov1.push([y-1, x+1]);
					if ((t.rows[y-1].cells[x+1].id).charAt(2) == 1)
					{
						var id_fijo = (t.rows[y-1].cells[x+1]).id;
						--y;
						++x;
						while (y>0 && x<7)
						{
							if (t.rows[y-1].cells[x+1].id)
							{
								if ((t.rows[y-1].cells[x+1].id).charAt(3) == 1 && (t.rows[y-1].cells[x+1].id).charAt(2) == 1)
								{
									piezas_inmoviles[id_fijo] = mov1.slice();
									break;
								}
								else
									break;
							}
							mov1.push([y-1, x+1]);
							--y;
							++x;
						}
					}
					break;
				}
				--y;
				++x;
			}
			var y = parseInt(pos_piezas_negras[key][0]);
			var x = parseInt(pos_piezas_negras[key][1]);
			var mov1 = [];
			mov1.push([y,x]);
			while (y<7 && x>0)
			{
				if (!t.rows[y+1].cells[x-1].id)
				{
					mov.push([y+1, x-1]);
					mov1.push([y+1, x-1]);
				}
				else if ((t.rows[y+1].cells[x-1].id).charAt(3) == 1 && (t.rows[y+1].cells[x-1].id).charAt(2) == 1)
				{
					mov.push([y+1, x-1]);
					var id_mov = y1+''+x1+''+0+''+key;
					jaque = true;
					jaque_pos[id_mov] = mov1.slice();
				}
				else
				{
					mov.push([y+1, x-1]);
					mov1.push([y+1, x-1]);
					if ((t.rows[y+1].cells[x-1].id).charAt(2) == 1)
					{
						var id_fijo = (t.rows[y+1].cells[x-1]).id;
						++y;
						--x;
						while (y<7 && x>0)
						{
							if (t.rows[y+1].cells[x-1].id)
							{
								if ((t.rows[y+1].cells[x-1].id).charAt(3) == 1 && (t.rows[y+1].cells[x-1].id).charAt(2) == 1)
								{
									piezas_inmoviles[id_fijo] = mov1.slice();
									break;
								}
								else
									break;
							}
							mov1.push([y+1, x-1]);
							++y;
							--x;
						}
					}
					break;
				}
				++y;
				--x;
			}
			var y = parseInt(pos_piezas_negras[key][0]);
			var x = parseInt(pos_piezas_negras[key][1]);
			var mov1 = [];
			mov1.push([y,x]);
			while (y<7 && x<7)
			{
				if (!t.rows[y+1].cells[x+1].id)
				{
					mov.push([y+1, x+1]);
					mov1.push([y+1, x+1]);
				}
				else if ((t.rows[y+1].cells[x+1].id).charAt(3) == 1 && (t.rows[y+1].cells[x+1].id).charAt(2) == 1)
				{
					mov.push([y+1, x+1]);
					var id_mov = y1+''+x1+''+0+''+key;
					jaque = true;
					jaque_pos[id_mov] = mov1.slice();
				}
				else
				{
					mov.push([y+1, x+1]);
					mov1.push([y+1, x+1]);
					if ((t.rows[y+1].cells[x+1].id).charAt(2) == 1)
					{
						var id_fijo = (t.rows[y+1].cells[x+1]).id;
						++y;
						++x;
						while (y<7 && x<7)
						{
							if (t.rows[y+1].cells[x+1].id)
							{
								if ((t.rows[y+1].cells[x+1].id).charAt(3) == 1 && (t.rows[y+1].cells[x+1].id).charAt(2) == 1)
								{
									piezas_inmoviles[id_fijo] = mov1.slice();
									break;
								}
								else
									break;
							}
							mov1.push([y+1, x+1]);
							++y;
							++x;
						}
					}
					break;
				}
				++y;
				++x;
			}
			mov_ataque_negras[key] = mov.slice();
		}
		
		
		
		if (key == 3 || key == 6 || pieza == 3) // ----------------------------mov alfil
		{
			mov_ataque_negras[key] = [];
			var mov = [];
			var y1 = parseInt(pos_piezas_negras[key][0]);
			var x1 = parseInt(pos_piezas_negras[key][1]);
			var y = parseInt(pos_piezas_negras[key][0]);
			var x = parseInt(pos_piezas_negras[key][1]);
			var mov1 = [];
			mov1.push([y,x]);
			while (y>0 && x>0)
			{
				if (!t.rows[y-1].cells[x-1].id)
				{
					mov.push([y-1, x-1]);
					mov1.push([y-1, x-1]);
				}
				else if ((t.rows[y-1].cells[x-1].id).charAt(3) == 1 && (t.rows[y-1].cells[x-1].id).charAt(2) == 1)
				{
					mov.push([y-1, x-1]);
					var id_mov = y1+''+x1+''+0+''+key;
					jaque = true;
					jaque_pos[id_mov] = mov1.slice();
				}
				else
				{
					mov.push([y-1, x-1]);
					mov1.push([y-1, x-1]);
					if ((t.rows[y-1].cells[x-1].id).charAt(2) == 1)
					{
						var id_fijo = (t.rows[y-1].cells[x-1]).id;
						--y;
						--x;
						while (y>0 && x>0)
						{
							if (t.rows[y-1].cells[x-1].id)
							{
								if ((t.rows[y-1].cells[x-1].id).charAt(3) == 1 && (t.rows[y-1].cells[x-1].id).charAt(2) == 1)
								{
									piezas_inmoviles[id_fijo] = mov1.slice();
									break;
								}
								else
									break;
							}
							mov1.push([y-1, x-1]);
							--y;
							--x;
						}
					}
					break;
				}
				--y;
				--x;
			}
			var y = parseInt(pos_piezas_negras[key][0]);
			var x = parseInt(pos_piezas_negras[key][1]);
			var mov1 = [];
			mov1.push([y,x]);
			while (y>0 && x<7)
			{
				if (!t.rows[y-1].cells[x+1].id)
				{
					mov.push([y-1, x+1]);
					mov1.push([y-1, x+1]);
				}
				else if ((t.rows[y-1].cells[x+1].id).charAt(3) == 1 && (t.rows[y-1].cells[x+1].id).charAt(2) == 1)
				{
					mov.push([y-1, x+1]);
					var id_mov = y1+''+x1+''+0+''+key;
					jaque = true;
					jaque_pos[id_mov] = mov1.slice();
				}
				else
				{
					mov.push([y-1, x+1]);
					mov1.push([y-1, x+1]);
					if ((t.rows[y-1].cells[x+1].id).charAt(2) == 1)
					{
						var id_fijo = (t.rows[y-1].cells[x+1]).id;
						--y;
						++x;
						while (y>0 && x<7)
						{
							if (t.rows[y-1].cells[x+1].id)
							{
								if ((t.rows[y-1].cells[x+1].id).charAt(3) == 1 && (t.rows[y-1].cells[x+1].id).charAt(2) == 1)
								{
									piezas_inmoviles[id_fijo] = mov1.slice();
									break;
								}
								else
									break;
							}
							mov1.push([y-1, x+1]);
							--y;
							++x;
						}
					}
					break;
				}
				--y;
				++x;
			}
			var y = parseInt(pos_piezas_negras[key][0]);
			var x = parseInt(pos_piezas_negras[key][1]);
			var mov1 = [];
			mov1.push([y,x]);
			while (y<7 && x>0)
			{
				if (!t.rows[y+1].cells[x-1].id)
				{
					mov.push([y+1, x-1]);
					mov1.push([y+1, x-1]);
				}
				else if ((t.rows[y+1].cells[x-1].id).charAt(3) == 1 && (t.rows[y+1].cells[x-1].id).charAt(2) == 1)
				{
					mov.push([y+1, x-1]);
					var id_mov = y1+''+x1+''+0+''+key;
					jaque = true;
					jaque_pos[id_mov] = mov1.slice();
				}
				else
				{
					mov.push([y+1, x-1]);
					mov1.push([y+1, x-1]);
					if ((t.rows[y+1].cells[x-1].id).charAt(2) == 1)
					{
						var id_fijo = (t.rows[y+1].cells[x-1]).id;
						++y;
						--x;
						while (y<7 && x>0)
						{
							if (t.rows[y+1].cells[x-1].id)
							{
								if ((t.rows[y+1].cells[x-1].id).charAt(3) == 1 && (t.rows[y+1].cells[x-1].id).charAt(2) == 1)
								{
									piezas_inmoviles[id_fijo] = mov1.slice();
									break;
								}
								else
									break;
							}
							mov1.push([y+1, x-1]);
							++y;
							--x;
						}
					}
					break;
				}
				++y;
				--x;
			}
			var y = parseInt(pos_piezas_negras[key][0]);
			var x = parseInt(pos_piezas_negras[key][1]);
			var mov1 = [];
			mov1.push([y,x]);
			while (y<7 && x<7)
			{
				if (!t.rows[y+1].cells[x+1].id)
				{
					mov.push([y+1, x+1]);
					mov1.push([y+1, x+1]);
				}
				else if ((t.rows[y+1].cells[x+1].id).charAt(3) == 1 && (t.rows[y+1].cells[x+1].id).charAt(2) == 1)
				{
					mov.push([y+1, x+1]);
					var id_mov = y1+''+x1+''+0+''+key;
					jaque = true;
					jaque_pos[id_mov] = mov1.slice();
				}
				else
				{
					mov.push([y+1, x+1]);
					mov1.push([y+1, x+1]);
					if ((t.rows[y+1].cells[x+1].id).charAt(2) == 1)
					{
						var id_fijo = (t.rows[y+1].cells[x+1]).id;
						++y;
						++x;
						while (y<7 && x<7)
						{
							if (t.rows[y+1].cells[x+1].id)
							{
								if ((t.rows[y+1].cells[x+1].id).charAt(3) == 1 && (t.rows[y+1].cells[x+1].id).charAt(2) == 1)
								{
									piezas_inmoviles[id_fijo] = mov1.slice();
									break;
								}
								else
									break;
							}
							mov1.push([y+1, x+1]);
							++y;
							++x;
						}
					}
					break;
				}
				++y;
				++x;
			}
			mov_ataque_negras[key] = mov.slice();
		}
		
		
		
		if (key == 5 || key == 8 || pieza == 5) // // ----------------------------mov torre
		{
			mov_ataque_negras[key] = [];
			var mov = [];
			var y1 = parseInt(pos_piezas_negras[key][0]);
			var x1 = parseInt(pos_piezas_negras[key][1]);
			var y = parseInt(pos_piezas_negras[key][0]);
			var x = parseInt(pos_piezas_negras[key][1]);
			var mov1 = [];
			mov1.push([y,x]);
			while (y>0)
			{
				if (!t.rows[y-1].cells[x].id)
				{
					mov.push([y-1, x]);
					mov1.push([y-1, x]);
				}
				else if ((t.rows[y-1].cells[x].id).charAt(3) == 1 && (t.rows[y-1].cells[x].id).charAt(2) == 1)
				{
					mov.push([y-1, x]);
					var id_mov = y1+''+x1+''+0+''+key;
					jaque = true;
					jaque_pos[id_mov] = mov1.slice();
				}
				else
				{
					mov.push([y-1, x]);
					mov1.push([y-1, x]);
					if ((t.rows[y-1].cells[x].id).charAt(2) == 1)
					{
						var id_fijo = (t.rows[y-1].cells[x]).id;
						--y;
						while (y>0)
						{
							if (t.rows[y-1].cells[x].id)
							{
								if ((t.rows[y-1].cells[x].id).charAt(3) == 1 && (t.rows[y-1].cells[x].id).charAt(2) == 1)
								{
									piezas_inmoviles[id_fijo] = mov1.slice();
									break;
								}
								else
									break;
							}
							mov1.push([y-1, x]);
							--y;
						}
					}
					break;
				}
				--y;
			}
			var y = parseInt(pos_piezas_negras[key][0]);
			var x = parseInt(pos_piezas_negras[key][1]);
			var mov1 = [];
			mov1.push([y,x]);
			while (y<7)
			{
				if (!t.rows[y+1].cells[x].id)
				{
					mov.push([y+1, x]);
					mov1.push([y+1, x]);
				}
				else if ((t.rows[y+1].cells[x].id).charAt(3) == 1 && (t.rows[y+1].cells[x].id).charAt(2) == 1)
				{
					mov.push([y+1, x]);
					var id_mov = y1+''+x1+''+0+''+key;
					jaque = true;
					jaque_pos[id_mov] = mov1.slice();
				}
				else
				{
					mov.push([y+1, x]);
					mov1.push([y+1, x]);
					if ((t.rows[y+1].cells[x].id).charAt(2) == 1)
					{
						var id_fijo = (t.rows[y+1].cells[x]).id;
						++y;
						while (y<7)
						{
							if (t.rows[y+1].cells[x].id)
							{
								if ((t.rows[y+1].cells[x].id).charAt(3) == 1 && (t.rows[y+1].cells[x].id).charAt(2) == 1)
								{
									piezas_inmoviles[id_fijo] = mov1.slice();
									break;
								}
								else
									break;
							}
							mov1.push([y+1, x]);
							++y;
						}
					}
					break;
				}
				++y;
			}
			var y = parseInt(pos_piezas_negras[key][0]);
			var x = parseInt(pos_piezas_negras[key][1]);
			var mov1 = [];
			mov1.push([y,x]);
			while (x>0)
			{
				if (!t.rows[y].cells[x-1].id)
				{
					 mov.push([y, x-1]);
					 mov1.push([y, x-1]);
				}
				else if ((t.rows[y].cells[x-1].id).charAt(3) == 1 && (t.rows[y].cells[x-1].id).charAt(2) == 1)
				{
					mov.push([y, x-1]);
					var id_mov = y1+''+x1+''+0+''+key;
					jaque = true;
					jaque_pos[id_mov] = mov1.slice();
				}
				else
				{
					mov.push([y, x-1]);
					mov1.push([y, x-1]);
					if ((t.rows[y].cells[x-1].id).charAt(2) == 1)
					{
						var id_fijo = (t.rows[y].cells[x-1]).id;
						--x;
						while (x>0)
						{
							if (t.rows[y].cells[x-1].id)
							{
								if ((t.rows[y].cells[x-1].id).charAt(3) == 1 && (t.rows[y].cells[x-1].id).charAt(2) == 1)
								{
									piezas_inmoviles[id_fijo] = mov1.slice();
									break;
								}
								else
									break;
							}
							mov1.push([y, x-1]);
							--x;
						}
					}
					break;
				}
				--x;
			}
			var y = parseInt(pos_piezas_negras[key][0]);
			var x = parseInt(pos_piezas_negras[key][1]);
			var mov1 = [];
			mov1.push([y,x]);
			while (x<7)
			{
				if (!t.rows[y].cells[x+1].id)
				{
					mov.push([y, x+1]);
					mov1.push([y, x+1]);
				}
				else if ((t.rows[y].cells[x+1].id).charAt(3) == 1 && (t.rows[y].cells[x+1].id).charAt(2) == 1)
				{
					mov.push([y, x+1]);
					var id_mov = y1+''+x1+''+0+''+key;
					jaque = true;
					jaque_pos[id_mov] = mov1.slice();
				}
				else
				{
					mov.push([y, x+1]);
					mov1.push([y, x+1]);
					if ((t.rows[y].cells[x+1].id).charAt(2) == 1)
					{
						var id_fijo = (t.rows[y].cells[x+1]).id;
						++x;
						while (x<7)
						{
							if (t.rows[y].cells[x+1].id)
							{
								if ((t.rows[y].cells[x+1].id).charAt(3) == 1 && (t.rows[y].cells[x+1].id).charAt(2) == 1)
								{
									piezas_inmoviles[id_fijo] = mov1.slice();
									break;
								}
								else
									break;
							}
							mov1.push([y, x+1]);
							++x;
						}
					}
					break;
				}
				++x;
			}
			mov_ataque_negras[key] = mov.slice();
		}
	}
	
	
	// fin mov ataque negras
	if (jaque)
	{
		if (turno == 1)
			t.rows[pos_piezas_negras[1][0]].cells[pos_piezas_negras[1][1]].className = 'jaque';
		else if (turno == 0)
			t.rows[pos_piezas_blancas[1][0]].cells[pos_piezas_blancas[1][1]].className = 'jaque';
		jaque_mov_piezas_(id);
	}
}


// JavaScript Document


function jaque_mov_piezas_(id)
{
	var color = parseInt(id[2]);
	var t = document.getElementById('chess_table');
	var mov = [];
	jaque_mov_rey = [];
	jaque_mov_piezas = {};
	
	
	if (color == 1) // jaque al rey negro: analizar mov rey y piezas negras
	{
		var y = pos_piezas_negras[1][0];
		var x = pos_piezas_negras[1][1];
		//MOV REY
		if ((y-1) > -1 && (x-1) > -1)
			if (!t.rows[y-1].cells[x-1].id || (t.rows[y-1].cells[x-1].id).charAt(2) == 1)
				mov.push([y-1, x-1]);
		if ((y-1) > -1)
			if (!t.rows[y-1].cells[x].id || (t.rows[y-1].cells[x].id).charAt(2) == 1)
				mov.push([y-1, x]);
		if ((y-1) > -1 && (x+1) < 8)
			if (!t.rows[y-1].cells[x+1].id || (t.rows[y-1].cells[x+1].id).charAt(2) == 1)
				mov.push([y-1, x+1]);
		if ((x-1) > -1)
			if (!t.rows[y].cells[x-1].id || (t.rows[y].cells[x-1].id).charAt(2) == 1)
				mov.push([y, x-1]);
		if ((y+1) < 8 && (x-1) > -1)
			if (!t.rows[y+1].cells[x-1].id || (t.rows[y+1].cells[x-1].id).charAt(2) == 1)
				mov.push([y+1, x-1]);
		if ((y+1) < 8)
			if (!t.rows[y+1].cells[x].id || (t.rows[y+1].cells[x].id).charAt(2) == 1)
				mov.push([y+1, x]);
		if ((y+1) < 8 && (x+1) < 8)
			if (!t.rows[y+1].cells[x+1].id || (t.rows[y+1].cells[x+1].id).charAt(2) == 1)
				mov.push([y+1, x+1]);
		if ((x+1) < 8)
			if (!t.rows[y].cells[x+1].id || (t.rows[y].cells[x+1].id).charAt(2) == 1)
				mov.push([y, x+1]);
		
		//alert('todos mov rey: '+mov);
		if (mov.length > 0)
		{
			var mov1 = [];
			for (key in mov_ataque_blancas)
				for (var i=0; i<mov_ataque_blancas[key].length; i++)
					for (var j=0; j<mov.length; j++)
						if (mov_ataque_blancas[key][i].join('') == mov[j].join(''))
							mov1.push(mov[j]);
			
			if (mov1.length > 0)
			{
				for (var i=0; i<mov1.length; i++)  //pueden haber mismas pos atacadas por mas de una pieza
					for (j=0; j<mov.length; j++)
						if (mov1[i].join('') == mov[j].join(''))
							mov.splice(j,1);
			}
			
			jaque_mov_rey = mov.slice();
		}
		//console.log(jaque_mov_rey);
		
		
		
		//MOV PIEZAS DE ATAQUE
		var jaque_num = [];
		for (key in jaque_pos)
			jaque_num.push(key);
		
		
		// -- mov ataque negras en pos jaque blancas 
		if (jaque_num.length == 1)  //jaque con una sola pieza, de lo contrario si no hay mov del rey es mate
		{
			var y1 = parseInt(jaque_num[0][0]);
			var x1 = parseInt(jaque_num[0][1]);
			
			var mov2 = [];
			for (key in jaque_pos)
				for (var i=0; i<jaque_pos[key].length; i++)
					mov2.push(jaque_pos[key][i]);
			
			var mov3 = [];
			for (key in mov_ataque_negras)
			{
				if (key != 1)
				{
					if (key.length == 2 || !isNaN(key))  // las piezas que no son peones
					{
						for (var i=0; i<mov_ataque_negras[key].length; i++)
							for (var j=0; j<mov2.length; j++)
								if (mov_ataque_negras[key][i].join('') == mov2[j].join(''))
									mov3.push(mov2[j]);
									
						if (mov3.length > 0)
							jaque_mov_piezas[key] = mov3.slice();
						
						mov3 = [];
					}
				}
			}
			
			//MOV PEON - agregar peon al paso
			var mov4 = [];
			for (key in pos_piezas_negras)  //lo hago así porque tengo que hacer el avance del peon y peon al paso
			{
				if (isNaN(key) && key.length == 1)
				{
					//alert(key+': '+pos_piezas_negras[key]);
					var y = parseInt(pos_piezas_negras[key][0]);
					var x = parseInt(pos_piezas_negras[key][1]);
					
					//MOV PEON (AVANCE)
					if (y == 1)
					{
						if (!t.rows[y+1].cells[x].id)
							mov4.push([y+1, x]);
						if ((!t.rows[y+1].cells[x].id) && (!t.rows[y+2].cells[x].id))
							mov4.push([y+2, x]);
					}
					else
					{
						if (!t.rows[y+1].cells[x].id)
							mov4.push([y+1, x]);
					}
					
					//MOV PEON (ATAQUE)
					if ((x-1) >= 0)
						if (t.rows[y+1].cells[x-1].id)
							if ((t.rows[y+1].cells[x-1].id).charAt(0) == y1 && (t.rows[y+1].cells[x-1].id).charAt(1) == x1)
								mov4.push([y+1, x-1]);
					if ((x+1) < 8)
						if (t.rows[y+1].cells[x+1].id)
							if ((t.rows[y+1].cells[x+1].id).charAt(0) == y1 && (t.rows[y+1].cells[x+1].id).charAt(1) == x1)
								mov4.push([y+1, x+1]);
					
					
					for (var i=0; i<mov2.length; i++)
						for (var j=0; j<mov4.length; j++)
							if (mov2[i].join('') == mov4[j].join(''))
								mov3.push(mov2[i]); //agrego solo los movimientos que bloquean al jaque = mov2
					
					if (mov3.length > 0)
					{
						//alert(mov3);
						jaque_mov_piezas[key] = mov3.slice();  //agrego los mov de peon de avance y ataque
						//alert(key+': '+jaque_mov_piezas[key]);
					}
					
					mov3 = [];
					mov4 = [];
					
					// PEON AL PASO
					if (isNaN(jaque_num[0].charAt(3)))
						if (ultimo_mov[4] == true)
							if ((y == y1 && x == (x1+1)) || (y == y1 && x == (x1-1)))
								jaque_mov_piezas[key] = [[y1+1, x1]];
					
				}
			}
		}
		
		
		/*
		// saco los mov de piezas inmoviles
		var claves = Object.getOwnPropertyNames(jaque_mov_piezas);
		var claves2 = Object.getOwnPropertyNames(piezas_inmoviles);
		
		if (claves2.length > 0)
			if (claves.length > 0)
				for (key in jaque_mov_piezas)
					for (key2 in piezas_inmoviles)
						if (key2.length == 3)
						{
							if (key == key2[3])
								delete jaque_mov_piezas[key];
						}
						else
						{
							if (key == key2[3]+''+key2[4])
								delete jaque_mov_piezas[key];
						}
		
		
		*/
		
		if (jaque_mov_rey.length == 0)
		{
			var claves3 = Object.getOwnPropertyNames(jaque_mov_piezas);
			if (claves3.length == 0)
			{
				alert('jaque mate');
				mate = true;
			}
		}
	}
	else if (color == 0)   //jaque al rey blanco
	{
		var y = pos_piezas_blancas[1][0];
		var x = pos_piezas_blancas[1][1];
		//MOV REY
		if ((y-1) > -1 && (x-1) > -1)
			if (!t.rows[y-1].cells[x-1].id || (t.rows[y-1].cells[x-1].id).charAt(2) == 0)
				mov.push([y-1, x-1]);
		if ((y-1) > -1)
			if (!t.rows[y-1].cells[x].id || (t.rows[y-1].cells[x].id).charAt(2) == 0)
				mov.push([y-1, x]);
		if ((y-1) > -1 && (x+1) < 8)
			if (!t.rows[y-1].cells[x+1].id || (t.rows[y-1].cells[x+1].id).charAt(2) == 0)
				mov.push([y-1, x+1]);
		if ((x-1) > -1)
			if (!t.rows[y].cells[x-1].id || (t.rows[y].cells[x-1].id).charAt(2) == 0)
				mov.push([y, x-1]);
		if ((y+1) < 8 && (x-1) > -1)
			if (!t.rows[y+1].cells[x-1].id || (t.rows[y+1].cells[x-1].id).charAt(2) == 0)
				mov.push([y+1, x-1]);
		if ((y+1) < 8)
			if (!t.rows[y+1].cells[x].id || (t.rows[y+1].cells[x].id).charAt(2) == 0)
				mov.push([y+1, x]);
		if ((y+1) < 8 && (x+1) < 8)
			if (!t.rows[y+1].cells[x+1].id || (t.rows[y+1].cells[x+1].id).charAt(2) == 0)
				mov.push([y+1, x+1]);
		if ((x+1) < 8)
			if (!t.rows[y].cells[x+1].id || (t.rows[y].cells[x+1].id).charAt(2) == 0)
				mov.push([y, x+1]);
		
		//alert('todos mov rey: '+mov);
		if (mov.length > 0)
		{
			var mov1 = [];
			for (key in mov_ataque_blancas)
				for (var i=0; i<mov_ataque_blancas[key].length; i++)
					for (var j=0; j<mov.length; j++)
						if (mov_ataque_blancas[key][i].join('') == mov[j].join(''))
							mov1.push(mov[j]);
			
			if (mov1.length > 0)
			{
				for (var i=0; i<mov1.length; i++)  //pueden haber mismas pos atacadas por mas de una pieza
					for (j=0; j<mov.length; j++)
						if (mov1[i].join('') == mov[j].join(''))
							mov.splice(j,1);
			}
			
			jaque_mov_rey = mov.slice();
		}
		
		
		//MOV PIEZAS DE ATAQUE
		var jaque_num = [];
		for (key in jaque_pos)
			jaque_num.push(key);
		//var jaque_num = Object.keys(jaque_pos);
		
		// -- mov_ataque_blancas en pos_jaque negras
		if (jaque_num.length == 1)
		{
			var y1 = jaque_num[0][0];
			var x1 = jaque_num[0][1];
			
			var mov2 = [];
			for (key in jaque_pos)
				for (var i=0; i<jaque_pos[key].length; i++)
					mov2.push(jaque_pos[key][i]);
			
			var mov3 = [];
			for (key in mov_ataque_blancas)
			{
				if (key.length == 2 || !isNaN(key))
				{
					if (key != 1)
					{
						for (var i=0; i<mov_ataque_blancas[key].length; i++)
							for (var j=0; j<mov2.length; j++)
								if (mov_ataque_blancas[key][i].join('') == mov2[j].join(''))

									mov3.push(mov2[j]);
									
						if (mov3.length > 0)
							jaque_mov_piezas[key] = mov3.slice();
						
						mov3 = [];
					}
				}
			}
			
			//MOV PEON - agregar peon al paso
			var mov4 = [];
			for (key in pos_piezas_blancas)
			{
				if (isNaN(key) && key.length == 1)
				{
					//alert(key+': '+pos_piezas_negras[key]);
					var y = pos_piezas_blancas[key][0];
					var x = pos_piezas_blancas[key][1];
					
					//MOV PEON (AVANCE)
					if (y == 6)
					{
						if (!t.rows[y-1].cells[x].id)
							mov4.push([y-1, x]);
						if ((!t.rows[y-1].cells[x].id) && (!t.rows[y-2].cells[x].id))
							mov4.push([y-2, x]);
					}
					else
					{
						if (!t.rows[y-1].cells[x].id)
							mov4.push([y-1, x]);
					}
					
					//MOV PEON (ATAQUE)
					if ((x-1) >= 0)
						if (t.rows[y-1].cells[x-1].id)
							if ((t.rows[y-1].cells[x-1].id).charAt(0) == y1 && (t.rows[y-1].cells[x-1].id).charAt(1) == x1)
								mov4.push([y-1, x-1]);
					if ((x+1) < 8)
						if (t.rows[y-1].cells[x+1].id)
							if ((t.rows[y-1].cells[x+1].id).charAt(0) == y1 && (t.rows[y-1].cells[x+1].id).charAt(1) == x1)
								mov4.push([y-1, x+1]);
					
					
					for (var i=0; i<mov2.length; i++)
						for (var j=0; j<mov4.length; j++)
							if (mov2[i].join('') == mov4[j].join(''))
								mov3.push(mov2[i]);
					
					if (mov3.length > 0)
					{
						//alert(mov3);
						jaque_mov_piezas[key] = mov3.slice();
						//alert(key+': '+jaque_mov_piezas[key]);
					}
					
					mov3 = [];
					mov4 = [];
					
					// PEON AL PASO
					if (isNaN(jaque_num[0].charAt(3)))
						if (ultimo_mov[4] == true)
							if ((y == y1 && x == (x1+1)) || (y == y1 && x == (x1-1)))
								jaque_mov_piezas[key] = [[y1-1, x1]];
					
				}
			}
		}
		
		/*
		// saco los mov de piezas inmoviles
		var claves = Object.getOwnPropertyNames(jaque_mov_piezas);
		var claves2 = Object.getOwnPropertyNames(piezas_inmoviles);
		
		if (claves2.length > 0)
			if (claves.length > 0)
				for (key in jaque_mov_piezas)
					for (key2 in piezas_inmoviles)
						if (key == key2[3])
							delete jaque_mov_piezas[key];
		*/
		
		if (jaque_mov_rey.length == 0)
		{
			var claves3 = Object.getOwnPropertyNames(jaque_mov_piezas);
			if (claves3.length == 0)
			{
				alert('jaque mate');
				mate = true;
			}
		}
	}
}

// JavaScript Document

function mov_jaque(el)
{
	//alert(id);
	var id = el.id;
	var t = document.getElementById('chess_table');
	
	if (id[3] == 1)
	{
		if (jaque_mov_rey.length > 0)
			for (var i=0; i<jaque_mov_rey.length; i++)
				t.rows[jaque_mov_rey[i][0]].cells[jaque_mov_rey[i][1]].className = 'lighter';
		
		//***********
		if (enviar_mov == false)
			segundo_click_otro_jugador();
		//***********
			
		return false;
	}
	
	if (ultimo_mov[4] == true)
	{
		for (key in jaque_mov_piezas)
			if (id[3] == key)
				t.rows[jaque_mov_piezas[key][0][0]].cells[jaque_mov_piezas[key][0][1]].className = 'lighter_pp';
		
		//***********
		if (enviar_mov == false)
			segundo_click_otro_jugador();
		//***********
		
		return false;
	}
	
	if (id.length == 4)
		var pieza = id[3];
	else
		var pieza = id[3]+id[4];
	
	for (key in jaque_mov_piezas)
	{
		if (pieza == key)
			for (var i=0; i<jaque_mov_piezas[key].length; i++)
				t.rows[jaque_mov_piezas[key][i][0]].cells[jaque_mov_piezas[key][i][1]].className = 'lighter';
	}
	
	//***********
	if (enviar_mov == false)
		segundo_click_otro_jugador();
	//***********
}

// JavaScript Document



function verificar_tablas()
{
	var t = document.getElementById('chess_table');
	
	if (turno == 0) // verif. tablas con rey blanco
	{
		var mov_ataque = {};
		for (key in mov_ataque_blancas)
			mov_ataque[key] = mov_ataque_blancas[key].slice();  //de acá voy descartando movimientos
		
		
		//MOV REY
		var mov = [];
		var y = pos_piezas_blancas[1][0];
		var x = pos_piezas_blancas[1][1];
		
		if ((y-1) > -1 && (x-1) > -1)
			if (!t.rows[y-1].cells[x-1].id || (t.rows[y-1].cells[x-1].id).charAt(2) == 0)
				mov.push([y-1, x-1]);
		if ((y-1) > -1)
			if (!t.rows[y-1].cells[x].id || (t.rows[y-1].cells[x].id).charAt(2) == 0)
				mov.push([y-1, x]);
		if ((y-1) > -1 && (x+1) < 8)
			if (!t.rows[y-1].cells[x+1].id || (t.rows[y-1].cells[x+1].id).charAt(2) == 0)
				mov.push([y-1, x+1]);
		if ((x-1) > -1)
			if (!t.rows[y].cells[x-1].id || (t.rows[y].cells[x-1].id).charAt(2) == 0)
				mov.push([y, x-1]);
		if ((y+1) < 8 && (x-1) > -1)
			if (!t.rows[y+1].cells[x-1].id || (t.rows[y+1].cells[x-1].id).charAt(2) == 0)
				mov.push([y+1, x-1]);
		if ((y+1) < 8)
			if (!t.rows[y+1].cells[x].id || (t.rows[y+1].cells[x].id).charAt(2) == 0)
				mov.push([y+1, x]);
		if ((y+1) < 8 && (x+1) < 8)
			if (!t.rows[y+1].cells[x+1].id || (t.rows[y+1].cells[x+1].id).charAt(2) == 0)
				mov.push([y+1, x+1]);
		if ((x+1) < 8)
			if (!t.rows[y].cells[x+1].id || (t.rows[y].cells[x+1].id).charAt(2) == 0)
				mov.push([y, x+1]);
		
		//le saco las posiciones bloqueadas
		if (mov.length > 0)
		{
			var mov1 = [];
			for (key in mov_ataque_negras)
				for (var i=0; i<mov_ataque_negras[key].length; i++)
					for (var j=0; j<mov.length; j++)
						if (mov_ataque_negras[key][i].join('') == mov[j].join(''))
							mov1.push(mov[j]);
			
						
			if (mov1.length > 0)
			{
				for (var i=0; i<mov1.length; i++)  //pueden haber mismas pos atacadas por mas de una pieza
					for (j=0; j<mov.length; j++)
						if (mov1[i].join('') == mov[j].join(''))
							mov.splice(j,1);
				if (mov.length > 0)
					return false;  //hay mov en pos no atacadas
			}
			else
				return false;  // hay mov del rey y no hay pos atacadas
		}
		
		delete mov_ataque[1];  // si llega aca no hay mov. del rey.
		
		
		
		// piezas bloqueadas
		var claves2 = Object.getOwnPropertyNames(piezas_inmoviles);

		if (claves2.length > 0)
		{
			//alert('hay piezas inmobiles');
			for (key in piezas_inmoviles)
			{
				if (isNaN(key[3]) && key.length == 4) //  mov ataque peon
				{
					var mov2 = [];
					
					var pieza = key[3];

					for (var i=0; i<piezas_inmoviles[key].length; i++)
						mov2.push(piezas_inmoviles[key][i]);  //meto todos los mov permitidos de esta pieza en mov2
					
					for (var i=0; i<mov_ataque[pieza].length; i++)
						if (mov_ataque[pieza][i].join('') == mov2[0].join('')) //el peon solo puede comer a la pieza
							return false;  //hay mov de ataque permitidos: el peon puede comer a la pieza que lo bloquea
							//alert('hay mov de ataque permitidos para peones');
							
					//  mov avance peon
					var y = parseInt(key[0]);
					var x = parseInt(key[1]);
					
					if (!t.rows[y-1].cells[x].id)
					{
						var mov4 = y-1+''+x;
						for (var j=0; j<mov2.length; j++)
							if (mov4 == mov2[j].join(''))
								return false;  //hay mov de avance para este peon del bucle
								//alert('hay mov de avance permitidos para esta pieza');
					}

					delete mov_ataque[pieza];  //descarto los mov para esta pieza
				}
				
				else if ((key.length == 4 && key[3] == 4) || (key.length == 4 && key[3] == 7) || (key.length == 5 && key[4] == 4)) //  mov ataque caballo
				{
					if (key.length == 4)
						var pieza = key[3];
					else
						var pieza = key[3]+key[4];
					
					delete mov_ataque[pieza];  //descarto los mov para esta pieza
				}
				
				else
				{
					// otros mov ataque
					var mov2 = [];
					
					if (key.length == 4)
						var pieza = key[3];
					else
						var pieza = key[3]+key[4];
					
					for (var i=0; i<piezas_inmoviles[key].length; i++)
						mov2.push(piezas_inmoviles[key][i]);
					
					for (var i=0; i<mov_ataque[pieza].length; i++)
						for (var j=0; j<mov2.length; j++)
							if (mov_ataque[pieza][i].join('') == mov2[j].join(''))
								return false;
					
					delete mov_ataque[pieza];  //descarto los mov para esta pieza
				}
			}
			// si llega acá: hay piezas bloqueadas pero no pueden moverse.
		}
		
		
		//MOV. OTRAS PIEZAS DE ATAQUE (las que quedaron)
		var claves2 = Object.getOwnPropertyNames(mov_ataque);
		
		if (claves2.length > 1) // hay otras piezas además del rey
		{
			// MOV. PEON - AVANCE Y ATAQUE (de los que quedaron)
			for (key in mov_ataque)
				if (key.length == 1 && isNaN(key))
				{
					var y = pos_piezas_blancas[key][0];
					var x = pos_piezas_blancas[key][1];
					if (!t.rows[y-1].cells[x].id)
						return false;
					if (x-1 >= 0)
						if (t.rows[y-1].cells[x-1].id)
							if((t.rows[y-1].cells[x-1].id).charAt(2) == 0)
								return false;
					if (x+1 < 8)
						if (t.rows[y-1].cells[x+1].id)
							if((t.rows[y-1].cells[x+1].id).charAt(2) == 0)
								return false;
					
					delete mov_ataque[key];
				}
			
			// MOV. ATAQUE (otras piezas que quedaron)
			for (key in mov_ataque)
				if (mov_ataque[key].length > 0)
					return false;
		}
				
		mate = true;
		turno = 3;
		alert('tablas');
	}
	
	
	//**************************************************************************************
	
	else if (turno == 1) // verif. tablas con rey negro
	{
		var mov_ataque = {};
		for (key in mov_ataque_negras)
			mov_ataque[key] = mov_ataque_negras[key].slice();
		
		//MOV REY
		var mov = [];
		var y = pos_piezas_negras[1][0];
		var x = pos_piezas_negras[1][1];
		
		if ((y-1) > -1 && (x-1) > -1)
			if (!t.rows[y-1].cells[x-1].id || (t.rows[y-1].cells[x-1].id).charAt(2) == 1)
				mov.push([y-1, x-1]);
		if ((y-1) > -1)
			if (!t.rows[y-1].cells[x].id || (t.rows[y-1].cells[x].id).charAt(2) == 1)
				mov.push([y-1, x]);
		if ((y-1) > -1 && (x+1) < 8)
			if (!t.rows[y-1].cells[x+1].id || (t.rows[y-1].cells[x+1].id).charAt(2) == 1)
				mov.push([y-1, x+1]);
		if ((x-1) > -1)
			if (!t.rows[y].cells[x-1].id || (t.rows[y].cells[x-1].id).charAt(2) == 1)
				mov.push([y, x-1]);
		if ((y+1) < 8 && (x-1) > -1)
			if (!t.rows[y+1].cells[x-1].id || (t.rows[y+1].cells[x-1].id).charAt(2) == 1)
				mov.push([y+1, x-1]);
		if ((y+1) < 8)
			if (!t.rows[y+1].cells[x].id || (t.rows[y+1].cells[x].id).charAt(2) == 1)
				mov.push([y+1, x]);
		if ((y+1) < 8 && (x+1) < 8)
			if (!t.rows[y+1].cells[x+1].id || (t.rows[y+1].cells[x+1].id).charAt(2) == 1)
				mov.push([y+1, x+1]);
		if ((x+1) < 8)
			if (!t.rows[y].cells[x+1].id || (t.rows[y].cells[x+1].id).charAt(2) == 1)
				mov.push([y, x+1]);
		
		//le saco las posiciones bloqueadas
		if (mov.length > 0)
		{
			var mov1 = [];
			for (key in mov_ataque_blancas)
				for (var i=0; i<mov_ataque_blancas[key].length; i++)
					for (var j=0; j<mov.length; j++)
						if (mov_ataque_blancas[key][i].join('') == mov[j].join(''))
							mov1.push(mov[j]);
			
			if (mov1.length > 0)
			{
				for (var i=0; i<mov1.length; i++)  //pueden haber mismas pos atacadas por mas de una pieza
					for (j=0; j<mov.length; j++)
						if (mov1[i].join('') == mov[j].join(''))
							mov.splice(j,1);
				if (mov.length > 0)
					return false;  //hay mov en pos no atacadas
			}
			else
				return false;  // hay mov del rey y no hay pos atacadas
		}
		//console.log('no hay mov. del rey');
		delete mov_ataque[1];  // si llega aca no hay mov. del rey.
		
		
		
		// piezas bloqueadas
		var claves2 = Object.getOwnPropertyNames(piezas_inmoviles);

		if (claves2.length > 0)
		{
			for (key in piezas_inmoviles)
			{
				if (isNaN(key[3]) && key.length == 4) //  mov ataque peon
				{
					var mov2 = [];
					
					var pieza = key[3];
					
					for (var i=0; i<piezas_inmoviles[key].length; i++)
						mov2.push(piezas_inmoviles[key][i]);
					
					//alert(mov2);
					
					for (var i=0; i<mov_ataque[pieza].length; i++)
						if (mov_ataque[pieza][i].join('') == mov2[0].join(''))
							return false;
					
					//  mov avance peon
					var y = parseInt(key[0]);
					var x = parseInt(key[1]);
					
					if (!t.rows[y+1].cells[x].id)
					{
						var mov4 = y+1+''+x;
						for (var j=0; j<mov2.length; j++)
							if (mov4 == mov2[j].join(''))
								return false;  //hay mov de avance para este peon del bucle
								//alert('hay mov de avance permitidos para esta pieza');
					}

					delete mov_ataque[pieza];
					//console.log('mov ataque pieza eliminada: '+pieza);
				}
				
				else if ((key.length == 4 && key[3] == 4) || (key.length == 4 && key[3] == 7) || (key.length == 5 && key[4] == 4)) //  mov ataque caballo
				{
					if (key.length == 4)
						var pieza = key[3];
					else
						var pieza = key[3]+key[4];
					
					delete mov_ataque[pieza];
					//console.log('mov ataque pieza eliminada: '+pieza);
				}
				
				else
				{
					// otros mov ataque
					var mov2 = [];
					
					if (key.length == 4)
						var pieza = key[3];
					else
						var pieza = key[3]+key[4];
					
					for (var i=0; i<piezas_inmoviles[key].length; i++)
						mov2.push(piezas_inmoviles[key][i]);
					
					for (var i=0; i<mov_ataque[pieza].length; i++)
						for (var j=0; j<mov2.length; j++)
							if (mov_ataque[pieza][i].join('') == mov2[j].join(''))
								return false;
					
					delete mov_ataque[pieza];
					//console.log('mov ataque pieza eliminada: '+pieza);
				}
			}
			//console.log('hay piezas bloqueadas que no tienen movimiento');
		}
		
		
		//MOV. OTRAS PIEZAS DE ATAQUE (las que quedaron)
		var claves2 = Object.getOwnPropertyNames(mov_ataque);
		
		if (claves2.length > 1) // hay otras piezas además del rey
		{
			// MOV. PEON - AVANCE Y ATAQUE (de los que quedaron)
			for (key in mov_ataque)
				if (key.length == 1 && isNaN(key))
				{
					//console.log('hay peones no bloqueados: '+key);
					var y = pos_piezas_negras[key][0];
					var x = pos_piezas_negras[key][1];
					//console.log('posicion: '+y+' '+x);
					if (!t.rows[y+1].cells[x].id)
						return false;
					if (x-1 >= 0)
						if (t.rows[y+1].cells[x-1].id)
							if((t.rows[y+1].cells[x-1].id).charAt(2) == 1)
								return false;
					if (x+1 < 8)
						if (t.rows[y+1].cells[x+1].id)
							if((t.rows[y+1].cells[x+1].id).charAt(2) == 1)
								return false;
					
					delete mov_ataque[key];
					//console.log('mov ataque pieza eliminada: '+pieza);
					//console.log('hay peones no bloqueados que no tienen movimiento');
				}
			
			// MOV. ATAQUE (otras piezas que quedaron)
			for (key in mov_ataque)
				if (mov_ataque[key].length > 0)
					return false;
		}
				
		mate = true;
		turno = 3;
		alert('tablas');
	}
}