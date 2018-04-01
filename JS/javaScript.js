
document.addEventListener("DOMContentLoaded",function(){

var new_game = new Game();
new_game.init();
	
		
});


var  index_user_stone = null; 

function User_schoose(obj){

	var game = new Create_game();
	var index = game.Search_who_move();
	index_user_stone = obj;

	//if (index == 0 ) {

		if ((index_user_stone)!=null) {
			
			current_stone = user.player_domino[index_user_stone];
			
			if(current_stone != undefined){
				game.Some_function(0,current_stone);
				index_user_stone = null;
				Load_page(user.player_domino);
				Add_stone_to_left_field();
				Add_stone_to_right_field();

			}
			
		}		
	
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};



async function Play_process(){
	var game = new Create_game();

		for (var index = 1; index < 4; index++) {

			if (game_status==true) {
			
				var current_stone = array_player[index].Search_need_stone(left_end, right_end,
													    array_player[index].Get_array_stone(), array_move,index);
				//console.log(current_stone.left_side + "  " + current_stone.right_side);

				if(current_stone == undefined){
					return;
													
				}
				else{
					await sleep(2000);

					game.Some_function(index, current_stone);	
					Add_stone_to_left_field();
					Add_stone_to_right_field();									

				}			
								
			}
			
		}			

};




var has_to_restart=false;
var game_status = true;

var count_stones = 28;

var field = new Array(28);

var  stone = new Array(28);

var array_move = new Array();
var array_player = new Array();

var  first_stone; 
var left_part_field = new Array();
var right_part_field = new Array();

var left_end=0;
var right_end=0;
var index_first_move;


class Player{

	Player(){
	 	player_move = false;
	 	player_domino = new Array(7);	
	 };

	Get_array_stone(){
		return this.player_domino;
	 };

	Get_array_stone (){
	return this.player_domino;
	 };
};



Player.prototype.Get_stone = function(mass)	{
		var summa= 0;
		var index = 0;

		for (var i = 0; i < mass.length; i++) {
			if (mass[i].right_side + mass[i].left_side >summa) {
				summa=mass[i].right_side + mass[i].left_side;
				index=i;
			}		
		}

		return mass[index];
};

Player.prototype.Display_player_stones = function(array){
		console.log("");
		for (var i = 0; i < array.length; i++) {
			console.log(array[i].right_side + " " + array[i].left_side);
		}
};

Player.prototype.Search_need_stone = function(number_left,number_right,array ){

		var current_array = new Array();

		for (var i = 0; i < array.length; i++) {
			 if( array[i].left_side == number_right || array[i].right_side == number_right || 
				 array[i].left_side == number_left || array[i].right_side == number_left){
				current_array.push(array[i]);
				
			}
		}	
		var current_stone = this.Get_stone(current_array);	
        
        return current_stone;
};


var user = new Player();

var first_computer = new Player();

var second_computer = new Player();

var third_computer = new Player();


class Create_game{

	 

	Create_domino_array(){

		var index = 0;

		for (var i = 0; i < 7; i++) {
				for (var j = i; j < 7; j++) {	

					stone[index]= new Stone(i,j);				
					//console.log(stone[index].right_side + " " + stone[index].left_side);
					index++;			
				}
						
			}

	};

	 Distribution_domino_to_users(){

		
			user.player_domino =stone.slice(0,7);
			first_computer.player_domino=stone.slice(7,14);
			second_computer.player_domino=stone.slice(14,21);
			third_computer.player_domino=stone.slice(21,28);

			

	};

	Remove(array, element) {
    var index = array.indexOf(element);
    array.splice(index, 1);
	}

	Play(){

		var index = this.Search_who_move();
		this.Play_process(index);		
		
	};

