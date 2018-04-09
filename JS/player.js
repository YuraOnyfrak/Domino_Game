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
module.exports = Player;