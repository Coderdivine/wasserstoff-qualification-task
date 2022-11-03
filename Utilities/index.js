
const SCORES = ["red","yellow","blue","green"];//score color for each level of understanding.
const ScoreColor = async (score) => {
   //this function takes in one argument 'score'
   let id = Number(score)-1;//the score is subtracted by one to find the color identity 
   return SCORES[id]; //finally we return the color as a string 
} 
const NewPercentage = async(post) => {
     //this function takes in an array as argument 
    const number_of_text = post.length * 4; //We multiply the array length by 4 as specified in the task
    const sum = await post.reduce((index,x)=>{return index + Number(x.score)},0);// we would get the sum of all scores using reduce function.
    const percentage = (sum/number_of_text) * 100;//as specified in the task given, I divided the sum by the number of text and multiplied it by 100 to calculate percentage 
    return percentage; //lastly we return the percentage as an integer 
}
const UpdateAnArray = async (newValue,array,id)=>{
//this function takes in to array and one integer as parameters. 
//this function is used to update the state of an array.
    for (const obj of array){
        if(obj.item_id == Number(id)){
            //{score,color,text,item_id}_reference_code
            console.log({obj})//see the object that matches the state of item_id we want to change 
            obj.score = newValue.score;
            obj.color = newValue.color;
            obj.text = newValue.text;
            obj.item_id = newValue.item_id;
            //Obj is a constant state.So we would need to reference each item in obj separately. 
            console.log({obj})//view the new Obj
            console.log({array_one:array});//view the new Array
            break;
        }
    }
    console.log({array});
    return array; //lastly return the objects 
}


module.exports = {ScoreColor,NewPercentage,UpdateAnArray};//I exported each function 