	Some_function( index, current_stone){

		if(left_part_field[left_part_field.length-1].left_side == current_stone.left_side){
			this.Reverse_stone(current_stone);
			left_part_field.push(current_stone);
			this.Remove(array_player[index].Get_array_stone(),current_stone);
			left_end = current_stone.left_side;
			//console.log(left_end);

		}
		else if(right_part_field[right_part_field.length-1].right_side == current_stone.left_side){
			right_part_field.push(current_stone);
			right_end = current_stone.right_side;  
			this.Remove(array_player[index].Get_array_stone(),current_stone);			
			//console.log(right_end);
		}
		else if(left_part_field[left_part_field.length-1].left_side == current_stone.right_side){
			left_part_field.push(current_stone);
			left_end = current_stone.left_side;
			this.Remove(array_player[index].Get_array_stone(),current_stone);
			//console.log(left_end);

		}
		// else if(right_part_field[right_part_field.length-1].right_side == current_stone.right_side){
		else if(right_part_field[right_part_field.length-1].right_side == current_stone.right_side){
			this.Reverse_stone(current_stone);
			right_part_field.push(current_stone);
			right_end = current_stone.right_side;
			this.Remove(array_player[index].Get_array_stone(),current_stone);
	 		//console.log(right_end);
		}
		
		if(array_player[index].Get_array_stone().length == 0)
		{
			game_status = false;
			console.log("gameOver");
			console.log(array_player[index]);

			for (var i = 1; i < left_part_field.length; i++) {
					console.log(left_part_field[i]);
			}
			for (var i = 0; i < right_part_field.length; i++) {
					console.log(right_part_field[i]);
				}
			}

	};

	
	Result(){
		for (var i = 0; i < array_player.length; i++) {
				array_player[i].Display_player_stones(array_player[i].Get_array_stone());	
		}
	};

	Shuffle(a) {
	    var j, x, i;
	    for (i = a.length - 1; i > 0; i--) {
	        j = Math.floor(Math.random() * (i + 1));
	        x = a[i];
	        a[i] = a[j];
	        a[j] = x;
	    }
	};


	Domino_distribution_result(){
		this.Shuffle(stone);
		this.Shuffle(stone);
		
	};	


	

	Reverse_stone (stone){

		var temp = stone.left_side;
		stone.left_side = stone.right_side;
		stone.right_side = temp;

	};


	

	Search_the_smallest_double(array){

		for (var i = 0; i < array.length; i++) {

			if(array[i].left_side ==0 && array[i].right_side==0 ){

				first_stone = array[i];	
				return true;
			}
		}

	};

	


	Search_who_move(){

		var move_index;

		if (this.Search_the_smallest_double(user.player_domino)) {
			user.player_move = true;
			move_index= 3;
			left_part_field.push(first_stone);
			right_part_field.push(first_stone);
			this.Remove(user.player_domino, first_stone);
			
		}
		else if (this.Search_the_smallest_double(first_computer.player_domino)) {
			first_computer.player_move =true;			
			move_index= 2;
			left_part_field.push(first_stone);
			right_part_field.push(first_stone);
			this.Remove(first_computer.player_domino, first_stone);
			
		}
		else if (this.Search_the_smallest_double(second_computer.player_domino)) {
			second_computer.player_move =true;
			move_index= 3;			
			left_part_field.push(first_stone);
			right_part_field.push(first_stone);
			this.Remove(second_computer.player_domino, first_stone);
		}
		else if (this.Search_the_smallest_double(third_computer.player_domino)) 
		{
			third_computer.player_move=true;
			move_index= 0;			
			left_part_field.push(first_stone);
			right_part_field.push(first_stone);
			this.Remove(third_computer.player_domino, first_stone);
		}

		array_move.push(user.player_move);
		array_move.push(first_computer.player_move);
		array_move.push(second_computer.player_move);
		array_move.push(third_computer.player_move);

		return move_index;
	};

	Create_array_players(){
		

		array_player.push(user);
		array_player.push(first_computer);
		array_player.push(second_computer);
		array_player.push(third_computer);
	};
}

function Load_page(array){

	for (var i = 1; i < (7)*2 +1; i++) {
		if (i%2!=0) {

			var image_first_part = document.getElementById("my"+i.toString());
			if(array[parseInt((i-1)/2)] != undefined){
				image_first_part.src = Get_image_source(array[parseInt((i-1)/2)].left_side);
			}
			else{
				image_first_part.src = "Resource/Empty.png";
				image_first_part = document.getElementById("my"+(i+1).toString());
				image_first_part.src = "Resource/Empty.png";

			}			 
			
		}
		else{
			if(array[parseInt((i-1)/2)] != undefined){
			var image_second_part = document.getElementById("my"+(i).toString());
			image_second_part.src = Get_image_source(array[parseInt((i-1)/2)].right_side); 
			}								
		}
	}

		
		
	
	 
};

