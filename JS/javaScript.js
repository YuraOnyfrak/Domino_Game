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




class  Player{

	Display_player_stones(array){
		console.log("");
		for (var i = 0; i < array.length; i++) {
			console.log(array[i].right_side + " " + array[i].left_side);
		}
	};

	Get_array_stone(){
		return array;
	};

	Get_stone(mass)	{
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

	Search_need_stone(number_left,number_right,array ){

		var current_array = new Array();

		for (var i = 0; i < array.length; i++) {
			if(array[i].left_side ==number_right || array[i].right_side == number_right){
				current_array.push(array[i]);
				
			}
		}	
		var current_stone = this.Get_stone(current_array);		
		console.log("Go " + current_stone.right_side + " " + current_stone.left_side);
        
        return current_stone;

	};

	Next_player(number_left,number_right,array, array_move,index){
		
			//if (array_move[index] == true)
			 {				
				var current_stone = this.Search_need_stone(number_left,number_right,array);
				array_move[index+1]=true;
			}

			return 	current_stone;

	}


}


class User extends Player{

	 User()
	 {
	 	user_move = false;
	 	user_domino = new Array(7);	
	 };

	Get_array_stone(){
		return this.user_domino;
	}


};

class First_computer extends Player{

	First_computer(){

		computer_first_move = false;
		computer_first_domino = new Array(7);

	};

	Get_array_stone(){
		return this.computer_first_domino;
	}
	

};

class Second_computer extends Player{

	Second_computer(){

		computer_second_move = false;
		computer_second_domino = new Array(7);
	};
     
   Get_array_stone(){
		return this.computer_second_domino;
	}

};
class Third_computer extends Player{

	Third_computer(){

		computer_third_move = false;
		computer_third_domino = new Array(7);
	};

	Get_array_stone(){
		return this.computer_third_domino;
	}

};

var user = new User();

var first_computer = new First_computer();

var second_computer = new Second_computer();

var third_computer = new Third_computer();


class Create_game{

	 

	Create_domino_array(){

		var index = 0;

		for (var i = 0; i < 7; i++) {
				for (var j = i; j < 7; j++) {	

					stone[index]= new Stone(i,j);				
					//console.log(stone[index].right_side + " " + stone[index].left_side);
					index++;			
				}

				//console.log(" ");			
			}

	};

	 Distribution_domino_to_users(){

		
			user.user_domino =stone.slice(0,7);
			first_computer.computer_first_domino=stone.slice(7,14);
			second_computer.computer_second_domino=stone.slice(14,21);
			third_computer.computer_third_domino=stone.slice(21,28);

			

	};

	Play(){

		var index = this.Search_who_move();
		var i = 2;
		
		for (var i = 0; i < 4; i++) {
			
			if (index <3) {
						var current_stone = array_player[index].Next_player(left_end, right_end,
										    array_player[index].Get_array_stone(), array_move,index);
						

						if(left_part_field[left_part_field.length-1].left_side == current_stone.left_side){
								this.Reverse_stone(current_stone);
								left_part_field.push(current_stone);
								array_player[index].Get_array_stone().splice(current_stone);
								left_end = current_stone.left_side;

						}
						else if(left_part_field[left_part_field.length-1].left_side == current_stone.right_side){
								left_part_field.push(current_stone);
								left_end = current_stone.left_side;
								array_player[index].Get_array_stone().remove(current_stone);

						}
						else if(right_part_field[right_part_field.length-1].right_side == current_stone.right_side){
							this.Reverse_stone(current_stone);
							right_part_field.push(current_stone);
							right_end = current_stone.right_side;
							array_player[index].Get_array_stone().remove(current_stone);

						}
						else if(right_part_field[right_part_field.length-1].right_side == current_stone.left){
							right_part_field.push(current_stone);
							right_end = current_stone.right_side;
							array_player[index].Get_array_stone().remove(current_stone);

						}
				index++;
			}
			else{
				
				this.Play();
			}

			//i--;

		}
					
				

		

	};

	Result(){
		for (var i = 0; i < array_player.length; i++) {
				array_player[i].Display_player_stones(array_player[i].Get_array_stone());	
		}
	}

	shuffle(a) {
	    var j, x, i;
	    for (i = a.length - 1; i > 0; i--) {
	        j = Math.floor(Math.random() * (i + 1));
	        x = a[i];
	        a[i] = a[j];
	        a[j] = x;
	    }
	};


	Domino_distribution_result(){
		this.shuffle(stone);
		this.shuffle(stone);


		
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

	Add_stone_to_field(array, stone){

		array.push(stone);

	};


	Search_who_move(){

		var move_index;

		if (this.Search_the_smallest_double(user.user_domino)) {
			user.user_move = true;
			move_index= 3;
			left_part_field.push(first_stone);
			right_part_field.push(first_stone);
			// console.log("user.user_move"+ left_part_field[0].left_side +left_part_field[0].right_side);
		}
		else if (this.Search_the_smallest_double(first_computer.computer_first_domino)) {
			first_computer.computer_first_move =true;
			
			move_index= 2;
			left_part_field.push(first_stone);
			right_part_field.push(first_stone);
			//console.log("computer_first_move" + left_part_field[0].left_side);
		}
		else if (this.Search_the_smallest_double(second_computer.computer_second_domino)) {
			second_computer.computer_second_move =true;
			move_index= 3;
			//console.log("computer_second_move");
			left_part_field.push(first_stone);
			right_part_field.push(first_stone);
		}
		else if (this.Search_the_smallest_double(third_computer.computer_third_domino)) {
			third_computer.computer_third_move=true;
			move_index= 0;
			//console.log("computer_third_move");
			left_part_field.push(first_stone);
			right_part_field.push(first_stone);
		}

		array_move.push(user.user_move);
		array_move.push(first_computer.computer_first_move);
		array_move.push(second_computer.computer_second_move);
		array_move.push(third_computer.computer_third_move);

		return move_index;
	};

	Create_array_players(){
		

		array_player.push(user);
		array_player.push(first_computer);
		array_player.push(second_computer);
		array_player.push(third_computer);
	};
}

function Load_page(){

	for (var i = 1; i < (user.user_domino.length)*2 +1; i++) {
		if (i%2!=0) {

			var image_first_part = document.getElementById("my"+i.toString());
			image_first_part.src = Get_image_source(user.user_domino[parseInt((i-1)/2)].left_side); 
			
		}
		else{
			var image_second_part = document.getElementById("my"+(i).toString());
			image_second_part.src = Get_image_source(user.user_domino[parseInt((i-1)/2)].right_side); 
			
		}

		
		
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
		new_game.Search_who_move();
		
		new_game.Play();
		Load_page();
		//new_game.Result();
		
		
			

	}

	start(){

	}

};


class Stone {
  constructor(left_side, right_side) {
    this.left_side = left_side;
    this.right_side = right_side;
  }
  
 
};

var game= new Game();
game.init();