function ChangeDisplayStone(stone, part){

	if(stone.left_side == stone.right_side){
		part.style.display = "block";
			//part.style.marginLeft = "50px";
	}

}



function Create_stone(i, part_field){
	//if (i<29)
	 {
		if (i%2!=0) {

			var image_first_part = document.getElementById("l"+i.toString());
			if (part_field[parseInt((i-1)/2)] != undefined) {
				if (part_field[parseInt((i-1)/2)].left_side != null) {				
					image_first_part.src = Get_image_source(part_field[parseInt((i-1)/2)].left_side);

					ChangeDisplayStone(part_field[parseInt((i-1)/2)],image_first_part);
					

				}
			}			 
			
		}
		else{
			var image_second_part = document.getElementById("l" +(i).toString());
			if (part_field[parseInt((i-1)/2)] != undefined) {
				if (part_field[parseInt((i-1)/2)].right_side != null) {
					image_second_part.src = Get_image_source(part_field[parseInt((i-1)/2)].right_side);

					ChangeDisplayStone(part_field[parseInt((i-1)/2)],image_second_part);
				}
			}		 
			
		}

	}
	// else{


	// }
}

function Add_stone_to_left_field(){

	for (var i = 1; i < 57; i++) {
		Create_stone(i, left_part_field);
		
	}

};

function Add_stone_to_right_field(){

	var t = 1;

	for (var i = 56; i >0; i--) {
		if (i%2 ==0) {

			var image_first_part = document.getElementById("l"+(i).toString());
			
			if (right_part_field[t] != undefined) {

				if (right_part_field[t].left_side != null) {	

						image_first_part.src = Get_image_source(right_part_field[t].left_side);

						ChangeDisplayStone(right_part_field[t], image_first_part);
				
				}
			}
						 
			
		}
	else{
			var image_second_part = document.getElementById("l" +(i).toString());

			if (right_part_field[t] != undefined) {

				if (right_part_field[t].right_side != null) {

					image_second_part.src = Get_image_source(right_part_field[t].right_side);

					ChangeDisplayStone(right_part_field[t], image_second_part);

				}
			}

			t++;	 
			
		}
		
		
	}

};

class Stone {
  constructor(left_side, right_side) {
    this.left_side = left_side;
    this.right_side = right_side;
  }
  
 
};

function Get_image_source(number){

	var path = null;

	switch(number){

	case 0: 
		path ="Resource/0.gif" 
		break;
	case 1 : 
		path ="Resource/1.gif" 
		break;
	case 2 : 
		path ="Resource/2.gif" 
		break;
	case 3 : 
		path ="Resource/3.gif" 
		break;
	case 4 : 
		path ="Resource/4.gif" 
		break;
	case 5 : 
		path ="Resource/5.gif" 
		break;
	case 6 : 
		path ="Resource/6.gif" 
		break;
	}

	return path; 
};


class Game{

	init(){

		var new_game= new Create_game();
		new_game.Create_array_players();
		new_game.Create_domino_array();
		new_game.Domino_distribution_result();
		new_game.Distribution_domino_to_users();
		index_first_move = (new_game.Search_who_move());
		Load_page(user.player_domino);
		First_go();			

	}
	
};

function First_go(){

	var game = new Create_game();
	

	

	if (game_status == true && index_first_move==0) {
		//if () {
			alert("User go");
		//}
	}
	else{

		for (var i = index_first_move; i < 4; i++) {
				
				
					var current_stone = array_player[i].Search_need_stone(left_end, right_end,
														    array_player[i].Get_array_stone(), array_move,i);
					//console.log(current_stone.left_side + "  " + current_stone.right_side);

					if(current_stone == undefined){
						return;
														
					}
					else{
						game.Some_function(i, current_stone);
						Add_stone_to_left_field();
						Add_stone_to_right_field();		
					}

			alert("User go  c");		

		}
	}


};
